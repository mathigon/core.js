// =================================================================================================
// Core.js | Classes
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    M.inherit = function(ChildClass, ParentClass) {
        ChildClass.prototype = new ParentClass;  // jshint ignore:line
        ChildClass.prototype.constructor = this;
    };

    M.Class = function() {
        this._events = {};
        this._properties = {};
        this._timeouts = {};
    };

    M.extend(M.Class.prototype, {

        on: function(event, fn) {
            if (this._events[event]) {
                if (!this._events[event].has(fn)) this._events[event].push(fn);
            } else {
                this._events[event] = [fn];
            }
        },

        off: function(event, fn) {
            if (!this._events[event]) return;
            var index = this._events[event].indexOf(fn);
            if (index >= 0) this._events.splice(index, 1);
        },

        trigger: function(event, args) {
            if (!this._events[event]) return;
            var _this = this;
            M.each(this._events[event], function(fn) { fn.call(_this, args); });
        },

        set: function(property, value) {
            var _this = this;
            this._properties[property] = value;

            // The update event is called asynchonously to avoid it being
            // called multiple times during the same thread
            window.clearTimeout(this._timeouts[property]);
            this._timeouts[property] = window.setTimeout(function() {
                _this.trigger('_update_' + property, value);
            });
            
        },

        listen: function(property, callback) {
            this.on('_update_' + property, callback);
        },

        get: function(property) {
            return this._properties[property];
        }

    });

    M.Class.extend = function(props) {

        var parent = this;

        var NewClass = function() {
            this._events = {};
            this._properties = {};
            this._timeouts = {};
            if (props.init) props.init.apply(this, arguments);
        };

        NewClass.prototype = {};
        for (var i in parent.prototype) NewClass.prototype[i] = parent.prototype[i];  // jshint ignore:line
        for (i in props) if (i !== 'init') NewClass.prototype[i] = props[i];
        NewClass.extend = M.Class.extend;
        NewClass.prototype.constructor = NewClass;
        NewClass.parent = parent;

        return NewClass;
    };

})();
