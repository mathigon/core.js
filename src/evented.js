// =============================================================================
// Core.js | Evented
// (c) 2015 Mathigon
// =============================================================================



import { sortBy } from 'arrays';
import { watch, unwatch } from 'utilities';


function process(events, options) {
    if (options.lowercase) events = events.toLowerCase();
    return events.split(options.split).map(e => e.trim());
}

export default class Evented {

	constructor({ split = ' ', lowecase = false } = {}) {
        this._options = { split, lowecase };
        this._events = {};
        this._properties = {};
        this._timeouts = {};
	}

    // -------------------------------------------------------------------------
    // Events

	on(events, fn, priority) {  // TODO implement priority
        for (let e of process(events, this._options)) {
            if (!(e in this._events)) this._events[e] = [];
            this._events[e].push(fn);
        }
    }

    off(events, fn) {
        for (let e of process(events, this._options)) {
            if (e in this._events)
                this._events[e] = this._events[e].filter(x => x !== fn);
        }
    }

    trigger(events, ...args) {
        for (let e of process(events, this._options)) {
            if (e in this._events)
                this._events[e].forEach(function(fn) { fn.call(this, args); });
        }
    }


    // -------------------------------------------------------------------------
    // Property Watching (inefficient)

    watch(property, callback) {
        watch(this, property, callback);
    }

    unwatch(property) {
        unwatch(this, property);
    }


    // -------------------------------------------------------------------------
    // Property Watching (verbose)

    set(property, value) {
        var _this = this;
        this._properties[property] = value;

        // The update event is called asynchronously to avoid it being
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
