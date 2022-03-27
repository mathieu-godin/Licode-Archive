import { deferred } from "../deps.ts";
export class DeferredStack {
    #array;
    #creator;
    #max_size;
    #queue;
    #size;
    constructor(max, ls, creator) {
        this.#array = ls ? [...ls] : [];
        this.#creator = creator;
        this.#max_size = max || 10;
        this.#queue = [];
        this.#size = this.#array.length;
    }
    get available() {
        return this.#array.length;
    }
    async pop() {
        if (this.#array.length > 0) {
            return this.#array.pop();
        }
        else if (this.#size < this.#max_size && this.#creator) {
            this.#size++;
            return await this.#creator();
        }
        const d = deferred();
        this.#queue.push(d);
        await d;
        return this.#array.pop();
    }
    push(value) {
        this.#array.push(value);
        if (this.#queue.length > 0) {
            const d = this.#queue.shift();
            d.resolve();
        }
    }
    get size() {
        return this.#size;
    }
}
export class DeferredAccessStack {
    #elements;
    #initializeElement;
    #checkElementInitialization;
    #queue;
    #size;
    get available() {
        return this.#elements.length;
    }
    get size() {
        return this.#size;
    }
    constructor(elements, initCallback, checkInitCallback) {
        this.#checkElementInitialization = checkInitCallback;
        this.#elements = elements;
        this.#initializeElement = initCallback;
        this.#queue = [];
        this.#size = elements.length;
    }
    async initialized() {
        const initialized = await Promise.all(this.#elements.map((e) => this.#checkElementInitialization(e)));
        return initialized
            .filter((initialized) => initialized === true)
            .length;
    }
    async pop() {
        let element;
        if (this.available > 0) {
            element = this.#elements.pop();
        }
        else {
            const d = deferred();
            this.#queue.push(d);
            await d;
            element = this.#elements.pop();
        }
        if (!await this.#checkElementInitialization(element)) {
            await this.#initializeElement(element);
        }
        return element;
    }
    push(value) {
        this.#elements.push(value);
        if (this.#queue.length > 0) {
            const d = this.#queue.shift();
            d.resolve();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXJyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZlcnJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVksUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRWhELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLE1BQU0sQ0FBVztJQUNqQixRQUFRLENBQW9CO0lBQzVCLFNBQVMsQ0FBUztJQUNsQixNQUFNLENBQXFCO0lBQzNCLEtBQUssQ0FBUztJQUVkLFlBQ0UsR0FBWSxFQUNaLEVBQWdCLEVBQ2hCLE9BQTBCO1FBRTFCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFHLENBQUM7U0FDM0I7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDOUI7UUFDRCxNQUFN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QUFHLENBQUM7WUFDL0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZlcnJlZCwgZGVmZXJyZWQgfSBmcm9tIFwiLi4vZGVwcy50c1wiO1xuXG5leHBvcnQgY2xhc3MgRGVmZXJyZWRTdGFjazxUPiB7XG4gICNhcnJheTogQXJyYXk8VD47XG4gICNjcmVhdG9yPzogKCkgPT4gUHJvbWlzZTxUPjtcbiAgI21heF9zaXplOiBudW1iZXI7XG4gICNxdWV1ZTogQXJyYXk8RGVmZXJyZWQ8VD4+O1xuICAjc2l6ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG1heD86IG51bWJlcixcbiAgICBscz86IEl0ZXJhYmxlPFQ+LFxuICAgIGNyZWF0b3I/OiAoKSA9PiBQcm9taXNlPFQ+LFxuICApIHtcbiAgICB0aGlzLiNhcnJheSA9IGxzID8gWy4uLmxzXSA6IFtdO1xuICAgIHRoaXMuI2NyZWF0b3IgPSBjcmVhdG9yO1xuICAgIHRoaXMuI21heF9zaXplID0gbWF4IHx8IDEwO1xuICAgIHRoaXMuI3F1ZXVlID0gW107XG4gICAgdGhpcy4jc2l6ZSA9IHRoaXMuI2FycmF5Lmxlbmd0aDtcbiAgfVxuXG4gIGdldCBhdmFpbGFibGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4jYXJyYXkubGVuZ3RoO1xuICB9XG5cbiAgYXN5bmMgcG9wKCk6IFByb21pc2U8VD4ge1xuICAgIGlmICh0aGlzLiNhcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy4jYXJyYXkucG9wKCkhO1xuICAgIH0gZWxzZSBpZiAodGhpcy4jc2l6ZSA8IHRoaXMuI21heF9zaXplICYmIHRoaXMuI2NyZWF0b3IpIHtcbiAgICAgIHRoaXMuI3NpemUrKztcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLiNjcmVhdG9yKCk7XG4gICAgfVxuICAgIGNvbnN0IGQgPSBkZWZlcnJlZDxUPigpO1xuICAgIHRoaXMuI3F1ZXVlLnB1c2goZCk7XG4gICAgYXdhaXQgZDtcbiAgICByZXR1cm4gdGhpcy4jYXJyYXkucG9wKCkhO1xuICB9XG5cbiAgcHVzaCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuI2FycmF5LnB1c2godmFsdWUpO1xuICAgIGlmICh0aGlzLiNxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkID0gdGhpcy4jcXVldWUuc2hpZnQoKSE7XG4gICAgICBkLnJlc29sdmUoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiNzaXplO1xuICB9XG59XG5cbi8qKlxuICogVGhlIERlZmVycmVkQWNjZXNzU3RhY2sgcHJvdmlkZXMgYWNjZXNzIHRvIGEgc2VyaWVzIG9mIGVsZW1lbnRzIHByb3ZpZGVkIG9uIHRoZSBzdGFjayBjcmVhdGlvbixcbiAqIGJ1dCB3aXRoIHRoZSBjYXZlYXQgdGhhdCB0aGV5IHJlcXVpcmUgYW4gaW5pdGlhbGl6YXRpb24gb2Ygc29ydHMgYmVmb3JlIHRoZXkgY2FuIGJlIHVzZWRcbiAqXG4gKiBJbnN0ZWFkIG9mIHByb3ZpZGluZyBhIGBjcmVhdG9yYCBmdW5jdGlvbiBhcyB5b3Ugd291bGQgd2l0aCB0aGUgYERlZmVycmVkU3RhY2tgLCB5b3UgcHJvdmlkZVxuICogYW4gaW5pdGlhbGl6YXRpb24gY2FsbGJhY2sgdG8gZXhlY3V0ZSBmb3IgZWFjaCBlbGVtZW50IHRoYXQgaXMgcmV0cmlldmVkIGZyb20gdGhlIHN0YWNrIGFuZCBhIGNoZWNrXG4gKiBjYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIGVsZW1lbnQgcmVxdWlyZXMgaW5pdGlhbGl6YXRpb24gYW5kIHJldHVybiBhIGNvdW50IG9mIHRoZSBpbml0aWFsaXplZFxuICogZWxlbWVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIERlZmVycmVkQWNjZXNzU3RhY2s8VD4ge1xuICAjZWxlbWVudHM6IEFycmF5PFQ+O1xuICAjaW5pdGlhbGl6ZUVsZW1lbnQ6IChlbGVtZW50OiBUKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAjY2hlY2tFbGVtZW50SW5pdGlhbGl6YXRpb246IChlbGVtZW50OiBUKSA9PiBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbjtcbiAgI3F1ZXVlOiBBcnJheTxEZWZlcnJlZDx1bmRlZmluZWQ+PjtcbiAgI3NpemU6IG51bWJlcjtcblxuICBnZXQgYXZhaWxhYmxlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuI2VsZW1lbnRzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWF4IG51bWJlciBvZiBlbGVtZW50cyB0aGF0IGNhbiBiZSBjb250YWluZWQgaW4gdGhlIHN0YWNrIGEgdGltZVxuICAgKi9cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4jc2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gaW5pdGlhbGl6ZSBUaGlzIGZ1bmN0aW9uIHdpbGwgZXhlY3V0ZSBmb3IgZWFjaCBlbGVtZW50IHRoYXQgaGFzbid0IGJlZW4gaW5pdGlhbGl6ZWQgd2hlbiByZXF1ZXN0ZWQgZnJvbSB0aGUgc3RhY2tcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRzOiBUW10sXG4gICAgaW5pdENhbGxiYWNrOiAoZWxlbWVudDogVCkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICBjaGVja0luaXRDYWxsYmFjazogKGVsZW1lbnQ6IFQpID0+IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFuLFxuICApIHtcbiAgICB0aGlzLiNjaGVja0VsZW1lbnRJbml0aWFsaXphdGlvbiA9IGNoZWNrSW5pdENhbGxiYWNrO1xuICAgIHRoaXMuI2VsZW1lbnRzID0gZWxlbWVudHM7XG4gICAgdGhpcy4jaW5pdGlhbGl6ZUVsZW1lbnQgPSBpbml0Q2FsbGJhY2s7XG4gICAgdGhpcy4jcXVldWUgPSBbXTtcbiAgICB0aGlzLiNzaXplID0gZWxlbWVudHMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFdpbGwgZXhlY3V0ZSB0aGUgY2hlY2sgZm9yIGluaXRpYWxpemF0aW9uIG9uIGVhY2ggZWxlbWVudCBvZiB0aGUgc3RhY2tcbiAgICogYW5kIHRoZW4gcmV0dXJuIHRoZSBudW1iZXIgb2YgaW5pdGlhbGl6ZWQgZWxlbWVudHMgdGhhdCBwYXNzIHRoZSBjaGVja1xuICAgKi9cbiAgYXN5bmMgaW5pdGlhbGl6ZWQoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBpbml0aWFsaXplZCA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgdGhpcy4jZWxlbWVudHMubWFwKChlKSA9PiB0aGlzLiNjaGVja0VsZW1lbnRJbml0aWFsaXphdGlvbihlKSksXG4gICAgKTtcblxuICAgIHJldHVybiBpbml0aWFsaXplZFxuICAgICAgLmZpbHRlcigoaW5pdGlhbGl6ZWQpID0+IGluaXRpYWxpemVkID09PSB0cnVlKVxuICAgICAgLmxlbmd0aDtcbiAgfVxuXG4gIGFzeW5jIHBvcCgpOiBQcm9taXNlPFQ+IHtcbiAgICBsZXQgZWxlbWVudDogVDtcbiAgICBpZiAodGhpcy5hdmFpbGFibGUgPiAwKSB7XG4gICAgICBlbGVtZW50ID0gdGhpcy4jZWxlbWVudHMucG9wKCkhO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0aGVyZSBhcmUgbm90IGVsZW1lbnRzIGxlZnQgaW4gdGhlIHN0YWNrLCBpdCB3aWxsIGF3YWl0IHRoZSBjYWxsIHVudGlsXG4gICAgICAvLyBhdCBsZWFzdCBvbmUgaXMgcmVzdG9yZWQgYW5kIHRoZW4gcmV0dXJuIGl0XG4gICAgICBjb25zdCBkID0gZGVmZXJyZWQ8dW5kZWZpbmVkPigpO1xuICAgICAgdGhpcy4jcXVldWUucHVzaChkKTtcbiAgICAgIGF3YWl0IGQ7XG4gICAgICBlbGVtZW50ID0gdGhpcy4jZWxlbWVudHMucG9wKCkhO1xuICAgIH1cblxuICAgIGlmICghYXdhaXQgdGhpcy4jY2hlY2tFbGVtZW50SW5pdGlhbGl6YXRpb24oZWxlbWVudCkpIHtcbiAgICAgIGF3YWl0IHRoaXMuI2luaXRpYWxpemVFbGVtZW50KGVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHB1c2godmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLiNlbGVtZW50cy5wdXNoKHZhbHVlKTtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGhhcyBiZWVuIHJlcXVlc3RlZCB3aGlsZSB0aGUgc3RhY2sgd2FzIGVtcHR5LCBpbmRpY2F0ZVxuICAgIC8vIHRoYXQgYW4gZWxlbWVudCBoYXMgYmVlbiByZXN0b3JlZFxuICAgIGlmICh0aGlzLiNxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkID0gdGhpcy4jcXVldWUuc2hpZnQoKSE7XG4gICAgICBkLnJlc29sdmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==