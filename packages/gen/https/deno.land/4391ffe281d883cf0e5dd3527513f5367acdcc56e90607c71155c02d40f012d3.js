/*!
 * Adapted from koa-send at https://github.com/koajs/send and which is licensed
 * with the MIT license.
 */
import { calculate, ifNoneMatch } from "./etag.ts";
import { createHttpError } from "./httpError.ts";
import { assert, basename, extname, LimitedReader, parse, readAll, Status, } from "./deps.ts";
import { ifRange, MultiPartStream, parseRange } from "./range.ts";
import { decodeComponent, getBoundary, resolvePath } from "./util.ts";
const MAXBUFFER_DEFAULT = 1_048_576;
const BOUNDARY = getBoundary();
function isHidden(path) {
    const pathArr = path.split("/");
    for (const segment of pathArr) {
        if (segment[0] === "." && segment !== "." && segment !== "..") {
            return true;
        }
        return false;
    }
}
async function exists(path) {
    try {
        return (await Deno.stat(path)).isFile;
    }
    catch {
        return false;
    }
}
async function getEntity(path, mtime, stats, maxbuffer, response) {
    let body;
    let entity;
    const file = await Deno.open(path, { read: true });
    if (stats.size < maxbuffer) {
        const buffer = await readAll(file);
        file.close();
        body = entity = buffer;
    }
    else {
        response.addResource(file.rid);
        body = file;
        entity = {
            mtime: new Date(mtime),
            size: stats.size,
        };
    }
    return [body, entity];
}
async function sendRange(response, body, range, size) {
    const ranges = parseRange(range, size);
    if (ranges.length === 0) {
        throw createHttpError(Status.RequestedRangeNotSatisfiable);
    }
    response.status = Status.PartialContent;
    if (ranges.length === 1) {
        const [byteRange] = ranges;
        response.headers.set("Content-Length", String(byteRange.end - byteRange.start + 1));
        response.headers.set("Content-Range", `bytes ${byteRange.start}-${byteRange.end}/${size}`);
        if (body instanceof Uint8Array) {
            response.body = body.slice(byteRange.start, byteRange.end + 1);
        }
        else {
            await body.seek(byteRange.start, Deno.SeekMode.Start);
            response.body = new LimitedReader(body, byteRange.end - byteRange.start);
        }
    }
    else {
        assert(response.type);
        response.headers.set("content-type", `multipart/byteranges; boundary=${BOUNDARY}`);
        const multipartBody = new MultiPartStream(body, response.type, ranges, size, BOUNDARY);
        response.headers.set("content-length", String(multipartBody.contentLength()));
        response.body = multipartBody;
    }
}
export async function send({ request, response }, path, options = { root: "" }) {
    const { brotli = true, contentTypes = {}, extensions, format = true, gzip = true, hidden = false, immutable = false, index, maxbuffer = MAXBUFFER_DEFAULT, maxage = 0, root, } = options;
    const trailingSlash = path[path.length - 1] === "/";
    path = decodeComponent(path.substr(parse(path).root.length));
    if (index && trailingSlash) {
        path += index;
    }
    if (!hidden && isHidden(path)) {
        throw createHttpError(403);
    }
    path = resolvePath(root, path);
    let encodingExt = "";
    if (brotli &&
        request.acceptsEncodings("br", "identity") === "br" &&
        (await exists(`${path}.br`))) {
        path = `${path}.br`;
        response.headers.set("Content-Encoding", "br");
        response.headers.delete("Content-Length");
        encodingExt = ".br";
    }
    else if (gzip &&
        request.acceptsEncodings("gzip", "identity") === "gzip" &&
        (await exists(`${path}.gz`))) {
        path = `${path}.gz`;
        response.headers.set("Content-Encoding", "gzip");
        response.headers.delete("Content-Length");
        encodingExt = ".gz";
    }
    if (extensions && !/\.[^/]*$/.exec(path)) {
        for (let ext of extensions) {
            if (!/^\./.exec(ext)) {
                ext = `.${ext}`;
            }
            if (await exists(`${path}${ext}`)) {
                path += ext;
                break;
            }
        }
    }
    let stats;
    try {
        stats = await Deno.stat(path);
        if (stats.isDirectory) {
            if (format && index) {
                path += `/${index}`;
                stats = await Deno.stat(path);
            }
            else {
                return;
            }
        }
    }
    catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            throw createHttpError(404, err.message);
        }
        throw createHttpError(500, err.message);
    }
    let mtime = null;
    if (response.headers.has("Last-Modified")) {
        mtime = new Date(response.headers.get("Last-Modified")).getTime();
    }
    else if (stats.mtime) {
        mtime = stats.mtime.getTime();
        mtime -= mtime % 1000;
        response.headers.set("Last-Modified", new Date(mtime).toUTCString());
    }
    if (!response.headers.has("Cache-Control")) {
        const directives = [`max-age=${(maxage / 1000) | 0}`];
        if (immutable) {
            directives.push("immutable");
        }
        response.headers.set("Cache-Control", directives.join(","));
    }
    if (!response.type) {
        response.type = encodingExt !== ""
            ? extname(basename(path, encodingExt))
            : contentTypes[extname(path)] ?? extname(path);
    }
    let entity = null;
    let body = null;
    if (request.headers.has("If-None-Match") && mtime) {
        [body, entity] = await getEntity(path, mtime, stats, maxbuffer, response);
        if (!ifNoneMatch(request.headers.get("If-None-Match"), entity)) {
            response.headers.set("ETag", calculate(entity));
            response.status = 304;
            return path;
        }
    }
    if (request.headers.has("If-Modified-Since") && mtime) {
        const ifModifiedSince = new Date(request.headers.get("If-Modified-Since"));
        if (ifModifiedSince.getTime() >= mtime) {
            response.status = 304;
            return path;
        }
    }
    if (!body || !entity) {
        [body, entity] = await getEntity(path, mtime ?? 0, stats, maxbuffer, response);
    }
    if (request.headers.has("If-Range") && mtime &&
        ifRange(request.headers.get("If-Range"), mtime, entity) &&
        request.headers.has("Range")) {
        await sendRange(response, body, request.headers.get("Range"), stats.size);
        return path;
    }
    if (request.headers.has("Range")) {
        await sendRange(response, body, request.headers.get("Range"), stats.size);
        return path;
    }
    response.headers.set("Content-Length", String(stats.size));
    response.body = body;
    if (!response.headers.has("ETag")) {
        response.headers.set("ETag", calculate(entity));
    }
    if (!response.headers.has("Accept-Ranges")) {
        response.headers.set("Accept-Ranges", "bytes");
    }
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBR0gsT0FBTyxFQUFFLFNBQVMsRUFBWSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLE9BQU8sRUFDUCxhQUFhLEVBQ2IsS0FBSyxFQUNMLE9BQU8sRUFDUCxNQUFNLEdBQ1AsTUFBTSxXQUFXLENBQUM7QUFDbkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRWxFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV0RSxNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztBQUNwQyxNQUFNLFFBQVEsR0FBRyxXQUFXLEVBQUUsQ0FBQztBQTRFL0IsU0FBUyxRQUFRLENBQUMsSUFBWTtJQUM1QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLEtBQUssTUFBTSxPQUFPLElBQUksT0FBTyxFQUFFO1FBQzdCLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLEtBQUssR0FBRyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDN0QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLE1BQU0sQ0FBQyxJQUFZO0lBQ2hDLElBQUk7UUFDRixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ3ZDO0lBQUMsTUFBTTtRQUNOLE9BQU8sS0FBSyxDQUFD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