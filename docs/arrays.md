# Arrays


### tabulate
```Array tabulate(Any fn, Integer ...dimensions)```
If `n` integers `x1` are specified, `tabulate` will create a multi-dimensional matrix that contains `fn(i1, i2, ..., in)` in cell `[i1][i2]...[in]`. If `fn` is not a function, every item in the resulting array will have value `fn`.

#### Examples
```js
tabulate(2, 5)                        // -> [2, 2, 2, 2, 2]
tabulate(i => i * i, 5)               // -> [0, 1, 4, 9, 16]
tabulate((i, j) => '' + i + j, 2, 2)  // -> [['00', '01'], ['10', '11]]
tabulate(1, 3, 3);                    // -> [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
```



### list
`Number[] list(Number a, [Number b, Number step])`

#### Examples
```js
list(5);  // -> [0, 1, 2, 3, 4]
list(-2, 2);  // -> [-2, -1, 0, 1, 2]
list(5, 15, 5);  // -> [5, 10, 15]
```



### map
`Any[] map(Function fn, Any ...args)`
Applies `fn` to multiple arrays of arguments and returns an array with the results of every operation. This function is particularly useful for vector operations.

#### Example
```js
map(Math.min, [5, 4], [7, 3]);  // -> [min(5, 7), min(4, 3)] = [5, 3]
```



### total
`Number total(Number[] a)`
Finds the sum of all elements in a numeric array `a`. This operation is *safe*, i.e. any values that can't be cast to a number are counted as 0.

### average
`Number average(Number[] a)`

### extract
`Array extract(Object[] a, String id)`

### zip
`Object zip(Array keys, Array values)`

### sortBy
`Array sortBy(Array a, String key, [Boolean reverse])`

### unique
`Array unique(Array a)`

### clean
`Array clean(Array a)`

### without
`Array without(Array a)`

### flatten
`Array flatten(Array a)`

### cumulative
`Number[] cumulative(Number[] a)`

### chunk
`Array[] chunk(Array a)`

### rotate
`Array rotate(Array a)`

### intersect
`Array intersect(Array a, Array b)`

### difference
`Array difference(Array a, Array b)`
