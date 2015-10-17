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
                this._events[e].forEach(function(fn) { fn.apply(this, args); });
        }
    }

}
