# Core.js

Core.js is a library of JavaScript utilities

JavaScript utilities library containing function wrappers, string
and array helper functions, type checking and event classes. It was developed
for the mathematics education project [Mathigon.org](https://mathigon.org).

[![npm](https://img.shields.io/npm/v/@mathigon/core.svg)](https://www.npmjs.com/package/@mathigon/core)
[![npm](https://img.shields.io/github/license/mathigon/core.js.svg)](https://github.com/mathigon/core.js/blob/master/LICENSE)


## Features

* Function wrappers for caching and throttling (`cache()`, `throttle()`)
* Object handling (`shallowCopy()`, `deepCopy()`, `extend()`, `some()`, …)
* Array generation (`tabulate()`, `list()`)
* Array utilities (`total()`, `flatten()`, `chunk()`, `intersect()`, …)
* String utilities (`toCamelCase()`, `isPalindrome()`, `autocorrect()`, …)
* Functions for type checking (`typeOf()`, `isString()`, `isInteger()`, …)
* Evented class, supporting `.on()`, `.off()` and `.trigger()` methods
* Misc utilities (`uid()`, `isOneOf()`, `clamp()`, …)


## Usage

First, install core.js from [NPM](https://www.npmjs.com/package/@mathigon/core)
using

```npm install @mathigon/core --save```

Core.js uses [ES6 imports](http://2ality.com/2014/09/es6-modules-final.html).
While some browsers and platforms now support this feature, we recommend using
a transpiler such as [Babel](http://babeljs.io/) or [Rollup](https://rollupjs.org/). 

Import all functions and classes you need, using

```js
import { tabulate, toCamelCase, Evented } from '@mathigon/core'
```

Make sure that you configure your compiler to correctly resolve these
imports. For Rollup, we recommend using the
[rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve)
plugin.


## Contributing

We welcome community contributions: please file any bugs you find or send us
pull requests withj improvements. You can find out more on
[Mathigon’s contributions page](https://mathigon.org/contribute).


## Copyright and License

Copyright © Mathigon, [dev@mathigon.org](mailto:dev@mathigon.org)  
Released under the [MIT license](LICENSE)
