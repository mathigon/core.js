## Strings


### String.endsWith

#### `String.prototype.endsWith(String end) : Boolean`
checks if a string ends with another string `end`.


### String.strip

#### `String.prototype.strip() : String`
removes any leading or trailing whitespace (spaces, tabs, ...).


### String.collapse

#### `String.prototype.collapse() : String`
replaces multiple consecutive whitespaces with a sing;e `' '`.


### String.toTitleCase

#### `String.prototype.toTitleCase() : String`
capitalises every word in a string. For example, `"Here is someE TEXT".toTitleCase() = "Here Is SomeE TEXT"`.


### String.words

#### `String.prototype.words() : [String]`
returns an array containing all the words in a string.


### String.contains

#### `String.prototype.contains(String str) : Boolean`
checks if a string contains contains `str`. This polyfill is only added if the environment doesn't natively support `String.prototype.contains`.
