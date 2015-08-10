// =============================================================================
// Core.js | Arrays
// (c) 2015 Mathigon
// =============================================================================



import { run } from 'utilities';


// -----------------------------------------------------------------------------
// Array Generators

function _tabulateWith(fn, vals, args) {
    if (!args.length) return run(fn, vals);

    var newArgs = _arraySlice.call(args, 0);
    var x = newArgs.shift();

    var result = [];
    for (var i=0; i<x; ++i) result.push(_tabulateWith(fn, vals.concat([i]), newArgs));
    return result;
}

function tabulate(fn, ...dimensions) {
    return _tabulateWith(fn, [], dimensions);
}

function list(a, b, step = 1) {
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

function map(fn, ...args) {
    let length = Math.max(...args.map(a => a.length));
    return tabulate(i => fn(...arrays.map(a => a[i])), length);
}

function total(array) {
    return array.reduce((t, v) => t + (+v || 0));
}

function extract(array, id) {
    return array.map(a => a[id]);
}

function zip(keys, values) {
    let obj = {};
    for (let i=0; i < keys.length; ++i)
        obj[keys[i]] = values[i];
    return obj;
}

function sortBy(array, id, reverse = false) {
    return array.sort((a, b) => reverse ? b[id] - a[id] : a[id] - b[id]);
}


// -----------------------------------------------------------------------------
// Array Modifyers

function unique(array) {
    let b = [];

    for (let i = 0; i < array.length; ++i)
        if (b.indexOf(array[i]) === -1) b.push(array[i]);

    return b;
}

// Removes any null or undefined values in array a
function clean(array) {
    let b = [];

    for (let i = 0; i < array.length; ++i)
        if (array[i] != null) b.push(array[i]);

    return b;
}

// Removes all occurrences of x from the array a
function without(array, x) {
    let b = [];

    for (let i = 0; i < array.length; ++i)
        if (array[i] !== x) b.push(array[i]);

    return b;
}

function flatten(array) {
    let flat = array.slice.call(0);
    let current = flat;

    while (Array.isArray(flat[0])) {
        var next = [];
        for (var i = 0, n = flat.length; i < n; ++i) {
            next = next.concat.apply(next, flat[i]);
        }
        flat = next;
    }

    return flat;
}

function cumulative(array) {
    let total = 0;
    return array.map(a => total += a);
}

// Breaks an array into chunks of size at most n
function chunk(array, n) {
    let chunks = [];
    let lastChunk = [];
    let count = 0, l = array.length;

    for (let i = 0; i < l; ++i) {
        lastChunk.push(array[i]);
        ++count;
        if (count >= n) {
            chunks.push(lastChunk);
            lastChunk = [];
            count = 0;
        }
    }

    if (lastChunk.length) chunks.push(lastChunk);
    return chunks;
}

// Rotates the elements of an array by offset
function rotate(array, offset) {
    let n = array.length;
    offset = ((offset % n) + n) % n; // offset could initially be negative...
    
    let start = array.slice(0, offset);
    let end = array.slice(offset);
    
    end.push(...start);
    return end;
}


// -----------------------------------------------------------------------------
// Array Combinations

function intersect(a1, a2) {
    let result = [];

    for (let i = 0; i < a1.length; ++i)
        if (a2.indexOf(a1[i]) === -1) result.push(a1[i]);

    return result;
}

function difference(a1, a2) {
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


// -----------------------------------------------------------------------------

export default {
    tabulate, list,
    map, total, extract, zip, sortBy,
    unique, clean, without, flatten, cumulative, chunk, rotate,
    intersect, difference };

