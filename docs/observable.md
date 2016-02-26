# Observable (beta)


Until all platforms support ES6 proxies, we will have to simulate their functionality using getters and setters, and a slightly more verbose syntax.



## Constructor

### observable
`Object observable(Object model)`

#### Arguments
* `Object model`



## Methods

### .watch
`.watch(String key, Function callback)`

### .unwatch
`.unwatch(String key)`
