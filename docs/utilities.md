## Utilities


### `uid(n: int) => string`
Creates an random n-digit string

#### Arguments
* `n` (int, optional, default `10`) 



### `run(obj: fn|any, args: array, this: any) => any`
If `obj` is a function, `run` evaluates `obj` with the given arguments and `this` binding. Otherwise it simply returns `obj`.

#### Arguments
* `obj` (any)
* `args` (array, optional, default `[]`)
* `this` (any, optional, default `null`)



### `isOneOf(x: any, ...tests: any) => boolean`
Checks if the value `x` is strictly equals (`===`) to any of the remaining arguments `tests`.

#### Arguments
* `x` (any)
* `tests` (array, optional, default `[]`)

#### Examples
```js
isOneOf(10, 8, 9, 10);  // -> true
isOneOf([], 'no', [], 0);  // -> false
```



### `extend(first: object, ...rest: object) => object`
Adds all properties from the `rest` objects to the `first` objects. Later objects in `rest` will overwrite properties set in previous objects in `rest`, or the first one.

#### Arguments
* `first` (object)
* `rest` (object, optional)


#### Example
```js
let x = { a: 1, b: 2 };
let y = { b: 3, c: 4 };
let y = { c: 5, d: 6 };
extend(x, y, z);
// x -> { a: 1, b: 3, c: 5, d: 6 }
```



### `clamp(x: Number, min: Number, max: Number) => Number`
Returns the number `x` bounded between numbers `min` and `max`.



### `isBetween(x: Number, min: Number, max: Number) => Boolean`
Checks is `x` is strictly (`<`, `>`) between `min` and `max`.


### `performance(f: Function, n: Int) => Number`
Runs `f()` repeatedly `n` times and returns the average runtime.

#### Arguments
* f: (function)
* n: (int, optional, default `100`)



### `defer() => { promise: Promise, resolve: Function, reject: Function }`
Creates a new promise and returns an opject with `promise`, `resolve` and `reject` properties.

#### Example
```js
let deferred = defer();
deferred.promise.then(function(response) { console.log(response); });
deferred.resolve(10);
// logs 10
```



### `has(obj: Object, key: String) => Boolean`
Checks if `obj` has an own property `key`. This is simply a wrapper for JavaScript's native `hasOwnProperty` method.


### `each(obj: Collection, fn: Function) => Collection`
Runs `fn(value, key)` for all enumerable properties `key` in a collection `obj` and returns a new collection with the corresponding values returned by `fn` (like `.map`). Collections can be arrays or objects, but not strings or maps.

#### Examples
```js
each([4, 5, 6], (v, k) => v + k);  // -> [4, 6, 8]
each({ a: 1, b: 2 }, (k, v) => v + k);  // -> { a: '1a', b: '2b' }

```


### `some(obj: Collection, fn: Function) => Any`


### `cache(fn: Function) => Function`
Function wrapper which returns a new function with the same functionality as `fn`, except that the return values are cached. This is useful for performance-heavy functions which are called multiple times with the same arguments. `cache` uses `arguments.join('--')` to check for the same arguments, which works well with numbers, strings and simple arrays, but not objects which get stringified as `[object Object]`.

#### Example
```js
let fn = function(x, y) { console.log(x, y); return x + y; }
let wrap = cache(fn);

wrap(10, 11);  // returns 21 and logs (10, 11)
wrap(12, 13);  // returns 25 and logs (12, 13)
wrap(10, 11);  // returns 21 and logs nothing

```



### `throttle(fn: Function, t: Int) => Function`
Function wrapper which returns a new function with the same functionality as `fn`, except that it is not executed more than once every `t`ms. Blocked calls are delayed until `t`ms after the previous execution, and 

If the new function is called many times repeatedly, it is executed once initially and once again after `t`ms. Multiple calls during the same blocking period are only resolved *once* at the end.

To avoid confusion or race conditions, `throttle` is best used on functions without arguments or return values. It is particularly useful for handling resize, scroll or mousemove events in the browser.


#### Example
```js
let fn = function(x) { console.log(x); }
let wrap = throttle(fn, 100);

wrap(10);  // logs 10
wrap(11);
wrap(12);
           // after 100ms, logs 11

```



### `shallowCopy(obj: Any) => Any`


### `deepCopy(obj: Any) => Any`
Creates a full copy of a nested array or object `obj`. Note that `deepCopy` can even handle circular objects, but as a result is very slow at copying large objects.


### shallowEquals


### deepEquals


### watch


### unwatch
