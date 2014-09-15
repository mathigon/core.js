// =================================================================================================
// Tesla.js | Array Functions
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    M.extend(Array.prototype, {

        // Runs the function fn(element, index) for every element in an array
        each: function(fn, reverse) {
            var x = [], i;

            if (reverse) {
                for (i = this.length - 1; i >= 0; --i)
                    if (M.has(this, i)) x[i] = fn(this[i], i);
            } else {
                for (i = 0, l = this.length; i < l; ++i)
                    if (M.has(this, i)) x[i] = fn(this[i], i);
            }

            return x;
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
        }

    }, true);

})();
