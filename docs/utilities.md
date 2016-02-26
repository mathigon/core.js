# Utilities


### noop
`void noop()`
Empty function.



### uid
```String uid([Integer n])```
Creates an random n-digit string.

#### Arguments
* `Integer n` – Optional, default `10`



### run
```Any run(fn, [args, _this])```
If `fn` is a function, it will evaluate it with the provided arguments and _this_-value. Otherwise, run just returns fn. This is particularly useful for parsing parameters or configurations that could be both a dynamic function or a static value.

#### Arguments
* `Any fn` - either a function or a static object.
* `Any[] args` - array of arguments to pass to `fn` if it is a function. Optional, default is `[]`.
* `Any _this` - object to use as _this_-value when evaluation `fn`. Optional, default is `null`.

#### Returns
* `Any` - either `fn` itself, or the return value of `fn()`.

#### Example
```js
run('xy', 'a', 'b')             // -> 'xy'
run((a, b) => a + b, 'a', 'b')  // -> 'ab'
```



### isOneOf
```Boolean isOneOf(x, ...values)```
Checks if `x` is strictly equals to any one of `values`.

#### Arguments
* `Any x` - value to check
* `Any[] values` - multiple values to compare against.

#### Returns
* `Boolean`

#### Example
```js
isOneOf(10, 20, 30)     // -> false
isOneOf('a', 'b', 'a')  // -> true
```



### extend

#### `extend(first: object, ...rest: object) => object`
Adds all properties from the `rest` objects to the `first` objects. Later objects in `rest` will overwrite properties set in previous objects in `rest`, or the first one.

#### Arguments
* `first: object` (object)
* `rest?: object` (object, optional)

#### Returns
*

#### Example
```js
let x = { a: 1, b: 2 };
let y = { b: 3, c: 4 };
let z = { c: 5, d: 6 };
extend(x, y, z);
// x -> { a: 1, b: 3, c: 5, d: 6 }
```



### clamp
`Number clamp(Number x, Number min, Number max)`
Returns the number `x` bounded between `min` and `max`.

#### Arguments
* `Number x` – the number to bound.
* `min: number`: lower bound.
* `max: number`: upper bound.

#### Returns
* `number`: the bounded value of `x`.

#### Example
```js
clamp(12, 10, 5)   // → 10
```



### isBetween
`Boolean isBetween(Number x, Number min, Number max)`



### performance
`Number performance(Function fn, [Integer repetitions])`



### square
`Number square(Number x)`



### cube
`Number square(Number x)`



### defer
`{promise, resolve, reject} = defer()`
Returns a deferred object that contains promise, resolve and reject properties.

#### Returns
* `Promise promise` - a new Promise instance.
* `Function resolve(value)` - when called, resolves `promise` with `value`.
* `Function reject(value)` - when called, rejects `promise` with `value`.

#### Example
```js
let deferred = defer()
deferred.promise.then(x => { console.log(x); });
deferred.resolve('foo')
  // -> logs 'foo'
```



### has
`Boolean has(Object obj, String key)`
Checks if `obj` has an own property `key`. This is simply a wrapper for JavaScript's native `hasOwnProperty` method.



### each
`(Object|Array) each((Object|Array) obj, Function fn)`
Runs `fn(value, key)` for all enumerable properties `key` in a collection `obj` and returns a new collection with the corresponding values returned by `fn` (like `.map`). Collections can be arrays or objects, but not strings or maps.

#### Examples
```js
each([4, 5, 6], (v, k) => v + k);  // -> [4, 6, 8]
each({ a: 1, b: 2 }, (k, v) => v + k);  // -> { a: '1a', b: '2b' }
```



### some
`Any some((Object|Arrya) obj, Function fn)`



### cache
`Function cache(Function fn)`
Function wrapper that modifies `fn` to cache its return values. This is useful for performance intensive functions which are called repeatedly with the same arguments, but can reduce performance for functions which are always called with different arguments. Note that argument comparison doesn not work with Objects or nested arrays.'

#### Arguments
* `Function fn` - a function that is called repeatedly with the same arguments.

#### Returns
* `Function` - an optimised function that has the same behaviour has `fn`.

#### Example
```js
let slow = cache(function(x) {
    console.log('executing...');
    return Math.pow(x, x)
});

slow(100);   // logs 'executing...' and returns 1e+200
slow(100);   // returns 1e+200
```



### throttle
`Function throttle(Function fn, Number t)`
Function wrapper that prevents `fn` from being executed more than once every `t`ms. This is particularly useful for optimising callbacks for continues events like scroll, resize or slider move.

#### Arguments
* `Function fn` - a function that is called repeatedly in quick succession.
* `Number t` - a timeout value in ms.

#### Returns
* `Function` - an optimised function that has the same behaviour has `fn`.

#### Example
```js
let slow = cache(function(x) {
    el.height = innerHeight;
});

window.onresize = slow;
```



### shallowCopy
`Any shallowCopy(Any obj)`



### deepCopy
`Any deepCopy(Any obj)`
