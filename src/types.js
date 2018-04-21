// =============================================================================
// Core.js | Types
// (c) Mathigon
// =============================================================================



const typeRegexp = /\s([a-zA-Z]+)/;

/**
 * Returns the type of an object. Possible values are 'number', 'string',
 * 'boolean', 'array', 'object', 'date', 'function', 'NaN', 'null', 'undefined',
 * as well as class names like 'htmldocument'.
 * @param {*} obj
 * @returns {string}
 */
export function typeOf(obj) {
  if (obj == null) return '' + obj;
  if (Number.isNaN(obj)) return 'NaN';

  return toString.call(obj).match(typeRegexp)[1].toLowerCase();
}

/**
 * Checks if an object has a specific type.
 * @param {*} x
 * @param {string} type
 * @returns {boolean}
 */
export function isType(x, type) {
  return typeOf(x) === type;
}

/*
 * Checks if an object is a string.
 * @param {*} x
 * @returns {boolean}
 */
export function isString(x) {
  return (x instanceof String) || (typeof x === 'string');
}

/*
 * Checks if an object is a number.
 * @param {*} x
 * @returns {boolean}
 */
export function isNumber(x) {
  return (x instanceof Number) || (typeof x === 'number');
}

/*
 * Checks if an object is an integer.
 * @param {*} x
 * @returns {boolean}
 */
export function isInteger(x) {
  return x % 1 === 0;
}

/*
 * Checks if an object is an array.
 * @param {*} x
 * @returns {boolean}
 */
export function isArray(x) {
  return Array.isArray(x);
}

/*
 * Checks if an object is a date.
 * @param {*} x
 * @returns {boolean}
 */
export function isDate(x) {
  return Object.prototype.toString.call(x) === '[object Date]';
}

/*
 * Checks if an object is a boolean.
 * @param {*} x
 * @returns {boolean}
 */
export function isBoolean(x) {
  return (x instanceof Boolean) || (typeof x === 'boolean');
}

/*
 * Checks if an object is an object.
 * @param {*} x
 * @returns {boolean}
 */
export function isObject(x) {
  return x === Object(x);
}
