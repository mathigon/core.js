// =================================================================================================
// Core.js | Array Functions
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    function getLength(array) {
        return array.length;
    }


    // ---------------------------------------------------------------------------------------------
    // Array Generators

    function tabulateWith(fn, vals, args) {
        if (!args.length) return M.run(fn, vals);

        var newArgs = _arraySlice.call(args, 0);
        var x = newArgs.shift();

        var result = [];
        for (var i=0; i<x; ++i) result.push(tabulateWith(fn, vals.concat([i]), newArgs));
        return result;
    }

    M.tabulate = function(fn, x, y, z) {
        var indices = M.toArray(arguments);
        _arrayShift.call(indices);
        return tabulateWith(fn, [], indices);
    };

    M.list = function(a, b, step) {
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
    };


    // ---------------------------------------------------------------------------------------------
    // Array Functions

    // For types that cannot be converted to an array, toArray() returns a 1 item array containing
    // the passed-in object.

    var unsliceable = ['undefined', 'null', 'number', 'boolean', 'string', 'function'];

    M.toArray = function(obj) {
        return unsliceable.has(M.typeof(obj)) ? [obj] : Array.prototype.slice.call(obj, 0);
    };

    M.map = function(fn) {
        var arrays = M.toArray(arguments);
        _arrayShift.call(arrays);

        var maxLength = Math.max.apply(Math, M.each(arrays, getLength));

        return M.tabulate(function(i) {
            return fn.apply(null, M.each(arrays, function(x) { return x[i]; }));
        }, maxLength);
    };


    // ---------------------------------------------------------------------------------------------
    // Array Prototype

    M.extend(Array.prototype, {

        // Runs the function fn(element, index) for every element in an array
        each: function(fn, reverse) {
            var x = [], i;
            var n = this.length;

            if (reverse) {
                for (i = n - 1; i >= 0; --i)
                    if (M.has(this, i)) x[i] = fn(this[i], i);
            } else {
                for (i = 0; i < n; ++i)
                    if (M.has(this, i)) x[i] = fn(this[i], i);
            }

            return x;
        },

        has: function(x) {
            return this.indexOf(x) !== -1;
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

        // Finds the minimum of all values in an array a
        min: function() {
            return Math.min.apply(Math, this);
        },

        // Finds the maximum of all values in an array a
        max: function() {
            return Math.max.apply(Math, this);
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

        // Removes duplicates in an array a
        unique: function() {
            var b = [], n = this.length;
            for (var i = 0; i < n; ++i)
                if (b.indexOf(this[i]) === -1) b.push(this[i]);
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
        }

    }, true);

})();
