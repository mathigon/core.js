// =============================================================================
// Core.js | Evented
// (c) 2015 Mathigon
// =============================================================================



import { words } from 'strings';
import { sortBy } from 'arrays';


export default class Evented {

	constructor() {
        this._events = {};
        this._properties = {};
        this._timeouts = {};
	}

	on(events, fn, priority) {
        for (let e of words(events)) {
            if (!(e in this._events)) this._events[e] = [];
            this._events[e].push(fn);
        };
    }

    off(events, fn) {
        for (let e of words(events)) {
            if (e in this._events)
                this._events[e] = this._events[e].filter(x => x !== fn);
        };
    }

    trigger(events, ...args) {
        for (let e of words(events)) {
            if (e in this._events)
                this._events[e].forEach(function(fn) { fn.call(this, args); });
        };
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

