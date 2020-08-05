// =============================================================================
// Core.ts | Event Target Class
// (c) Mathigon
// =============================================================================


import {words} from './strings';


type EventCallback = (e: any) => void;


/** Base class for event management. */
export class EventTarget {
  private events = new Map<string, EventCallback[]>();

  /** Adds an event listener for one or more events. */
  on(events: string, fn: EventCallback) {
    for (const e of words(events)) {
      if (!this.events.has(e)) this.events.set(e, []);
      this.events.get(e)!.push(fn);
    }
  }

  /** Adds a one-time event listener to one or more events. */
  one(events: string, fn: EventCallback) {
    const callback = (e: any) => {
      this.off(events, callback);
      fn(e);
    };
    this.on(events, callback);
  }

  /** Removes an event listener from one or more events. */
  off(events: string, fn: EventCallback) {
    for (const e of words(events)) {
      if (this.events.has(e)) {
        this.events.set(e, this.events.get(e)!.filter(x => x !== fn));
      }
    }
  }

  /** Triggers one or more events, and executes all bound event listeners. */
  trigger(events: string, arg?: any) {
    for (const e of words(events)) {
      if (this.events.has(e)) {
        for (const callback of this.events.get(e)!) {
          callback(arg);
        }
      }
    }
  }
}
