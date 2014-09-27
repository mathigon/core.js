// =================================================================================================
// Core.js | Types
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


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
