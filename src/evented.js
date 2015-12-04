// =============================================================================
// Core.js | Evented
// (c) 2015 Mathigon
// =============================================================================



import { sortBy } from './arrays';
import { watch, unwatch } from './utilities';


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

    // TODO implement priority
	on(events, fn, priority = 0) {
        for (let e of process(events, this._options)) {
            if (!(e in this._events)) this._events[e] = [];
            this._events[e].push(fn);
        }
    }

    one(events, fn) {
        let _this = this;
        function callback(...args) {
            _this.off(events, callback);
            fn(...args);
        }
        this.on(events, callback);

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
