## Types


### `typeOf(obj: Any) => String`
Returns the type of `obj`. Possible return values are `number`, `string`, `boolean`, `array`, `object`, `date`, `function`, `NaN`, `null`, `undefined`, as well as class names like `htmldocument`. Note that `typeof` caches all type checks for better performance.

#### Examples
```js
```


### `isType(obj: Any, type: String) => Boolean`
Shortcut for `typeOf(x) === type`.

### `isString(obj: Any) => Boolean`
### `isNumber(obj: Any) => Boolean`
### `isInteger(obj: Any) => Boolean`
### `isDate(obj: Any) => Boolean`
### `isBoolean(obj: Any) => Boolean`
### `isObject(obj: Any) => Boolean`
