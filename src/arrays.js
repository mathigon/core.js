// =============================================================================
// Core.js | Arrays
// (c) 2015 Mathigon
// =============================================================================



import { run } from './utilities';


// -----------------------------------------------------------------------------
// Array Generators

function _tabulateWith(fn, vals, args) {
    if (!args.length) return run(fn, vals);

    var newArgs = Array.prototype.slice.call(args, 0);
    var x = newArgs.shift();

    var result = [];
    for (var i=0; i<x; ++i) result.push(_tabulateWith(fn, vals.concat([i]), newArgs));
    return result;
}

export function tabulate(fn, ...dimensions) {
    return _tabulateWith(fn, [], dimensions);
}

export function list(a, b, step = 1) {
    var arr = [], i;

    if (b == null && a >= 0) {
        for (i=0; i<a; i += step) arr.push(i);
    } else if (b == null) {
        for (i=0; i>a; i -= step) arr.push(i);
    } else if (a <= b) {
        for (i=a; i<=b; i += step) arr.push(i);
    } else {
        for (i=a; i>=b; i -= step) arr.push(i);
    }

    return arr;
}


// -----------------------------------------------------------------------------
// Array Utilities

export function last(array) {
    return array[array.length - 1];
}

export function map(fn, ...args) {
    let length = Math.max(...args.map(a => a.length));
    return tabulate(i => fn(...arrays.map(a => a[i])), length);
}

export function total(array) {
    if (!array.length) return 0;
    return array.reduce((t, v) => t + (+v || 0));
}

export function average(array) {
    return array.total / array.length;
}

export function contains(array, value) {
    return array.indexOf(value) >= 0;
}

export function extract(array, id) {
    return array.map(a => a[id]);
}

export function zip(keys, values) {
    let obj = {};
    for (let i=0; i < keys.length; ++i)
        obj[keys[i]] = values[i];
    return obj;
}

export function sortBy(array, id, reverse = false) {
    return array.sort((a, b) => reverse ? b[id] - a[id] : a[id] - b[id]);
}

export function loop(array) {
    let i = -1;
    return function() { i = (i + 1) % array.length; return array[i]; };
}


// -----------------------------------------------------------------------------
// Array Modifiers

export function unique(array) {
    return array.filter((a, i, _this) => _this.indexOf(a) == i);
    // return [...new Set([this])];
}

// Removes any null or undefined values in array a
export function clean(array) {
    return array.filter(a => a != null);
}

// Removes all occurrences of x from the array a
export function without(array, x) {
    return array.filter(a => a !== x);
}

export function flatten(array) {
    return array.reduce((a, b) => a.concat(Array.isArray(b) ? b.flatten() : b), []);
}

export function cumulative(array) {
    let total = 0;
    return array.map(a => total += a);
}

// Breaks an array into chunks of size at most n
export function chunk(array, n) {
    let chunks = [];
    for (let i = 0; i < array.length; i += n) {
        chunks.push(array.slice(i, i + n));
    }
    return chunks;
}

// Rotates the elements of an array by offset
export function rotate(array, offset) {
    let n = array.length;
    offset = ((offset % n) + n) % n; // offset could initially be negative...

    let start = array.slice(0, offset);
    let end = array.slice(offset);
    return end.concat(start);
}


// -----------------------------------------------------------------------------
// Array Combinations

export function intersect(a1, a2) {
    let result = [];

    for (let i = 0; i < a1.length; ++i)
        if (a2.indexOf(a1[i]) === -1) result.push(a1[i]);

    return result;
}

export function difference(a1, a2) {
    let length1 = a1.length;
    let length2 = a2.length;
    let result = [];

    outer:
    for (let i = 0; i < length1; ++i) {
        let value = a1[i];
        for (let j = 0; j < length2; ++j) {
            if (value === a2[j]) continue outer;
        }
        result.push(value);
    }

    return result;
}
