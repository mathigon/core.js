// =============================================================================
// Core.js | Utilities
// (c) Mathigon
// =============================================================================



/**
 * Empty Function.
 */
export function noop() {}


/**
 * Creates a random UID string of a given length.
 * @param {?number} n
 * @returns {string}
 */
export function uid(n = 10) {
  return Math.random().toString(36).substr(2, n);
}


/**
 * If obj is a function, it evaluates it with a given set of attributes.
 * Otherwise it just returns obj directly.
 * @param {Function|*} obj
 * @param {...*} args
 * @returns {*}
 */
export function run(obj, ...args) {
  if (obj instanceof Function) return obj(...args);
  return obj;
}


/**
 * Checks if x is strictly equal to any one of the following arguments
 * @param {*} x
 * @param {...*} values
 * @returns {boolean}
 */
export function isOneOf(x, ...values) {
  for (let v of values) {
    if (x === v) return true;
  }
  return false;
}


/**
 * Merges multiple objects into the first one.
 * @param {Object} first
 * @param {...Object} others
 */
export function extend(first, ...others) {
  for (let obj of others) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) first[key] = obj[key];
    }
  }
}


/**
 * Linear interpolation
 * @param {number} a
 * @param {number} b
 * @param {number=} t
 * @returns {number}
 */
export function lerp(a, b, t=0.5) {
  return a + (b - a) * t;
}


/**
 * Applies default keys to an object.
 * @param {Object} obj
 * @param {Object} defaults
 * @returns {Object}
 */
export function applyDefaults(obj, defaults) {
  for (let key of Object.keys(defaults)) {
    if (!obj.hasOwnProperty(key)) obj[key] = defaults[key];
  }
  return obj;
}


/**
 * Deep extends obj1 with obj2. You can provide a custom array merge function.
 * @param {Object} obj1
 * @param {Object} obj2
 * @param {Function=} arrayMergeFn
 */
export function deepExtend(obj1, obj2, arrayMergeFn=((a, b) => a.concat(b))) {
  for (let i of Object.keys(obj2)) {
    if (i in obj1 && Array.isArray(obj1[i]) && Array.isArray(obj2[i])) {
      obj1[i] = arrayMergeFn(obj1[i], obj2[i]);
    } else if (i in obj1 && obj1[i] instanceof Object &&
                            obj2[i] instanceof Object) {
      deepExtend(obj1[i], obj2[i]);
    } else {
      obj1[i] = obj2[i];
    }
  }
}


/**
 * Bounds a number between a lower and an upper limit.
 * @param {number} x
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(x, min = -Infinity, max = Infinity) {
  return Math.min(max, Math.max(min, x));
}


/**
 * Checks the average speed of a function by running it n times.
 * @param {Function} fn
 * @param {?number} n
 * @returns {number}
 */
export function performance(fn, n = 100) {
  window.performance.clearMarks();
  window.performance.clearMeasures();

  window.performance.mark('start');
  for (let i=0; i<n; ++i) fn();
  window.performance.mark('end');

  window.performance.measure('time', 'start', 'end');
  let t = window.performance.getEntriesByName('time')[0].duration;
  return t/n;
}


/**
 * Squares a number.
 * @param {number} x
 * @returns {number}
 */
export function square(x) {
  return x * x;
}


/**
 * Cubes a number.
 * @param {number} x
 * @returns {number}
 */
export function cube(x) {
  return x * x * x;
}


/**
 * Replacement for setTimeout() that is synchronous for time 0.
 * @param {Function} fn
 * @param {?number} t
 * @returns {?number}
 */
export function delay(fn, t = 0) {
  if (t) { return setTimeout(fn, t); } else { fn(); }
}


/**
 * Returns a promise that resolves after a fixed time.
 * @param {number} t
 * @returns {Promise}
 */
export function wait(t) {
  return new Promise(resolve => setTimeout(resolve, t));
}


/**
 * Creates a new promise together with functions to resolve or reject.
 * @returns {{promise: Promise, resolve: Function, reject: Function}}
 */
export function defer() {
  let resolve, reject;

  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  // This prevents exceptions when promises without .catch are rejected:
  promise.catch(function(error) { return error; });

  return { promise, resolve, reject };
}


/**
 * Checks if an object contains a property.
 * @param {Object} obj
 * @param {number} key
 * @returns {boolean}
 */
export function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}


/**
 * @param {Object} collection
 * @param {Function} fn
 * @returns {Object}
 */
export function each(collection, fn) {
  let newCollection = Array.isArray(collection) ? [] : {};
  let keys = Object.keys(collection);
  for (let k of keys) {
    newCollection[k] = fn(collection[k], k);
  }
  return newCollection;
}


/**
 * @param {Object} collection
 * @param {Function} fn
 * @returns {*}
 */
export function some(collection, fn) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; ++i) {
      let x = fn(collection[i], i);
      if (x != null) return x;
    }
  } else {
    for (let k of Object.keys(collection)) {
      let x = fn(collection[k], k);
      if (x != null) return x;
    }
  }
}


/**
 * Function wrapper that modifies a function to cache its return values. This
 * is useful for performance intensive functions which are called repeatedly
 * with the same arguments. However it can reduce performance for functions
 * which are always called with different arguments. Note that argument
 * comparison doesn't not work with Objects or nested arrays.

 * @param {Function} fn
 * @returns {Function}
 */
export function cache(fn) {
  let cached = new Map();
  return function(...args) {
    let argString = args.join('--');
    if (!cached.has(argString)) cached.set(argString, fn(...args));
    return cached.get(argString);
  };
}


/**
 * Function wrapper that prevents a function from being executed more than once
 * every t ms. This is particularly useful for optimising callbacks for
 * continues events like scroll, resize or slider move.
 *
 * @param {Function} fn
 * @param {?number} t
 * @returns {Function}
 */
export function throttle(fn, t = 0) {
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


/**
 * Shallow copies any JavaScript object.
 * @param {*} obj
 * @returns {*}
 */
export function shallowCopy(obj) {
  // Handle (simple) strings, numbers, booleans, null and undefined
  let type = typeof obj;
  if (obj == null || isOneOf(type, 'number', 'string', 'boolean')) return obj;

  // Handle other type objects
  if (obj instanceof Number)  return +obj;
  if (obj instanceof String)  return '' + obj;
  if (obj instanceof Boolean) return !!obj;
  if (obj instanceof Date)    return new Date(obj.valueOf());
  if (obj instanceof RegExp)  return new RegExp(obj);

  // Handle Arrays and Objects
  return each(obj, x => x);
}


let DEEP_COPY_STORE = null;

function deepCopyHelper(obj) {
  // Handle (simple) strings, numbers, booleans, null and undefined
  let type = typeof obj;
  if (obj == null || isOneOf(type, 'number', 'string', 'boolean')) return obj;

  // Handle other type objects
  if (obj instanceof Number)  return +obj;
  if (obj instanceof String)  return '' + obj;
  if (obj instanceof Boolean) return !!obj;
  if (obj instanceof Date)    return new Date(obj.valueOf());
  if (obj instanceof RegExp)  return new RegExp(obj);

  // Fallback
  if (!(obj instanceof Object)) return obj;

  // Avoids Recursive Loops
  if (DEEP_COPY_STORE.has(obj)) return DEEP_COPY_STORE.get(obj);

  // Handle Arrays and Objects
  let copy = Array.isArray(obj) ? [] : {};
  DEEP_COPY_STORE.set(obj, copy);

  let keys = Object.keys(obj);
  for (let k of keys) copy[k] = deepCopyHelper(obj[k]);

  return copy;
}

/**
 * Deep copies any JavaScript object.
 * @param {*} obj
 * @returns {*}
 */
export function deepCopy(obj) {
  DEEP_COPY_STORE = new WeakMap();
  let copy = deepCopyHelper(obj);
  DEEP_COPY_STORE = null;
  return copy;
}
