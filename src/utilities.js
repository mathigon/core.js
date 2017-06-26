// =============================================================================
// Core.js | Utilities
// (c) Mathigon
// =============================================================================



export function noop() {}

export function uid(n = 10) {
  return Math.random().toString(36).substr(2, n);
}

export function run(obj, args = [], _this = null) {
  if (obj instanceof Function) {
    return obj.apply(_this, args);
  }
  return obj;
}

// Checks if x is strictly equal to any one of the following arguments
export function isOneOf(x, ...values) {
  for (let v of values) {
    if (x === v) return true;
  }
  return false;
}

// Merges multiple objects into a single one
export function extend(first, ...others) {
  for (let obj of others) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) first[key] = obj[key];
    }
  }
  return first;
}

export function deepExtend(obj1, obj2) {
  for (let i of Object.keys(obj2)) {
    if (i in obj1 && Array.isArray(obj1[i]) && Array.isArray(obj2[i])) {
      obj1[i] = obj1[i].concat(obj2[i]);
    } else if (i in obj1 && obj1[i] instanceof Object &&
                            obj2[i] instanceof Object) {
      deepExtend(obj1[i], obj2[i]);
    } else {
      obj1[i] = obj2[i];
    }
  }
}

export function clamp(x, min = -Infinity, max = Infinity) {
  return Math.min(max, Math.max(min, x));
}

export function isBetween(x, a, b) {
  return x >= a && x <= b;
}

export function timer(fn) {
  window.performance.clearMarks();
  window.performance.clearMeasures();

  window.performance.mark('start');
  let result = fn();
  window.performance.mark('end');

  window.performance.measure('time', 'start', 'end');
  let time =  window.performance.getEntriesByName('time')[0].duration;

  return { result, time };
}

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

export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}

export function delay(fn, t = 0) {
  if (t) { setTimeout(fn, t); } else { fn(); }
}


// -----------------------------------------------------------------------------
// Promises

export function defer() {
  let resolve, reject;

  let promise = new Promise(function(_resolve, _reject) {
    resolve = _resolve;
    reject = _reject;
  });

  // This prevents exceptions when promises without .catch are rejected:
  promise.catch(function(error) { return error; });

  return { promise, resolve, reject };
}


// -----------------------------------------------------------------------------
// Object/Array Iterating

export function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function each(collection, fn) {
  let newCollection = Array.isArray(collection) ? [] : {};
  let keys = Object.keys(collection);
  for (let k of keys) {
    newCollection[k] = fn(collection[k], k);
  }
  return newCollection;
}

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


// -----------------------------------------------------------------------------
// Function Wrappers

// Wrapper for functions to cache their result based on arguments
export function cache(fn) {
  let cached = new Map();
  return function(...args) {
    let argString = args.join('--');
    if (!cached.has(argString)) cached.set(argString, fn(...args));
    return cached.get(argString);
  };
}

// Wrapper that prevents a function `fn` from being triggered more than once
// every `t` ms.
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


// -----------------------------------------------------------------------------
// Copying

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

export function deepCopy(obj) {
  DEEP_COPY_STORE = new WeakMap();
  let copy = deepCopyHelper(obj);
  DEEP_COPY_STORE = null;
  return copy;
}
