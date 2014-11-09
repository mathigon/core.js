## General


### noop

`M.noop()`  
takes no arguments and does not do anything.


### trueop

`M.trueop()`  
always returns true.


### run

`M.run(x, optional Array args, optional Object context) : various`  
returns `x` if it is not a function, otherwise returns the result of executing `x(args)` with `context` as `this`.


### isOneOf

`M.isOneOf(x, value1, value2, ...) : Boolean`  
checks if x is strictly equal (`===`) to any one of the following arguments.
