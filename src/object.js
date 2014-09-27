// =================================================================================================
// Core.js | Object Functions
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


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
            oldVal = value;
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
