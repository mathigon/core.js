// =============================================================================
// Core.js | Types
// (c) 2015 Mathigon
// =============================================================================



// -----------------------------------------------------------------------------
// Types

var typeCache = new Map();
var typeRegexp = /\s([a-zA-Z]+)/;

function typeOf(obj) {
    if (typeCache.has(obj)) return typeCache.get(obj);

    if (obj == null) return '' + obj;
    if (Number.isNaN(obj)) return 'NaN';

    var type = toString.call(obj).match(typeRegexp)[1].toLowerCase());
    typeCache.set(obj, type);
    return type;
}

function isType(x, type) {
    return typeOf(x) === type;
}

function isString(x) {
    return (x instanceof String) || (typeof x === 'string');
}

function isNumber(x) {
    return (x instanceof Number) || (typeof x === 'number');
}

function isInteger(x) {
    return x % 1 === 0;
}

function isDate(x) {
    return Object.prototype.toString.call(x) === '[object Date]';
}

function isBoolean(x) {
    return (x instanceof Boolean) || (typeof x === 'boolean');
}

function isObject(x) {
    return x === Object(x);
}

// -----------------------------------------------------------------------------

export default {
    typeOf, isType, isString, isNumber, isInteger, isDate, isBoolean, isObject
};

