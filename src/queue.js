// =================================================================================================
// Core.js | Queues
// (c) 2015 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    M.Queue = function() {
        this._toResolve = 0;
        this._flushing = false;
        this._stack = [];
    };

    M.Queue.prototype.require = function(fn) {
        var _this = this;
        this._toResolve += 1;
        fn.call(this, function() {
            _this._toResolve -= 1;
            if (_this._toResolve <= 0) _this.flush();
        });
    };

    M.Queue.prototype.unrequire = function(fn) {
        // TODO
    };

    M.Queue.prototype.timeout = function(t) {
        this.require(function(resolve) {
            setTimeout(function() { resolve(); }, t);
        });
    };

    M.Queue.prototype.untimeout = function(fn) {
        // TODO
    };

    M.Queue.prototype.flush = function() {
        if (this._flushing) return;
        this._flushing = true;
        for (var i=0; i<this._stack.length; ++i) this._stack[i]();
        this._stack = [];
        this._flushing = false;
    };

    M.Queue.prototype.wait = function(fn) {
        if (this._flushing || this._toResolve <= 0) {
            fn();
        } else {
            this._stack.push(fn);
        }
    };

    M.Queue.prototype.unwait = function(fn) {
        // TODO
    };

    M.Queue.prototype.clear = function() {
        // TODO
    };

})();
