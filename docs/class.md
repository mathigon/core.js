## Classes


`M.Class` implements a JavaScript class framework with inheritance, using `.extend`, and a built-in events model, using the `.on`, `.off` and `.trigger` methods.


### Class.extend

#### `M.Class.extend(Object methods) : Function`
create a new child-class of M.Class. The `methods` object should contain a `.init` method which becomes the constructor of the new Class.

Every new class contains a `.parent` property containing their parent class, and an `.extend` method to create further child classes.

Note that `M.Class.extend` is not the same as [`M.extend`]('#extend').


### Class.prototype.on

#### `M.Class.prototype.on(String events, Function callback)`
binds a new callback to one or more space-separated events.


### Class.prototype.off

#### `M.Class.prototype.off(String events, Function callback)`
removes a callback from one or more events space-separated events.


### Class.prototype.trigger

#### `M.Class.prototype.trigger(String event, Object arg)`
triggers a single event on a class, and calls all bound callbacks with `arg` as argument.
