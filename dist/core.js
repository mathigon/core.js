// Core JavaScript Tools
// (c) 2015, Mathigon / Philipp Legner
// MIT License (https://github.com/Mathigon/core.js/blob/master/LICENSE)

 (function() {
var M = { core: true };

var _arrayPush = Array.prototype.push;
var _arraySlice = Array.prototype.slice;
var _arrayShift = Array.prototype.shift;
var _arrayJoin = Array.prototype.join;

// Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = M;
    global.M = M;

// AMD module
} else if (typeof define === 'function' && define.amd) {
    define(M);

// Global variable
} else {
    window.M = M;
}


// =================================================================================================


M.noop = function() {};

M.trueop = function(){ return true; };

M.run = function(obj, args, _this) {
    if (obj instanceof Function) return obj.apply(_this || null, args);
    return obj;
};

// Checks if x is strictly equal to any one of the following arguments
M.isOneOf = function(x, values) {
    for (var i=1; i<arguments.length; ++i)
        if (x === arguments[i]) return true;
    return false;
};

// Wrapper for functions to cache their result based on arguments
M.cache = function(fn, _this) {
    var cache = {};
    return function() {
        var args = _arrayJoin.call(arguments, '--');
        if (!cache.hasOwnProperty(args)) cache[args] = fn.apply(_this, arguments);
        return cache[args];
    };
};

(function() {

    // ---------------------------------------------------------------------------------------------
    // Object Functions

    M.object = {};

    // Checks is an object has a given key
    M.has = function(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };

    // Returns an array with all keys in an object
    M.object.keys = Object.keys || function(obj) {
        var keys = [];
        for (var key in obj) if (M.has(obj, key)) keys.push(key);
        return keys;
    };

    // Swaps keys and values for an object
    M.object.invert = function(obj) {
        var result = {};
        var keys = M.keys(obj);
        for (var i = 0, l = keys.length; i < l; ++i) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

    M.object.create = Object.create || (function () {
        function F() {}
        return function (proto) {
            F.prototype = proto;
            return new F();
        };
    })();


    // ---------------------------------------------------------------------------------------------
    // Object/Array Iterators

    // Executes fn for every value in an array or an object, and returns the map
    M.each = function(collection, fn) {
        var result, i;
        var l = collection.length;
        if (l === 0 || (l && collection.hasOwnProperty(l-1))) {
            result = [];
            for (i=0; i<l; ++i) if (M.has(collection, i)) result.push(fn(collection[i], i));
        } else {
            result = {};
            for (i in collection) if (M.has(collection, i)) result[i] = fn(collection[i], i);
        }
        return result;
    };

    // Executes fn for every value in an array or an object, until the function returns a
    // non-undefined value. Then the loop stops and M.some returns that value;
    M.some = function(collection, fn) {
        var i, x;
        var l = collection.length;
        if (l === 0 || (l && collection.hasOwnProperty(l-1))) {
            for (i=0; i<l; ++i) if (M.has(collection, i)) {
                x = fn(collection[i], i);
                if (x !== undefined) return x;
            }
        } else {
            for (i in collection) if (M.has(collection, i)) {
                x = fn(collection[i], i);
                if (x !== undefined) return x;
            }
        }
    };



    // ---------------------------------------------------------------------------------------------
    // Object Extend

   function makePrototype(obj, name, fn) {
        Object.defineProperty(obj, name, {
            enumerable: false,
            writable: true,
            value: fn
        });
    }

    M.extend = function(obj, properties, nonEnumerable) {
        for (var p in properties) {
            if (M.has(properties, p)) {
                if (properties[p] === undefined) {
                    delete obj[p];
                } else if (nonEnumerable) {
                    makePrototype(obj, p, properties[p]);
                } else {
                    obj[p] = properties[p];
                }
            }
        }
    };

    M.extendPrototype = function(obj, properties) {
        for (var p in properties) {
            if (M.has(properties, p) && !obj.prototype[p]) {
                makePrototype(obj.prototype, p, properties[p]);
            }
        }
    };

    // Merges multiple objects into a single one
    M.merge = function() {
        var result = {};
        for (var i=0; i<arguments.length; ++i) {
            M.each(arguments[i], function(value, property) { result[property] = value; });  // jshint ignore:line
        }
        return result;
    };


    // ---------------------------------------------------------------------------------------------
    // Object Watchers
    // https://gist.github.com/eligrey/384583

    M.watch = function(obj, prop, handler) {
        var value = obj[prop];

        var getter = function () { return value; };
        var setter = function (newVal) {
            var oldVal = value;
            value = newVal;
            return newVal = handler.call(this, newVal, oldVal);  // jshint ignore:line
        };

        if (delete obj[prop]) { // can't watch constants
            Object.defineProperty(obj, prop, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    };

    M.unwatch = function(obj, prop) {
        var val = obj[prop];
        delete obj[prop]; // remove accessor
        obj[prop] = val;
    };

})();

(function() {

    var typeCache = {};
    var typeRegexp = /\s([a-zA-Z]+)/;

    M.typeof = function(obj) {

        // Matches null and undefined
        if (obj == null) return '' + obj;

        // Matches NaN (different to number)
        if (M.isNaN(obj)) return 'nan';

        // Matches all other types
        var type = toString.call(obj);
        return typeCache[type] || (typeCache[type] = type.match(typeRegexp)[1].toLowerCase());
    };

    // ---------------------------------------------------------------------------------------------

    M.isType = function(x, type) {
        return M.typeof(x) === type;
    };

    M.isString = function(x) {
        return (x instanceof String) || (typeof x === 'string');
    };

    M.isArray = Array.isArray || function(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    };

    M.isNumber = function(x) {
        return (x instanceof Number) || (typeof x === 'number');
    };

    M.isInteger = function(x) {
        return x % 1 === 0;
    };

    M.isDate = function(x) {
        return Object.prototype.toString.call(x) === '[object Date]';
    };

    M.isNaN = function(x) {
        return x !== x;
    };

    M.isFunction = function(x) {
        return x instanceof Function;
    };

    M.isBoolean = function(x) {
        return (x instanceof Boolean) || (typeof x === 'boolean');
    };

    M.isObject = function(x) {
        return x === Object(x);
    };

})();

(function() {

    // ---------------------------------------------------------------------------------------------
    // Copy

    M.shallowCopy = function(obj) {
        /*jshint -W053 */

        // Handle (simple) strings, numbers, booleans, null and undefined
        var type = typeof obj;
        if (obj == null || M.isOneOf(type, 'number', 'string', 'boolean')) return obj;

        // Hande other type objects
        if (obj instanceof Number)  return new Number(obj.valueOf());
        if (obj instanceof String)  return new String(obj.valueOf());
        if (obj instanceof Boolean) return new Boolean(obj.valueOf());
        if (obj instanceof Date)    return new Date(obj.valueOf());
        if (obj instanceof RegExp)  return new RegExp(obj);

        // Handle Arrays and Objects
        return M.each(obj, function(val) { return val; });
    };

    // ---------------------------------------------------------------------------------------------

    var deepCopyStore = [];

    function deepCopyStoreLookup(obj) {
        for (var i=0; i<deepCopyStore.length; ++i)
            if (deepCopyStore[i][0] === obj) return deepCopyStore[i][1];
        return null;
    }

    function deepCopyHelper(obj) {
        /*jshint -W053 */

        // Handle (simple) strings, numbers, booleans, null and undefined
        var type = typeof obj;
        if (obj == null || M.isOneOf(type, 'number', 'string', 'boolean')) return obj;

        // Hande other type objects
        if (obj instanceof Number)  return new Number(obj.valueOf());
        if (obj instanceof String)  return new String(obj.valueOf());
        if (obj instanceof Boolean) return new Boolean(obj.valueOf());
        if (obj instanceof Date)    return new Date(obj.valueOf());
        if (obj instanceof RegExp)  return new RegExp(obj);

        // Avoids Recursive Loops
        var x = deepCopyStoreLookup(obj);
        if (x) return x;

        var copy = obj;

        // Handle Arrays
        if (M.isArray(obj)) {
            copy = [];
            deepCopyStore.push([obj, copy]);
            for (var i = 0, l = obj.length; i < l; ++i) copy[i] = deepCopyHelper(obj[i]);

        // Handle Objects
        } else if (obj instanceof Object) {
            copy = {};
            deepCopyStore.push([obj, copy]);
            for (var attr in obj) if (M.has(obj, attr)) copy[attr] = deepCopyHelper(obj[attr]);
        }

        return copy;
    }

    M.deepCopy = function(obj) {
        deepCopyStore = [];
        var copy = deepCopyHelper(obj);
        deepCopyStore = [];
        return copy;
    };


    // ---------------------------------------------------------------------------------------------
    // Equals

    M.shallowEquals = function(obj1, obj2) {
        // TODO
    };

    // ---------------------------------------------------------------------------------------------

    M.deepEquals = function(obj1, obj2) {
        // TODO
    };

})();

(function() {

    M.inherit = function(ChildClass, ParentClass) {
        ChildClass.prototype = new ParentClass;  // jshint ignore:line
        ChildClass.prototype.constructor = this;
    };

    M.Class = function() {
        this._events = {};
        this._properties = {};
        this._timeouts = {};
    };

    M.extend(M.Class.prototype, {

        on: function(events, fn, priority) {
            var _this = this;
            events.words().each(function(e) {
                if (!_this._events[e]) _this._events[e] = [];
                _this._events[e].push({ fn: fn, priority: priority || 0 });
            });
        },

        off: function(events, fn) {
            var _this = this;
            events.words().each(function(e) {
                if (_this._events[e])
                    _this._events[e] = _this._events[e].filter(function(x) { return x.fn !== fn; });
            });
        },

        trigger: function(events, args) {
            var _this = this;
            events.words().each(function(e) {
                if (_this._events[e])
                    _this._events[e].sortBy('priority', true)
                         .each(function(x) { x.fn.call(_this, args); });
            });
        },

        set: function(property, value) {
            var _this = this;
            this._properties[property] = value;

            // The update event is called asynchonously to avoid it being
            // called multiple times during the same thread
            window.clearTimeout(this._timeouts[property]);
            this._timeouts[property] = window.setTimeout(function() {
                _this.trigger('_update_' + property, value);
            });
            
        },

        listen: function(property, callback, priority) {
            this.on('_update_' + property, callback, priority);
        },

        get: function(property) {
            return this._properties[property];
        }

    });

    M.Class.extend = function(props) {

        var parent = this;

        var NewClass = function() {
            this._events = {};
            this._properties = {};
            this._timeouts = {};
            if (props.init) props.init.apply(this, arguments);
        };

        NewClass.prototype = {};
        for (var i in parent.prototype) NewClass.prototype[i] = parent.prototype[i];  // jshint ignore:line
        for (i in props) if (i !== 'init') NewClass.prototype[i] = props[i];
        NewClass.extend = M.Class.extend;
        NewClass.prototype.constructor = NewClass;
        NewClass.parent = parent;

        return NewClass;
    };

})();

(function() {

    M.extendPrototype(String, {
        strip: function() {
            return this.replace(/^\s+/, '').replace(/\s+$/, '');
        },

        collapse: function() {
            return this.trim().replace(/\s+/g, ' ');
        },

        toTitleCase: function() {
            return this.replace(/\S+/g, function(a){
                return a.charAt(0).toUpperCase() + a.slice(1);
            });
        },

        words: function() {
            return this.strip().split(/\s+/);
        },

        endsWith: function(search) {
            var end = this.length;
            var start = end - search.length;
            return (this.substring(start, end) === search);
        },

        contains: function() {
            return String.prototype.indexOf.apply( this, arguments ) !== -1;
        }
    });

    // TODO mroe formatting options
    var templateFormats = {
        number: function(x) { return x; }
    };

    M.template = function(template, variables) {
        if (!variables) variables = {};
        return template.replace(/\{\{\s*([a-zA-Z]+)\s*(\|\s*([a-zA-Z]+)\s*)?\}\}/g,
            function(x, val, y, format) {
                console.log(val, format);
                var string = variables[val] || '';
                if (format && templateFormats[format]) string = templateFormats[format](string);
                return string;
            });
    };

})();

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

    M.concat = function(a, b) {
        if (arguments.length > 2) {
            args = M.toArray(arguments);
            var last = args.pop();
            return M.concat(M.concat(args), last);
        }

        var array = Array.prototype.slice.call(a, 0);
        for (var i=0, l = b.length; i<l; ++i) array.push(b[i]);

        return array;
    };

    M.cumulative = function(array) {
        var total = 0;
        return M.each(array, function(a) {
            total += a;
            return total;
        });
    };


    // ---------------------------------------------------------------------------------------------
    // Array Prototype

    M.extendPrototype(Array, {

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

        // Finds the minimum of all values in an array a
        min: function() {
            return Math.min.apply(Math, this);
        },

        // Finds the maximum of all values in an array a
        max: function() {
            return Math.max.apply(Math, this);
        },

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
        },

        sortBy: function(p, reverse) {
            return this.sort(function(a, b) { return reverse ? b[p] - a[p] : a[p] - b[p]; });
        }

    });

})();

(function() {

    var Deferred = M.Class.extend({

        then: function(callback) {
            if (this._isResolved) {
                callback(this._value);
            } else {
                this.on('resolve', callback);
            }
            return this;
        },

        catch: function(callback) {
            if (this._isRejected) {
                callback(this._value);
            } else {
                this.on('reject', callback);
            }
            return this;
        },

        complete: function(callback) {
            if (this._isResolved || this._isRejected) {
                callback(this._value);
            } else {
                this.on('reject resolve', callback);
            }
            return this;
        },

        resolve: function(value) {
            if (this._isResolved || this._isRejected) return;
            this._isResolved = true;
            this._value = value;
            this.trigger('resolve');
        },

        reject: function(value) {
            if (this._isResolved || this._isRejected) return;
            this._isRejected = true;
            this._value = value;
            this.trigger('reject');
        }

    });

    // =============================================================================================

    M.promise = {};

    M.promise.defer = function(fn) {
        var d = new Deferred();
        var resolve = function(x) { d.resolve(x); };
        var reject  = function(x) { d.reject(x); };
        fn(resolve, reject);
        return d;
    };

    M.promise.timeout = function(time) {
        var d = new Deferred();
        setTimeout(function() { d.resolve(time); }, time);
        return d;
    };

    M.promise.resolve = function(x) {
        var d = new Deferred();
        d.resolve(x);
        return d;
    };

    M.promise.reject = function(x) {
        var d = new Deferred();
        d.reject(x);
        return d;
    };

    M.promise.all = function() {
        var d = new Deferred();

        var total = arguments.length;
        var resolved = 0;
        var result = [];

        M.each(arguments, function(deferred, i) {
            deferred.then(function(value) {
                resolved += 1;
                result[i] = value;
                if (resolved === total) d.resolve(result);
            }).catch(function(value) {
                d.reject({ cause: i, message: value, results: result });
            });
        });

        return d;
    };

})();


})();