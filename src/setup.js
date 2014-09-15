// =================================================================================================
// Tesla.js | Setup
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


var M = { core: true };

// Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = M;

// AMD module
} else if (typeof define === 'function' && define.amd) {
    define(M);

// Global variable
} else {
    window.M = M;
}


// =================================================================================================


M.noop = function() {};

M.run = function(obj, args, _this) {
    if (obj instanceof Function) {
        return obj.apply(_this || null, args);
    } else {
        return obj;
    }
};

// Checks if x is strictly equal to any one of the following arguments
M.isOneOf = function(x, values) {
    for (var i=1; i<arguments.length; ++i)
        if (x === arguments[i]) return true;
    return false;
};
