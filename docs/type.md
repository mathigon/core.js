## Types


### typeof

`M.typeof(obj): String`  
returns the type of any value or object. Possible outcomes are `null`, `undefined`, `nan`, `number`, `string`, `boolean`, `array`, `date`, `regexp`, `function` or `object`.
The type of objects created using `new Number(5)` or `new Array(1, 2, 3)` is returned correctly as `number` or `array` respectively. Note that `typeof NaN = 'number'`, while `M.typeof(NaN) = 'nan'`.


### isType

`M.isType(obj, String t) : Boolean`  
checks if `obj` is of type `t`. There are many shortcuts for checking particular types:

`M.isString(obj) : Boolean`  

`M.isArray(obj) : Boolean`  

`M.isNumber(obj) : Boolean`  

`M.isInteger(obj) : Boolean`  

`M.isDate(obj) : Boolean`  

`M.isNaN(obj) : Boolean`  

`M.isFunction(obj) : Boolean`  

`M.isBoolean(obj) : Boolean`  

`M.isObject(obj) : Boolean`  
