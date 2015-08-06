// =============================================================================
// Core.js | Arrays
// (c) 2015 Mathigon
// =============================================================================



// -----------------------------------------------------------------------------
// Array Generators

function _tabulateWith(fn, vals, args) {
    if (!args.length) return M.run(fn, vals);

    var newArgs = _arraySlice.call(args, 0);
    var x = newArgs.shift();

    var result = [];
    for (var i=0; i<x; ++i) result.push(_tabulateWith(fn, vals.concat([i]), newArgs));
    return result;
}

function tabulate(fn, x, y, z) {
    var indices = M.toArray(arguments);
    _arrayShift.call(indices);
    return _tabulateWith(fn, [], indices);
}

function list(a, b, step) {
    if (!step) step = 1;
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
// Array Functions

function map(fn, ...args) {
    var length = Math.max(...args.map(a => a.length));
    return tabulate(i => fn(...arrays.map(a => a[i])), length);
}

function concat(first, ...rest) {
    if (rest.length > 1) return concat(first, concat(rest));

    let a = first.slice(0);
    let b = rest[0];

    for (let x of b) a.push(x);
    return a;
}

function total(array) {
    let t = 0;
    for (a of array) t += a;
    return t;
}

function cumulative(array) {
    var total = 0;

    return array.map(function(a) {
        total += a;
        return total;
    });
}

function intersect(a1, a2) {
    // TODO
}

function difference(a1, a2) {
    // TODO check?
    var length1 = a1.length;
    var length2 = a2.length;
    var result = [];

    outer:
    for (var i = 0; i < length1; ++i) {
        var value = a1[i];
        for (var j = 0; j < length2; ++j) {
            if (value === a2[j]) continue outer;
        }
        result.push(value);
    }

    return result;
} 

function unique() {
    var b = [], n = this.length;
    for (var i = 0; i < n; ++i)
        if (b.indexOf(this[i]) === -1) b.push(this[i]);
    return b;
}



/*

    every: function(fn) {
        var n = this.length;

        for (var i = 0; i < n; ++i)
            if (!fn(this[i], i)) return false;

        return this;
    },

    some: function(fn) {
        var n = this.length;

        for (var i = 0; i < n; ++i)
            if (fn(this[i], i)) return true;

        return false;
    },

    extract: function(id) {
        return this.map(function(a) { return a[id]; });
    },

    total: function() {
        var total = 0, n = this.length;
        for (var i=0; i < n; ++i) total += (+this[i] || 0);
        return total;
    },

    first: function() {
        return this[0];
    },

    last: function() {
        return this[this.length - 1];
    },

    // minIndex
    // maxIndex

    // Finds the maximum of all values in an array a
    maxAbs: function() {
        var max = this.max();
        var min = this.min();
        return Math.abs(max) > Math.abs(min) ? max : min;
    },

    // Finds the smallest and the largest value in the arra a
    range: function() {
        return [this.min(), this.max()];
    },

    // Removes any null or undefined values in array a
    clean: function() {
        var b = [], n = this.length;
        for (var i = 0; i < n; ++i)
            if (this[i] != null) b.push(this[i]);
        return b;
    },

    // Removes all occurrences of x from the array a
    without: function(x) {
        var b = [], n = this.length;
        for (var i = 0; i < n; ++i)
            if (this[i] !== x) b.push(this[i]);
        return b;
    },

    // Breaks an array a into chunks of size at most n
    chunk: function(n) {
        var chunks = [];
        var lastChunk = [];
        var count = 0, l = this.length;

        for (var i = 0; i < l; ++i) {
            lastChunk.push(this[i]);
            ++count;
            if (count >= n) {
                chunks.push(lastChunk);
                lastChunk = [];
                count = 0;
            }
        }

        if (lastChunk.length) _arrayPush.call(chunks, lastChunk);
        return chunks;
    },

    // Rotates the elements of an array by offset
    rotate: function(offset) {
        var n = this.length;
        offset = ((offset % n) + n) % n; // offset could initially be negative...
        var start = this.slice(0, offset);
        var end = this.slice(offset);
        _arrayPush.apply(end, start);
        return end;
    },

    // Flatten a multi dimensional array, put all elements in a one dimensional array
    flatten: function() {
        var flat = _arraySlice.call(this, 0);

        while (M.isArray(flat[0])) {
            var next = [];
            for (var i = 0, n = flat.length; i < n; ++i) {
                next = next.concat.apply(next, flat[i]);
            }
            flat = next;
        }

        return flat;
    },

    sortBy: function(p, reverse) {
        return this.sort(function(a, b) { return reverse ? b[p] - a[p] : a[p] - b[p]; });
    }

*/

// -----------------------------------------------------------------------------

export default {
    tabulate, list, map, concat, total, cumulative,
    intersect, difference, unique };

