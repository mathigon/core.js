## Objects


### has

#### `M.has(Object obj, String key): Boolean`
checks if `obj` contains the property `key` (not including any prototype functions or inherited methods).


### object.keys

#### `M.object.keys(Object obj): Array`
returns an array of all keys in `obj`.
For example, `M.object.invert({a: 1, b: 2}) = ['a', 'b']`.


### object.invert

#### `M.object.invert(Object obj) : Object`
returns a new object that swaps keys and values in an object `obj`.
For example, `M.object.invert({a: 'b', c: 'd'}) = {b: 'a', d: 'c'}`.


### object.create

#### `M.object.create(Object proto) : Object`
creates a new object with prototype `proto`. This is a polyfill for the native JavaScript `Object.create` method.


### each

#### `M.each(collection, Function fn) : Object/Array`
executes `fn(value, index)` repeatedly for every element in a collection like an array or an object, and returns a matching collection that contains the return values of `fn`.

For example, `M.each(['a', 'b', 'c'], function(x, i) { return i+x; }) = ['0a', '1b', '2c']` and `M.each({ x: 'a', y: 'b', z: 'c'}, function(x, i) { return i+x; }) = ['xa', 'yb', 'zc']`.

`M.each` ignores elements in the collection's prototype chain, and correctly handles arrays with missing indices.


### some

#### `M.some(collection, Function fn) : various`
executes `fn(value, index)` repeatedly for every element in a collection, until `fn` returns a value other than `undefined`. At this point, the loop stops and `M.some` returns the last value returned by `fn`.

Note that, when `collection` is an object rather than an array, no assumption should be made about the order of the elements.


### extend

#### `M.extend(Object x, Object y)`
adds all methods in `y` to `x`. If `y` contains `undefined` elements, the matching elements in `x` are deleted.

#### `M.extend(Object x, Object y, true)`
adds all methods in `y` as _non-enumerable_ methods to `x`. This is most useful when extending prototypes, like in `M.extend(MyClass.prototype, { prop1: /**/, prop2: /**/ }, true)`.


### merge

#### `M.merge(Object obj1, Object obj2, ...) : Object`
creates a new object that contains all properties of the objects passed in as arguments. If some of the properties overlap, the result will contain the value from the last argument.


### watch

#### `M.watch(Object obj, String prop, Function fn)`
binds a change watcher to an object `obj`, which is executed as `fn(newVal, oldVal)` whenever the value of `obj[prop]` changes.
This effect is achieved using custom _getters_ and _setters_ for `obj`. As a side effect, thge property `prop` can only be accessed as `obj.prop`, but not as `obj['prop']`.


### unwatch

#### `M.unwatch(Object obj, String prop)`
removes a previously attached change watcher from `obj.prop`.
