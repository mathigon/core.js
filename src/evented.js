// =============================================================================
// Core.js | Evented
// (c) 2015 Mathigon
// =============================================================================



export default class Evented {

	constructor() {
        this._events = {};
        this._properties = {};
        this._timeouts = {};
	}

	on(events, fn, priority) {
        let _this = this;
        events.words().each(function(e) {
            if (!_this._events[e]) _this._events[e] = [];
            _this._events[e].push({ fn: fn, priority: priority || 0 });
        });
    }

    off(events, fn) {
        let _this = this;
        events.words().each(function(e) {
            if (_this._events[e])
                _this._events[e] = _this._events[e].filter(function(x) { return x.fn !== fn; });
        });
    }

    trigger(events, ...args) {
        let _this = this;
        events.words().each(function(e) {
            if (_this._events[e])
                _this._events[e].sortBy('priority', true)
                     .forEach(function(x) { x.fn.call(_this, args); });
        });
    }

    set(property, value) {
        var _this = this;
        this._properties[property] = value;

        // The update event is called asynchonously to avoid it being
        // called multiple times during the same thread
        window.clearTimeout(this._timeouts[property]);
        this._timeouts[property] = window.setTimeout(function() {
            _this.trigger('_update_' + property, value);
        });
        
    }

    listen(property, callback, priority) {
        this.on('_update_' + property, callback, priority);
    }

    get(property) {
        return this._properties[property];
    }

}

