// =================================================================================================
// Core.js | Classes
// (c) 2015 Mathigon / Philipp Legner
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

        on: function(events, fn, priority) {
            var _this = this;
            events.words().each(function(e) {
                if (!_this._events[e]) _this._events[e] = [];
                _this._events[e].push({ fn: fn, priority: priority || 0 });
            });
        },

        off: function(events, fn) {
            var _this = this;
            events.words().each(function(e) {
                if (_this._events[e])
                    _this._events[e] = _this._events[e].filter(function(x) { return x.fn !== fn; });
            });
        },

        trigger: function(events, args) {
            var _this = this;
            events.words().each(function(e) {
                if (_this._events[e])
                    _this._events[e].sortBy('priority')
                         .each(function(x) { x.fn.call(_this, args); });
            });
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

        listen: function(property, callback, priority) {
            this.on('_update_' + property, callback, priority);
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
