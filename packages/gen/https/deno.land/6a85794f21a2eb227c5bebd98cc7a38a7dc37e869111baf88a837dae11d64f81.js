import { Buffer } from "./buffer.ts";
export class StringReader extends Buffer {
    constructor(s) {
        super(new TextEncoder().encode(s).buffer);
    }
}
export class MultiReader {
    readers;
    currentIndex = 0;
    constructor(...readers) {
        this.readers = readers;
    }
    async read(p) {
        const r = this.readers[this.currentIndex];
        if (!r)
            return null;
        const result = await r.read(p);
        if (result === null) {
            this.currentIndex++;
            return 0;
        }
        return result;
    }
}
export class LimitedReader {
    reader;
    limit;
    constructor(reader, limit) {
        this.reader = reader;
        this.limit = limit;
    }
    async read(p) {
        if (this.limit <= 0) {
            return null;
        }
        if (p.length > this.limit) {
            p = p.subarray(0, this.limit);
        }
        const n = await this.reader.read(p);
        if (n == null) {
            return null;
        }
        this.limit -= n;
        return n;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdyQyxNQUFNLE9BQU8sWUFBYSxTQUFRLE1BQU07SUFDdEMsWUFBWSxDQUFTO1FBQ25CLEtBQUssQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0Y7QUFHRCxNQUFNLE9BQU8sV0FBVztJQUNMLE9BQU8sQ0FBZ0I7SUFDaEMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUV6QixZQUFZLEdBQUcsT0FBc0I7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBYTtRQUN0QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUFRRCxNQUFNLE9BQU8sYUFBYTtJQUNMO0lBQTRCO0lBQS9DLFlBQW1CLE1BQW1CLEVBQVMsS0FBYTtRQUF6QyxXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFHLENBQUM7SUFFaEUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFhO1FBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3pCLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoQixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZ29sYW5nL2dvL2Jsb2IvMDQ1MmY5NDYwZjUwZjBmMGFiYTE4ZGY0M2RjMmIzMTkwNmZiNjZjYy9zcmMvaW8vaW8uZ29cbi8vIENvcHlyaWdodCAyMDA5IFRoZSBHbyBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcIi4vYnVmZmVyLnRzXCI7XG5cbi8qKiBSZWFkZXIgdXRpbGl0eSBmb3Igc3RyaW5ncyAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ1JlYWRlciBleHRlbmRzIEJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yKHM6IHN0cmluZykge1xuICAgIHN1cGVyKG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShzKS5idWZmZXIpO1xuICB9XG59XG5cbi8qKiBSZWFkZXIgdXRpbGl0eSBmb3IgY29tYmluaW5nIG11bHRpcGxlIHJlYWRlcnMgKi9cbmV4cG9ydCBjbGFzcyBNdWx0aVJlYWRlciBpbXBsZW1lbnRzIERlbm8uUmVhZGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSByZWFkZXJzOiBEZW5vLlJlYWRlcltdO1xuICBwcml2YXRlIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IoLi4ucmVhZGVyczogRGVuby5SZWFkZXJbXSkge1xuICAgIHRoaXMucmVhZGVycyA9IHJlYWRlcnM7XG4gIH1cblxuICBhc3luYyByZWFkKHA6IFVpbnQ4QXJyYXkpOiBQcm9taXNlPG51bWJlciB8IG51bGw+IHtcbiAgICBjb25zdCByID0gdGhpcy5yZWFkZXJzW3RoaXMuY3VycmVudEluZGV4XTtcbiAgICBpZiAoIXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHIucmVhZChwKTtcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGBMaW1pdGVkUmVhZGVyYCByZWFkcyBmcm9tIGByZWFkZXJgIGJ1dCBsaW1pdHMgdGhlIGFtb3VudCBvZiBkYXRhIHJldHVybmVkIHRvIGp1c3QgYGxpbWl0YCBieXRlcy5cbiAqIEVhY2ggY2FsbCB0byBgcmVhZGAgdXBkYXRlcyBgbGltaXRgIHRvIHJlZmxlY3QgdGhlIG5ldyBhbW91bnQgcmVtYWluaW5nLlxuICogYHJlYWRgIHJldHVybnMgYG51bGxgIHdoZW4gYGxpbWl0YCA8PSBgMGAgb3JcbiAqIHdoZW4gdGhlIHVuZGVybHlpbmcgYHJlYWRlcmAgcmV0dXJucyBgbnVsbGAuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW1pdGVkUmVhZGVyIGltcGxlbWVudHMgRGVuby5SZWFkZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZGVyOiBEZW5vLlJlYWRlciwgcHVibGljIGxpbWl0OiBudW1iZXIpIHt9XG5cbiAgYXN5bmMgcmVhZChwOiBVaW50OEFycmF5KTogUHJvbWlzZTxudW1iZXIgfCBudWxsPiB7XG4gICAgaWYgKHRoaXMubGltaXQgPD0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHAubGVuZ3RoID4gdGhpcy5saW1pdCkge1xuICAgICAgcCA9IHAuc3ViYXJyYXkoMCwgdGhpcy5saW1pdCk7XG4gICAgfVxuICAgIGNvbnN0IG4gPSBhd2FpdCB0aGlzLnJlYWRlci5yZWFkKHApO1xuICAgIGlmIChuID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMubGltaXQgLT0gbjtcbiAgICByZXR1cm4gbjtcbiAgfVxufVxuIl19