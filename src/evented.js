// =============================================================================
// Core.js | Evented
// (c) Mathigon
// =============================================================================



function process(events, options) {
  if (options.lowercase) events = events.toLowerCase();
  return events.split(options.split).map(e => e.trim());
}

/**
 * This is our base class for event management. It is rarely used on its own,
 * but many other classes inherit from Evented.
 */
export default class Evented {

  /**
   * @param {string} split
   * @param {boolean} lowercase
   */
  constructor({ split = ' ', lowercase = false } = {}) {
    this._options = { split, lowercase };
    this._events = {};
  }

  /**
   * Adds an event listener for one or more events.
   * @param {string} events
   * @param {Function} fn
   */
  on(events, fn) {
    for (let e of process(events, this._options)) {
      if (!(e in this._events)) this._events[e] = [];
      this._events[e].push(fn);
    }
  }

  /**
   * Adds a one-time event listener to one or more events.
   * @param {string} events
   * @param {Function} fn
   */
  one(events, fn) {
    let _this = this;
    function callback(...args) {
      _this.off(events, callback);
      fn(...args);
    }
    this.on(events, callback);

  }

  /**
   * Removes an event listener from one or more events.
   * @param {string} events
   * @param {Function} fn
   */
  off(events, fn) {
    for (let e of process(events, this._options)) {
      if (e in this._events)
        this._events[e] = this._events[e].filter(x => x !== fn);
    }
  }

  /**
   * Triggers one or more events, and executes all bound event listeners with
   * the given arguments.
   * @param {string} events
   * @param {...*} args
   */
  trigger(events, ...args) {
    for (let e of process(events, this._options)) {
      if (e in this._events)
        this._events[e].forEach(function(fn) { fn.apply(this, args); });
    }
  }

}
