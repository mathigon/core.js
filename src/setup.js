// =================================================================================================
// Core.js | Setup
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


var M = { core: true };

var _arrayPush = Array.prototype.push;
var _arraySlice = Array.prototype.slice;
var _arrayShift = Array.prototype.shift;
var _arrayJoin = Array.prototype.join;

// Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = M;
    global.M = M;

// AMD module
} else if (typeof define === 'function' && define.amd) {
    define(M);

// Global variable
} else {
    window.M = M;
}


// =================================================================================================


M.noop = function() {};

M.trueop = function(){ return true; };

M.run = function(obj, args, _this) {
    if (obj instanceof Function) return obj.apply(_this || null, args);
    return obj;
};

// Checks if x is strictly equal to any one of the following arguments
M.isOneOf = function(x, values) {
    for (var i=1; i<arguments.length; ++i)
        if (x === arguments[i]) return true;
    return false;
};

// Wrapper for functions to cache their result based on arguments
M.cache = function(fn, _this) {
    var cache = {};
    return function() {
        var args = _arrayJoin.call(arguments, '--');
        if (!cache.hasOwnProperty(args)) cache[args] = fn.apply(_this, arguments);
        return cache[args];
    };
};
