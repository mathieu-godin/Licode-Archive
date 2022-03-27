export function addSignalListener(...args) {
    if (typeof Deno.addSignalListener == "function") {
        return Deno.addSignalListener(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function createHttpClient(...args) {
    if (typeof Deno.createHttpClient == "function") {
        return Deno.createHttpClient(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function consoleSize(...args) {
    if (typeof Deno.consoleSize == "function") {
        return Deno.consoleSize(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function futime(...args) {
    if (typeof Deno.futime == "function") {
        return Deno.futime(...args);
    }
    else {
        return Promise.reject(new TypeError("Requires --unstable"));
    }
}
export function futimeSync(...args) {
    if (typeof Deno.futimeSync == "function") {
        return Deno.futimeSync(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function hostname(...args) {
    if (typeof Deno.hostname == "function") {
        return Deno.hostname(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function loadavg(...args) {
    if (typeof Deno.loadavg == "function") {
        return Deno.loadavg(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function osRelease(...args) {
    if (typeof Deno.osRelease == "function") {
        return Deno.osRelease(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function removeSignalListener(...args) {
    if (typeof Deno.removeSignalListener == "function") {
        return Deno.removeSignalListener(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function setRaw(...args) {
    if (typeof Deno.setRaw == "function") {
        return Deno.setRaw(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function systemMemoryInfo(...args) {
    if (typeof Deno.systemMemoryInfo == "function") {
        return Deno.systemMemoryInfo(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function umask(...args) {
    if (typeof Deno.umask == "function") {
        return Deno.umask(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
export function utime(...args) {
    if (typeof Deno.utime == "function") {
        return Deno.utime(...args);
    }
    else {
        return Promise.reject(new TypeError("Requires --unstable"));
    }
}
export function utimeSync(...args) {
    if (typeof Deno.utimeSync == "function") {
        return Deno.utimeSync(...args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2Rlbm9fdW5zdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMjUuMC9fZGVub191bnN0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLFVBQVUsaUJBQWlCLENBQy9CLEdBQUcsSUFBK0M7SUFFbEQsSUFBSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxVQUFVLEVBQUU7UUFDL0MsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN4QztTQUFNO1FBQ0wsTUFBTSxJQUFJLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0tBQzVDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FDOUIsR0FBRyxJQUE4QztJQUVqRCxJQUFJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixJQUFJLFVBQVUsRUFBRTtRQUM5QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3ZDO1NBQU07UUFDTCxNQUFNLElBQUksU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FDNUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FDekIsR0FBRyxJQUF5QztJQUU1QyxJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxVQUFVLEVBQUU7UUFDekMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDbEM7U0FBTTtRQUNMLE1BQU0sSUFBSSxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUM1QztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUNwQixHQUFHLElBQW9DO0lBRXZDLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLFVBQVUsRUFBRTtRQUNwQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUM3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QUFVLEVBQUU7UUFDbkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDNUI7U0FBTTtRQUNMLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7S0FDN0Q7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FDdkIsR0FBRyxJQUF1QztJQUUxQyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLEVBQUU7UUFDdkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDaEM7U0FBTTtRQUNMLE1BQU0sSUFBSSxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUM1QztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gQHRzLW5vY2hlY2sgQnlwYXNzIHN0YXRpYyBlcnJvcnMgZm9yIG1pc3NpbmcgLS11bnN0YWJsZS5cblxuZXhwb3J0IHR5cGUgSHR0cENsaWVudCA9IERlbm8uSHR0cENsaWVudDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNpZ25hbExpc3RlbmVyKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLmFkZFNpZ25hbExpc3RlbmVyPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5hZGRTaWduYWxMaXN0ZW5lcj4ge1xuICBpZiAodHlwZW9mIERlbm8uYWRkU2lnbmFsTGlzdGVuZXIgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8uYWRkU2lnbmFsTGlzdGVuZXIoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUh0dHBDbGllbnQoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8uY3JlYXRlSHR0cENsaWVudD5cbik6IFJldHVyblR5cGU8dHlwZW9mIERlbm8uY3JlYXRlSHR0cENsaWVudD4ge1xuICBpZiAodHlwZW9mIERlbm8uY3JlYXRlSHR0cENsaWVudCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby5jcmVhdGVIdHRwQ2xpZW50KC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zb2xlU2l6ZShcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5jb25zb2xlU2l6ZT5cbik6IFJldHVyblR5cGU8dHlwZW9mIERlbm8uY29uc29sZVNpemU+IHtcbiAgaWYgKHR5cGVvZiBEZW5vLmNvbnNvbGVTaXplID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLmNvbnNvbGVTaXplKC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmdXRpbWUoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8uZnV0aW1lPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5mdXRpbWU+IHtcbiAgaWYgKHR5cGVvZiBEZW5vLmZ1dGltZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby5mdXRpbWUoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZnV0aW1lU3luYyhcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5mdXRpbWVTeW5jPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5mdXRpbWVTeW5jPiB7XG4gIGlmICh0eXBlb2YgRGVuby5mdXRpbWVTeW5jID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLmZ1dGltZVN5bmMoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhvc3RuYW1lKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLmhvc3RuYW1lPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5ob3N0bmFtZT4ge1xuICBpZiAodHlwZW9mIERlbm8uaG9zdG5hbWUgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8uaG9zdG5hbWUoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRhdmcoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8ubG9hZGF2Zz5cbik6IFJldHVyblR5cGU8dHlwZW9mIERlbm8ubG9hZGF2Zz4ge1xuICBpZiAodHlwZW9mIERlbm8ubG9hZGF2ZyA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby5sb2FkYXZnKC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvc1JlbGVhc2UoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8ub3NSZWxlYXNlPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5vc1JlbGVhc2U+IHtcbiAgaWYgKHR5cGVvZiBEZW5vLm9zUmVsZWFzZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby5vc1JlbGVhc2UoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVNpZ25hbExpc3RlbmVyKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLnJlbW92ZVNpZ25hbExpc3RlbmVyPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5yZW1vdmVTaWduYWxMaXN0ZW5lcj4ge1xuICBpZiAodHlwZW9mIERlbm8ucmVtb3ZlU2lnbmFsTGlzdGVuZXIgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8ucmVtb3ZlU2lnbmFsTGlzdGVuZXIoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJhdyhcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5zZXRSYXc+XG4pOiBSZXR1cm5UeXBlPHR5cGVvZiBEZW5vLnNldFJhdz4ge1xuICBpZiAodHlwZW9mIERlbm8uc2V0UmF3ID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLnNldFJhdyguLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVxdWlyZXMgLS11bnN0YWJsZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3lzdGVtTWVtb3J5SW5mbyhcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5zeXN0ZW1NZW1vcnlJbmZvPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5zeXN0ZW1NZW1vcnlJbmZvPiB7XG4gIGlmICh0eXBlb2YgRGVuby5zeXN0ZW1NZW1vcnlJbmZvID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLnN5c3RlbU1lbW9yeUluZm8oLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVtYXNrKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLnVtYXNrPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby51bWFzaz4ge1xuICBpZiAodHlwZW9mIERlbm8udW1hc2sgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8udW1hc2soLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV0aW1lKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLnV0aW1lPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby51dGltZT4ge1xuICBpZiAodHlwZW9mIERlbm8udXRpbWUgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8udXRpbWUoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRpbWVTeW5jKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLnV0aW1lU3luYz5cbik6IFJldHVyblR5cGU8dHlwZW9mIERlbm8udXRpbWVTeW5jPiB7XG4gIGlmICh0eXBlb2YgRGVuby51dGltZVN5bmMgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8udXRpbWVTeW5jKC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpO1xuICB9XG59XG4iXX0=