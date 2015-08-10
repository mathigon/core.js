// =============================================================================
// Core.js | Utilities
// (c) 2015 Mathigon
// =============================================================================



// -----------------------------------------------------------------------------
// Utility Functions

function uid() {
    return Math.random().toString(36).substr(2,10);
}

function run(obj, args = [], _this = null) {
    if (obj instanceof Function) {
        return obj.apply(_this, args);
    }
    return obj;
}

// Checks if x is strictly equal to any one of the following arguments
function isOneOf(x, ...values) {
    for (let v of values) {
        if (x === v) return true;
    }
    return false;
}

// Merges multiple objects into a single one
function extend(first, ...others) {
    for (let obj of others) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) first[key] = src[key];
        }
    }
    return first;
}

function clamp(x, min = -Infinity, max = Infinity) {
    return Math.min(max, Math.max(min, x));
}

function isBetween(x, a, b) {
    return x >= a && x <= b;
}

function performance(fn, n = 100) {    
    window.performance.clearMarks();
    window.performance.clearMeasures();

    window.performance.mark('start');
    for (let i=0; i<n; ++i) fn();
    window.performance.mark('end');

    window.performance.measure('time', 'start', 'end');
    let t = window.performance.getEntriesByName('time')[0].duration;
    return t/n;
}


// ---------------------------------------------------------------------------------------------
// Promises

function defer() {
    let resolve, reject;

    let promise = new Promise(function(_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
    });

    // This prevents eceptions when promises without .catch are rejected:
    promise.catch(function(error) { return error; });

    return { promise, resolve, reject };
}


// ---------------------------------------------------------------------------------------------
// Object/Array Iterating

function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function each(collection, fn) {
    let newCollection = Array.isArray(collection) ? [] : {};
    let keys = Object.keys(collection);
    for (let k of keys) {
        newCollection[k] = fn(collection[k], k);
    }
    return newCollection;
}

function some(collection, fn) {
    let keys = Object.keys(collection);
    for (let k of keys) {
        let x = fn(collection[k], k);
        if (x != null) return x;
    }
}


// -----------------------------------------------------------------------------
// Function Wrappers

// Wrapper for functions to cache their result based on arguments
function cache(fn) {
    let cached = new Map();
    return function(...args) {
        let argString = args.join('--');
        if (!cached.has(argString)) cached.set(argString, fn(...args));
        return cached.get(argString);
    };
}

// Wrapper that prevents a function `fn` from being triggered more than every `t` ms.
function throttle(fn, t) {
    let delay = false;
    let repeat = false;
    return function(...args) {
        if (delay) {
            repeat = true;
        } else {
            fn.apply(null, args);
            delay = true;
            setTimeout(function() {
                if (repeat) fn(...args);
                delay = false;
                repeat = false;
            }, t);
        }
    };
}


// -----------------------------------------------------------------------------
// Copying

function shallowCopy(obj) {
    // Handle (simple) strings, numbers, booleans, null and undefined
    var type = typeof obj;
    if (obj == null || isOneOf(type, 'number', 'string', 'boolean')) return obj;

    // Hande other type objects
    /* jshint ignore:start */
    if (obj instanceof Number)  return new Number(obj.valueOf());
    if (obj instanceof String)  return new String(obj.valueOf());
    if (obj instanceof Boolean) return new Boolean(obj.valueOf());
    if (obj instanceof Date)    return new Date(obj.valueOf());
    if (obj instanceof RegExp)  return new RegExp(obj);
    /* jshint ignore:end */

    // Handle Arrays and Objects
    return each(obj, x => x);
}

let deepCopyStore = new WeakMap();

function deepCopyHelper(obj) {

    // Handle (simple) strings, numbers, booleans, null and undefined
    var type = typeof obj;
    if (obj == null || isOneOf(type, 'number', 'string', 'boolean')) return obj;

    // Hande other type objects
    /* jshint ignore:start */
    if (obj instanceof Number)  return new Number(obj.valueOf());
    if (obj instanceof String)  return new String(obj.valueOf());
    if (obj instanceof Boolean) return new Boolean(obj.valueOf());
    if (obj instanceof Date)    return new Date(obj.valueOf());
    if (obj instanceof RegExp)  return new RegExp(obj);
    /* jshint ignore:end */

    // Fallback
    if (!(obj instanceof Object)) return obj;

    // Avoids Recursive Loops
    if (deepCopyStore.has(obj)) return deepCopyStore.get(obj);

    // Handle Arrays and Objects
    let copy = isArray(obj) ? [] : {};
    deepCopyStore.set(obj, copy);

    let keys = Object.keys(obj);
    for (let k of keys) copy[k] = deepCopyHelper(obj[k]);

    return copy;
}

function deepCopy(obj) {
    deepCopyStore = [];
    let copy = deepCopyHelper(obj);
    deepCopyStore = [];
    return copy;
}


// -----------------------------------------------------------------------------
// Equality Checking

function shallowEquals(obj1, obj2) {
    // TODO
}

function deepEquals(obj1, obj2) {
    // TODO
}


// -----------------------------------------------------------------------------
// Object Watching
// https://gist.github.com/eligrey/384583

function watch(obj, prop, handler) {
    let value = obj[prop];

    let getter = function () { return value; };
    let setter = function (newVal) {
        var oldVal = value;
        value = newVal;
        return handler.call(this, newVal, oldVal);
    };

    // TODO can't watch constants

    Object.defineProperty(obj, prop, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

function unwatch(obj, prop) {
    var val = obj[prop];
    delete obj[prop];
    obj[prop] = val;
}

// -----------------------------------------------------------------------------

export default {
    uid, run, isOneOf, extend, clamp, isBetween, performance, defer,
    has, each, some, cache, throttle,
    shallowCopy, deepCopy, shallowEquals, deepEquals,
    watch, unwatch };

