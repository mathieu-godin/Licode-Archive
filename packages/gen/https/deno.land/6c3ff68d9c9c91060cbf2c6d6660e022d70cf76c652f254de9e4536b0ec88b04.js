export function ber_decode(bytes, from, to) {
    return ber_next(bytes);
}
function ber_sequence(bytes, from, length) {
    const end = from + length;
    let res = [];
    let ptr = from;
    while (ptr < end) {
        const next = ber_next(bytes, ptr);
        res.push(next);
        ptr += next.totalLength;
    }
    return res;
}
function ber_integer(bytes, from, length) {
    let n = 0n;
    for (const b of bytes.slice(from, from + length)) {
        n = (n << 8n) + BigInt(b);
    }
    return n;
}
function ber_oid(bytes, from, length) {
    const id = [
        (bytes[from] / 40) | 0,
        (bytes[from] % 40),
    ];
    let value = 0;
    for (const b of bytes.slice(from + 1, from + length)) {
        if (b > 128)
            value += value * 127 + (b - 128);
        else {
            value = value * 128 + b;
            id.push(value);
            value = 0;
        }
    }
    return id.join(".");
}
function ber_unknown(bytes, from, length) {
    return bytes.slice(from, from + length);
}
export function ber_simple(n) {
    if (Array.isArray(n.value))
        return n.value.map((x) => ber_simple(x));
    return n.value;
}
function ber_next(bytes, from, to) {
    if (!from)
        from = 0;
    if (!to)
        to = bytes.length;
    let ptr = from;
    const type = bytes[ptr++];
    let size = bytes[ptr++];
    if ((size & 0x80) > 0) {
        let ext = size - 0x80;
        size = 0;
        while (--ext >= 0) {
            size = (size << 8) + bytes[ptr++];
        }
    }
    let value = null;
    if (type === 0x30) {
        value = ber_sequence(bytes, ptr, size);
    }
    else if (type === 0x2) {
        value = ber_integer(bytes, ptr, size);
    }
    else if (type === 0x3) {
        value = ber_sequence(bytes, ptr + 1, size - 1);
    }
    else if (type === 0x5) {
        value = null;
    }
    else if (type === 0x6) {
        value = ber_oid(bytes, ptr, size);
    }
    else {
        value = ber_unknown(bytes, ptr, size);
    }
    return {
        totalLength: (ptr - from) + size,
        type,
        length: size,
        value,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNfZW5jb2RpbmdfcnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2ljX2VuY29kaW5nX3J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JBLE1BQU0sVUFBVSxVQUFVLENBQ3hCLEtBQWlCLEVBQ2pCLElBQWEsRUFDYixFQUFXO0lBRVgsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUNuQixLQUFpQixFQUNqQixJQUFZLEVBQ1osTUFBYztJQUVkLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUM7SUFDMUIsSUFBSSxHQUFHLEdBQXdCLEVBQUUsQ0FBQztJQUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFFZixPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDaEIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2YsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDekI7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFpQixFQUFFLElBQVksRUFBRSxNQUFjO0lBQ2xFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNYLEtBQUssTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFO1FBQ2hELENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0I7SUFDRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxLQUFpQixFQUFFLElBQVksRUFBRSxNQUFjO0lBQzlELE1BQU0sRUFBRSxHQUFH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