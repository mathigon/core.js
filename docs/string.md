## Strings


### String

#### Methods

`.endsWith(String end) : Boolean`  
checks if a string ends with another string `end`.

`.strip() : String`  
removes any leading or trailing whitespace (spaces, tabs, ...).

`.collapse() : String`  
replaces multiple consecutive whitespaces with a sing;e `' '`.

`.toTitleCase() : String`  
capitalises every word in a string. For example, `"Here is someE TEXT".toTitleCase() = "Here Is SomeE TEXT"`.

`.words() : [String]`  
returns an array containing all the words in a string.

`.contains(String str) : Boolean`  
checks if a string contains contains `str`. This polyfill is only added if the environment doesn't natively support `String.prototype.contains`.
