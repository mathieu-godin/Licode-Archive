import { HmacSha256 } from "./deps.ts";
import { compare } from "./tssCompare.ts";
const replacements = {
    "/": "_",
    "+": "-",
    "=": "",
};
export class KeyStack {
    #keys;
    get length() {
        return this.#keys.length;
    }
    constructor(keys) {
        if (!(0 in keys)) {
            throw new TypeError("keys must contain at least one value");
        }
        this.#keys = keys;
    }
    #sign(data, key) {
        return btoa(String.fromCharCode.apply(undefined, new Uint8Array(new HmacSha256(key).update(data).arrayBuffer())))
            .replace(/\/|\+|=/g, (c) => replacements[c]);
    }
    sign(data) {
        return this.#sign(data, this.#keys[0]);
    }
    verify(data, digest) {
        return this.indexOf(data, digest) > -1;
    }
    indexOf(data, digest) {
        for (let i = 0; i < this.#keys.length; i++) {
            if (compare(digest, this.#sign(data, this.#keys[i]))) {
                return i;
            }
        }
        return -1;
    }
    [Symbol.for("Deno.customInspect")](inspect) {
        return `${this.constructor.name} ${inspect({
            length: this.length,
        })}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5U3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJrZXlTdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUsxQyxNQUFNLFlBQVksR0FBMkI7SUFDM0MsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxFQUFFO0NBQ1IsQ0FBQztBQUVGLE1BQU0sT0FBTyxRQUFRO0lBQ25CLEtBQUssQ0FBUTtJQUViLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQVNELFlBQVksSUFBVztRQUNyQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDaEIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFVLEVBQUUsR0FBUTtRQUN4QixPQUFPLElBQUksQ0FDVCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDdkIsU0FBUyxFQUVULElBQUksVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBUSxDQUN0RSxDQUNGO2FBQ0UsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUtELElBQUksQ0FBQyxJQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUtELE1BQU0sQ0FBQyxJQUFVLEVBQUUsTUFBYztRQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFLRCxPQUFPLENBQUMsSUFBVSxFQUFFLE1BQWM7UUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDcEQsT0FBTyxDQUFDLENBQUM7YUFDVjtTQUNGO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLE9BQW1DO1FBQ3BFLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFDN0IsT0FBTyxDQUFDO1lBQ04sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQ0gsRUFBRSxDQUFDO0lBQ0wsQ0FBQztDQUNGIn0=