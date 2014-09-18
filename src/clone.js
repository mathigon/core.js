// =================================================================================================
// Tesla.js | Clone, Copy and Equals
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    // ---------------------------------------------------------------------------------------------
    // Copy

    M.shallowCopy = function(obj) {
        /*jshint -W053 */

        // Handle (simple) strings, numbers, booleans, null and undefined
        var type = typeof obj;
        if (obj == null || M.isOneOf(type, 'number', 'string', 'boolean')) return obj;

        // Hande other type objects
        if (obj instanceof Number)  return new Number(obj.valueOf());
        if (obj instanceof String)  return new String(obj.valueOf());
        if (obj instanceof Boolean) return new Boolean(obj.valueOf());
        if (obj instanceof Date)    return new Date(obj.valueOf());
        if (obj instanceof RegExp)  return new RegExp(obj);

        // Handle Arrays and Objects
        return M.each(obj, function(val) { return val; });
    };

    // ---------------------------------------------------------------------------------------------

    var deepCopyStore = [];

    function deepCopyStoreLookup(obj) {
        for (var i=0; i<deepCopyStore.length; ++i)
            if (deepCopyStore[i][0] === obj) return deepCopyStore[i][1];
        return null;
    }

    function deepCopyHelper(obj) {
        /*jshint -W053 */

        // Handle (simple) strings, numbers, booleans, null and undefined
        var type = typeof obj;
        if (obj == null || M.isOneOf(type, 'number', 'string', 'boolean')) return obj;

        // Hande other type objects
        if (obj instanceof Number)  return new Number(obj.valueOf());
        if (obj instanceof String)  return new String(obj.valueOf());
        if (obj instanceof Boolean) return new Boolean(obj.valueOf());
        if (obj instanceof Date)    return new Date(obj.valueOf());
        if (obj instanceof RegExp)  return new RegExp(obj);

        // Avoids Recursive Loops
        var x = deepCopyStoreLookup(obj);
        if (x) return x;

        var copy = obj;

        // Handle Arrays
        if (M.isArray(obj)) {
            copy = [];
            deepCopyStore.push([obj, copy]);
            for (var i = 0, l = obj.length; i < l; ++i) copy[i] = deepCopyHelper(obj[i]);

        // Handle Objects
        } else if (obj instanceof Object) {
            copy = {};
            deepCopyStore.push([obj, copy]);
            for (var attr in obj) if (M.has(obj, attr)) copy[attr] = deepCopyHelper(obj[attr]);
        }

        return copy;
    }

    M.deepCopy = function(obj) {
        deepCopyStore = [];
        var copy = deepCopyHelper(obj);
        deepCopyStore = [];
        return copy;
    };


    // ---------------------------------------------------------------------------------------------
    // Equals

    M.shallowEquals = function(obj1, obj2) {
        // TODO
    };

    // ---------------------------------------------------------------------------------------------

    M.deepEquals = function(obj1, obj2) {
        // TODO
    };

})();
