# Evented


This is our base class for event management. It is rarely used on its own, but many other classes inherit from `Evented`.



## Constructor

### Evented
`new Evented({ [split], [lowercase] })`

#### Arguments
* `Boolean lowercase` - true if event names are not case sensitive.
* `String split` - separator for multiple events.



## Methods

### .on
`.on(String events, Function fn)`
Adds an event listener `fn` to one or more events.


### .one
`.one(String events, Function fn)`
Adds a one-time event listener `fn` to one or more events.


### .off
`.off(String events, Function fn)`
Removes an event listener `fn` from one or more events.


### .trigger
`.trigger(String events, Any ...args`
Triggers one or more events, and executes all bound event listeners with `...args` as arguments.
