// =================================================================================================
// Core.js | Promises
// (c) 2015 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    var Deferred = M.Class.extend({

        then: function(callback) {
            if (this._isResolved) {
                callback(this._value);
            } else {
                this.on('resolve', callback);
            }
            return this;
        },

        catch: function(callback) {
            if (this._isRejected) {
                callback(this._value);
            } else {
                this.on('reject', callback);
            }
            return this;
        },

        complete: function(callback) {
            if (this._isResolved || this._isRejected) {
                callback(this._value);
            } else {
                this.on('reject resolve', callback);
            }
            return this;
        },

        resolve: function(value) {
            if (this._isResolved || this._isRejected) return;
            this._isResolved = true;
            this._value = value;
            this.trigger('resolve');
        },

        reject: function(value) {
            if (this._isResolved || this._isRejected) return;
            this._isRejected = true;
            this._value = value;
            this.trigger('reject');
        }

    });

    // =============================================================================================

    M.promise = {};

    M.promise.defer = function(fn) {
        var d = new Deferred();
        var resolve = function(x) { d.resolve(x); };
        var reject  = function(x) { d.reject(x); };
        fn(resolve, reject);
        return d;
    };

    M.promise.timeout = function(time) {
        var d = new Deferred();
        setTimeout(function() { d.resolve(time); }, time);
        return d;
    };

    M.promise.resolve = function(x) {
        var d = new Deferred();
        d.resolve(x);
        return d;
    };

    M.promise.reject = function(x) {
        var d = new Deferred();
        d.reject(x);
        return d;
    };

    M.promise.all = function() {
        var d = new Deferred();

        var total = arguments.length;
        var resolved = 0;
        var result = [];

        M.each(arguments, function(deferred, i) {
            deferred.then(function(value) {
                resolved += 1;
                result[i] = value;
                if (resolved === total) d.resolve(result);
            }).catch(function(value) {
                d.reject({ cause: i, message: value, results: result });
            });
        });

        return d;
    };

})();
