// =============================================================================
// Core.js | Types
// (c) 2015 Mathigon
// =============================================================================



const typeRegexp = /\s([a-zA-Z]+)/;

export function typeOf(obj) {
    if (obj == null) return '' + obj;
    if (Number.isNaN(obj)) return 'NaN';

    return toString.call(obj).match(typeRegexp)[1].toLowerCase();
}

export function isType(x, type) {
    return typeOf(x) === type;
}

export function isString(x) {
    return (x instanceof String) || (typeof x === 'string');
}

export function isNumber(x) {
    return (x instanceof Number) || (typeof x === 'number');
}

export function isInteger(x) {
    return x % 1 === 0;
}

export function isDate(x) {
    return Object.prototype.toString.call(x) === '[object Date]';
}

export function isBoolean(x) {
    return (x instanceof Boolean) || (typeof x === 'boolean');
}

export function isObject(x) {
    return x === Object(x);
}
