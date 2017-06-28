// =============================================================================
// Core.js | Arrays
// (c) Mathigon
// =============================================================================



import { run } from './utilities';


function _tabulateWith(fn, vals, args) {
  if (!args.length) return run(fn, ...vals);

  let newArgs = args.slice(0);
  let x = newArgs.shift();

  let result = [];
  for (let i=0; i<x; ++i) {
    result.push(_tabulateWith(fn, vals.concat([i]), newArgs));
  }
  return result;
}

/**
 * Creates a multi-dimensional array contains fn(i1, i2, ..., in) in cell
 * [i1][i2]...[in]. If the first argument is not a function, every item in the
 * resulting array will have that static value.
 *
 * @param {Function|*} fn
 * @param {...number} dimensions
 * @returns {Array}
 */
export function tabulate(fn, ...dimensions) {
  return _tabulateWith(fn, [], dimensions);
}


/**
 * @param {number} a
 * @param {?number} b
 * @param {?number} step
 * @returns {Array}
 */
export function list(a, b, step = 1) {
  let arr = [];

  if (b == null && a >= 0) {
    for (let i=0; i<a; i += step) arr.push(i);
  } else if (b == null) {
    for (let i=0; i>a; i -= step) arr.push(i);
  } else if (a <= b) {
    for (let i=a; i<=b; i += step) arr.push(i);
  } else {
    for (let i=a; i>=b; i -= step) arr.push(i);
  }

  return arr;
}


/**
 * Returns the last item in an array.
 * @param {Array} array
 * @returns {*}
 */
export function last(array) {
  return array[array.length - 1];
}


/**
 * Maps a function over multiple arrays, the entries of which are passed as
 * multiple arguments.
 * @param {Function} fn
 * @param {...Array} args
 * @returns {Array}
 */
export function map(fn, ...args) {
  let length = Math.max(...args.map(a => a.length));
  return tabulate(i => fn(...args.map(a => a[i])), length);
}


/**
 * Finds the sum of all elements in an numeric array. This operation is safe,
 * i.e. any values that can't be cast to a number are counted as 0.
 * @param {Array} array
 * @returns {number}
 */
export function total(array) {
  if (!array.length) return 0;
  return +array.reduce((t, v) => t + (+v || 0));
}


/**
 * Evaluates the average of all the elements in an array.
 * @param {Array} array
 * @returns {number}
 */
export function average(array) {
  return array.total / array.length;
}


/**
 * Checks if an array contains a specific value.
 * @param {Array} array
 * @param {*} value
 * @returns {boolean}
 */
export function contains(array, value) {
  return array.indexOf(value) >= 0;
}


/**
 *
 * @param array
 * @param id
 */
export function extract(array, id) {
  return array.map(a => a[id]);
}


/**
 *
 * @param keys
 * @param values
 * @returns {{}}
 */
export function zip(keys, values) {
  let obj = {};
  for (let i=0; i < keys.length; ++i)
    obj[keys[i]] = values[i];
  return obj;
}


/**
 *
 * @param {Array} array
 * @param {string} id
 * @param {?boolean} reverse
 * @returns {Array}
 */
export function sortBy(array, id, reverse = false) {
  return array.slice(0).sort((a, b) => {
    return a[id] < b[id] ? (reverse ? 1 : -1) :
      a[id] > b[id] ? (reverse ? -1 : 1) : 0;
  });
}


/**
 *
 * @param {Array} array
 * @param {Function} fn
 * @param {?boolean} reverse
 * @returns {Array}
 */
export function sortByFn(array, fn, reverse = false) {
  return array.slice(0).sort((a, b) => {
    let x = fn(a);
    let y = fn(b);
    return x < y ? (reverse ? 1 : -1) : x > y ? (reverse ? -1 : 1) : 0;
  });
}


/**
 * Returns a function that can be called repeatedly, and returns items of the
 * array, continuously looping
 * @param {Array} array
 * @returns {Function}
 */
export function loop(array) {
  let i = -1;
  return function() { i = (i + 1) % array.length; return array[i]; };
}


/**
 *
 * @param array
 * @returns {Function}
 */
export function unique(array) {
  return array.filter((a, i, _this) => _this.indexOf(a) == i);
  // return [...new Set([this])];
}


/**
 * Removes any null or undefined values in array a.
 * @param {Array} array
 * @return {Array}
 */
export function clean(array) {
  return array.filter(a => a != null);
}


/**
 * Removes all occurrences of x from an array.
 * @param {Array} array
 * @param {*} x
 * @return {Array}
 */
export function without(array, x) {
  return array.filter(a => a !== x);
}


/**
 *
 * @param array
 */
export function flatten(array) {
  return array.reduce((a, b) =>
    a.concat(Array.isArray(b) ? flatten(b) : b), []);
}


/**
 *
 * @param array
 */
export function cumulative(array) {
  let total = 0;
  return array.map(a => total += a);
}


/**
 * Breaks an array into chunks of size at most n.
 * @param array
 * @param n
 * @returns {Array}
 */
export function chunk(array, n) {
  let chunks = [];
  for (let i = 0; i < array.length; i += n) {
    chunks.push(array.slice(i, i + n));
  }
  return chunks;
}


/**
 * Rotates the elements of an array by offset.
 * @param array
 * @param offset
 */
export function rotate(array, offset) {
  let n = array.length;
  offset = ((offset % n) + n) % n; // offset could initially be negative...

  let start = array.slice(0, offset);
  let end = array.slice(offset);
  return end.concat(start);
}


/**
 *
 * @param a1
 * @param a2
 * @returns {Array}
 */
export function intersect(a1, a2) {
  let result = [];
  for (let i = 0; i < a1.length; ++i) {
    if (a2.indexOf(a1[i]) === -1) result.push(a1[i]);
  }
  return result;
}


/**
 *
 * @param a1
 * @param a2
 * @returns {[*,*]}
 */
export function difference(a1, a2) {
  let notIn1 = a2.filter(a => !a1.includes(a));
  let notIn2 = a1.filter(a => !a2.includes(a));
  return [...notIn1, ...notIn2];
}
