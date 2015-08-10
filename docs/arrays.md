## Arrays

### `tabulate(fn: Function|Any, x1, ... xn: Int) => Array`
If `n` integers `x1` are specified, `tabulate` will create a multi-dimensional matrix that contains `fn(i1, i2, ..., in)` in cell `[i1][i2]...[in]`.
If `fn` is not a function, every item in the resulting array will have value `fn`.

#### Examples
```js
tabulate(x => x, 5);  // -> [0, 1, 2, 3, 4];
tabulate((x, y) => x + ' ' + y, 2, 2);  // -> [['0 0', '0 1'], ['1 0', '1 1']]
tabulate(1, 3, 3);  // -> [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
```


### `list(a: Number, b: Number, inc: Number) => Array`
Creates a 

#### Examples
```js
list(5);  // -> [0, 1, 2, 3, 4]
list(-2, 2);  // -> [-2, -1, 0, 1, 2]
list(5, 15, 5);  // -> [5, 10, 15]
```


### `map(fn: Function, ...args: Array) => Array`
Applies `fn` to multiple arrays of arguments and returns an array with the results of every operation.
This function is particularly useful for vector operations.
If 

#### Example
```js
map(Math.min, [5, 4], [7, 3]);  // -> [min(5, 7), min(4, 3)] = [5, 3]
```


### `total(a: Array) => Number`
Finds the sum of all elements in a numeric array `a`. This operation is *safe*, i.e. any values that can't be cast to a number are counted as 0.


### `extract(a: Array, id: String) => Array`


### `zip(keys: String[], values: Any[]) => Object`


### `sortBy(array, id, reverse: Boolean = false) => Array`


### `unique(a: Array) => Array`


### `clean(a: Array) => Array`


### `without(a: Array, x) => Array`


### `flatten(a: Array) => Array`


### `cumulative(a: Number[]) => Array`


### `chunk(a: Array, n) => Array`


### `rotate(a: Array, offset: Int) => Array`


### `intersect(a1: Array, a2: Array) => Array`


### `difference(a1: Array, a2: Array) => Array`
