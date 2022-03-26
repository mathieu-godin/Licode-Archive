function pad(number, digits) {
    let padded = "" + number;
    while (padded.length < digits) {
        padded = "0" + padded;
    }
    return padded;
}
function encodeDate(date) {
    const year = pad(date.getFullYear(), 4);
    const month = pad(date.getMonth() + 1, 2);
    const day = pad(date.getDate(), 2);
    const hour = pad(date.getHours(), 2);
    const min = pad(date.getMinutes(), 2);
    const sec = pad(date.getSeconds(), 2);
    const ms = pad(date.getMilliseconds(), 3);
    const encodedDate = `${year}-${month}-${day}T${hour}:${min}:${sec}.${ms}`;
    const offset = date.getTimezoneOffset();
    const tzSign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const tzHours = pad(Math.floor(absOffset / 60), 2);
    const tzMinutes = pad(Math.floor(absOffset % 60), 2);
    const encodedTz = `${tzSign}${tzHours}:${tzMinutes}`;
    return encodedDate + encodedTz;
}
function escapeArrayElement(value) {
    const strValue = value.toString();
    const escapedValue = strValue.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `"${escapedValue}"`;
}
function encodeArray(array) {
    let encodedArray = "{";
    array.forEach((element, index) => {
        if (index > 0) {
            encodedArray += ",";
        }
        if (element === null || typeof element === "undefined") {
            encodedArray += "NULL";
        }
        else if (Array.isArray(element)) {
            encodedArray += encodeArray(element);
        }
        else if (element instanceof Uint8Array) {
            throw new Error("Can't encode array of buffers.");
        }
        else {
            const encodedElement = encodeArgument(element);
            encodedArray += escapeArrayElement(encodedElement);
        }
    });
    encodedArray += "}";
    return encodedArray;
}
function encodeBytes(value) {
    const hex = Array.from(value)
        .map((val) => (val < 0x10 ? `0${val.toString(16)}` : val.toString(16)))
        .join("");
    return `\\x${hex}`;
}
export function encodeArgument(value) {
    if (value === null || typeof value === "undefined") {
        return null;
    }
    else if (value instanceof Uint8Array) {
        return encodeBytes(value);
    }
    else if (value instanceof Date) {
        return encodeDate(value);
    }
    else if (value instanceof Array) {
        return encodeArray(value);
    }
    else if (value instanceof Object) {
        return JSON.stringify(value);
    }
    else {
        return String(value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsR0FBRyxDQUFDLE1BQWMsRUFBRSxNQUFjO0lBQ3pDLElBQUksTUFBTSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFDekIsT0FBTyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtRQUM3QixNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztLQUN2QjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxJQUFVO0lBRTVCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTFDLE1BQU0sV0FBVyxHQUFHLEdBQUcsSUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUM7SUFZMUUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXJELE1BQU0sU0FBUyxHQUFHLEdBQUcsTUFBTSxHQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUVyRCxPQUFPLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDakMsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBYztJQUV4QyxNQUFNLFFBQVEsR0FBSSxLQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0MsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUxRSxPQUFPLElBQUksWUFBWSxHQUFHLENBQUM7QUFDN0IsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEtBQXFCO0lBQ3hDLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQztJQUV2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQy9CLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLFlBQVksSUFBSSxHQUFHLENBQUM7U0FDckI7UUFFRCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFO1lBQ3RELFlBQVksSUFBSSxNQUFNLENBQUM7U0FDeEI7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakMsWUFBWSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QzthQUFNLElBQUksT0FBTyxZQUFZLFVBQVUsRUFBRTtZQUV4QyxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxZQUFZLElBQUksa0JBQWtCLENBQUMsY0FBd0IsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxZQUFZLElBQUksR0FBRyxDQUFDO0lBQ3BCLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFpQjtJQUNwQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMxQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0RSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDWixPQUFPLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUlELE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBYztJQUMzQyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1FBQ2xELE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTSxJQUFJLEtBQUssWUFBWSxVQUFVLEVBQUU7UUFDdEMsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7U0FBTSxJQUFJLEtBQUssWUFBWSxJQUFJLEVBQUU7UUFDaEMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7U0FBTSxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7UUFDakMsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7U0FBTSxJQUFJLEtBQUssWUFBWSxNQUFNLEVBQUU7UUFDbEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCO1NBQU07UUFDTCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0QjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBwYWQobnVtYmVyOiBudW1iZXIsIGRpZ2l0czogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHBhZGRlZCA9IFwiXCIgKyBudW1iZXI7XG4gIHdoaWxlIChwYWRkZWQubGVuZ3RoIDwgZGlnaXRzKSB7XG4gICAgcGFkZGVkID0gXCIwXCIgKyBwYWRkZWQ7XG4gIH1cbiAgcmV0dXJuIHBhZGRlZDtcbn1cblxuZnVuY3Rpb24gZW5jb2RlRGF0ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgLy8gQ29uc3RydWN0IElTTyBkYXRlXG4gIGNvbnN0IHllYXIgPSBwYWQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KTtcbiAgY29uc3QgbW9udGggPSBwYWQoZGF0ZS5nZXRNb250aCgpICsgMSwgMik7XG4gIGNvbnN0IGRheSA9IHBhZChkYXRlLmdldERhdGUoKSwgMik7XG4gIGNvbnN0IGhvdXIgPSBwYWQoZGF0ZS5nZXRIb3VycygpLCAyKTtcbiAgY29uc3QgbWluID0gcGFkKGRhdGUuZ2V0TWludXRlcygpLCAyKTtcbiAgY29uc3Qgc2VjID0gcGFkKGRhdGUuZ2V0U2Vjb25kcygpLCAyKTtcbiAgY29uc3QgbXMgPSBwYWQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMyk7XG5cbiAgY29uc3QgZW5jb2RlZERhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1UJHtob3VyfToke21pbn06JHtzZWN9LiR7bXN9YDtcblxuICAvLyBDb25zdHJ1Y3QgdGltZXpvbmUgaW5mb1xuICAvL1xuICAvLyBEYXRlLnByb3RvdHlwZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAvL1xuICAvLyBGcm9tIE1ETjpcbiAgLy8gPiBUaGUgdGltZS16b25lIG9mZnNldCBpcyB0aGUgZGlmZmVyZW5jZSwgaW4gbWludXRlcywgZnJvbSBsb2NhbCB0aW1lIHRvIFVUQy5cbiAgLy8gPiBOb3RlIHRoYXQgdGhpcyBtZWFucyB0aGF0IHRoZSBvZmZzZXQgaXMgcG9zaXRpdmUgaWYgdGhlIGxvY2FsIHRpbWV6b25lIGlzXG4gIC8vID4gYmVoaW5kIFVUQyBhbmQgbmVnYXRpdmUgaWYgaXQgaXMgYWhlYWQuIEZvciBleGFtcGxlLCBmb3IgdGltZSB6b25lIFVUQysxMDowMFxuICAvLyA+IChBdXN0cmFsaWFuIEVhc3Rlcm4gU3RhbmRhcmQgVGltZSwgVmxhZGl2b3N0b2sgVGltZSwgQ2hhbW9ycm8gU3RhbmRhcmQgVGltZSksXG4gIC8vID4gLTYwMCB3aWxsIGJlIHJldHVybmVkLlxuICBjb25zdCBvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gIGNvbnN0IHR6U2lnbiA9IG9mZnNldCA+IDAgPyBcIi1cIiA6IFwiK1wiO1xuICBjb25zdCBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICBjb25zdCB0ekhvdXJzID0gcGFkKE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLCAyKTtcbiAgY29uc3QgdHpNaW51dGVzID0gcGFkKE1hdGguZmxvb3IoYWJzT2Zmc2V0ICUgNjApLCAyKTtcblxuICBjb25zdCBlbmNvZGVkVHogPSBgJHt0elNpZ259JHt0ekhvdXJzfToke3R6TWludXRlc31gO1xuXG4gIHJldHVybiBlbmNvZGVkRGF0ZSArIGVuY29kZWRUejtcbn1cblxuZnVuY3Rpb24gZXNjYXBlQXJyYXlFbGVtZW50KHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHtcbiAgLy8gZGVuby1saW50LWlnbm9yZSBuby1leHBsaWNpdC1hbnlcbiAgY29uc3Qgc3RyVmFsdWUgPSAodmFsdWUgYXMgYW55KS50b1N0cmluZygpO1xuICBjb25zdCBlc2NhcGVkVmFsdWUgPSBzdHJWYWx1ZS5yZXBsYWNlKC9cXFxcL2csIFwiXFxcXFxcXFxcIikucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpO1xuXG4gIHJldHVybiBgXCIke2VzY2FwZWRWYWx1ZX1cImA7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUFycmF5KGFycmF5OiBBcnJheTx1bmtub3duPik6IHN0cmluZyB7XG4gIGxldCBlbmNvZGVkQXJyYXkgPSBcIntcIjtcblxuICBhcnJheS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgIGVuY29kZWRBcnJheSArPSBcIixcIjtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgZW5jb2RlZEFycmF5ICs9IFwiTlVMTFwiO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xuICAgICAgZW5jb2RlZEFycmF5ICs9IGVuY29kZUFycmF5KGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgIC8vIFRPRE86IGl0IHNob3VsZCBiZSBlbmNvZGVkIGFzIGJ5dGVhP1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZW5jb2RlIGFycmF5IG9mIGJ1ZmZlcnMuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlbmNvZGVkRWxlbWVudCA9IGVuY29kZUFyZ3VtZW50KGVsZW1lbnQpO1xuICAgICAgZW5jb2RlZEFycmF5ICs9IGVzY2FwZUFycmF5RWxlbWVudChlbmNvZGVkRWxlbWVudCBhcyBzdHJpbmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgZW5jb2RlZEFycmF5ICs9IFwifVwiO1xuICByZXR1cm4gZW5jb2RlZEFycmF5O1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCeXRlcyh2YWx1ZTogVWludDhBcnJheSk6IHN0cmluZyB7XG4gIGNvbnN0IGhleCA9IEFycmF5LmZyb20odmFsdWUpXG4gICAgLm1hcCgodmFsKSA9PiAodmFsIDwgMHgxMCA/IGAwJHt2YWwudG9TdHJpbmcoMTYpfWAgOiB2YWwudG9TdHJpbmcoMTYpKSlcbiAgICAuam9pbihcIlwiKTtcbiAgcmV0dXJuIGBcXFxceCR7aGV4fWA7XG59XG5cbmV4cG9ydCB0eXBlIEVuY29kZWRBcmcgPSBudWxsIHwgc3RyaW5nIHwgVWludDhBcnJheTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZUFyZ3VtZW50KHZhbHVlOiB1bmtub3duKTogRW5jb2RlZEFyZyB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICByZXR1cm4gZW5jb2RlQnl0ZXModmFsdWUpO1xuICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBlbmNvZGVEYXRlKHZhbHVlKTtcbiAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIGVuY29kZUFycmF5KHZhbHVlKTtcbiAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==