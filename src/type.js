// =================================================================================================
// Tesla.js | Types
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    M.typeof = function(obj) {

        // Matches null and undefined
        if (obj == null) return '' + obj;

        // Falsy Types
        if (isNaN(obj)) return 'nan';

        // Types and Special Objects
        var match = toString.call(obj).match( /^\[object\s(.*)\]$/ );
        var type = match && match[1] || '';
        if (M.isOneOf(type, ['Number', 'String', 'Boolean', 'Array', 'Date', 'RegExp', 'Function']))
            return type.toLowerCase();

        // General Objects
        if (typeof obj === 'object') return 'object';
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
