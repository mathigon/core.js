# Types


### typeof
`String typeOf(Any obj)`
Returns the type of `obj`. Possible return values are `number`, `string`, `boolean`, `array`, `object`, `date`, `function`, `NaN`, `null`, `undefined`, as well as class names like `htmldocument`. Note that `typeof` caches all type checks for better performance.


### isType
`Boolean isType(Any obj, String type)`
Shortcut for `typeOf(x) === type`.


### isString
### isNumber
### isInteger
### isDate
### isBoolean
### isObject
