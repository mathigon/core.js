## Classes


### Class

`M.Class` implements a JavaScript class framework with inheritance, using `.extend`, and a built-in events model, using the `.on`, `.off` and `.trigger` methods.

#### Methods

`M.Class.extend(Object methods) : Function`  
create a new child-class of M.Class. The `methods` object can contain a `init` method which becomes the constructor of the new Class.
Note that `M.Class.extend` is not the same as [`M.extend`]('#extend').

`.on(String events, Function callback)`  
binds a new callback to one or more space-separated events.

`.off(String events, Function callback)`  
removes a callback from one or more events space-separated events.

`.trigger(String event, Object arg)`  
triggers a single event on a class, and calls all bound callbacks with `arg` as argument.

#### Properties

`.parent`

`.construct`
