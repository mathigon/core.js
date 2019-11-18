# Core.ts

Core.ts is a library of TypeScript utility function and classes, including array
and string helpers, function wrappers and event classes. It was developed for
[Mathigon.org](https://mathigon.org), an award-winning mathematics education
project.

[![npm](https://img.shields.io/npm/v/@mathigon/core.svg)](https://www.npmjs.com/package/@mathigon/core)
[![npm](https://img.shields.io/github/license/mathigon/core.js.svg)](https://github.com/mathigon/core.js/blob/master/LICENSE)


## Features

* Function wrappers for caching and throttling (`cache()`, `throttle()`)
* Array generation (`tabulate()`, `repeat()`, `list()`)
* Array utilities (`total()`, `flatten()`, `chunk()`, `intersect()`, …)
* String utilities (`toCamelCase()`, `isPalindrome()`, `autoCorrect()`, …)
* Event Target class, supporting `.on()`, `.off()` and `.trigger()` methods
* Color parsing, conversion and interpolation
* Misc utilities (`uid()`, `isOneOf()`, …)


## Usage

First, install Core.ts from [NPM](https://www.npmjs.com/package/@mathigon/core)
using

```npm install @mathigon/core```

We recommend using Core.ts together with [Rollup](https://rollupjs.org/), using
using the [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve)
plugin.

Now, simply import all functions and classes you need, using

```js
import {tabulate, toCamelCase, EventTarget} from '@mathigon/core'
```


## Contributing

We welcome community contributions: please file any bugs you find or send us
pull requests with improvements. You can find out more on
[Mathigon.io](https://mathigon.io).

Before submitting a pull request, you will need to sign the [Mathigon Individual
Contributor License Agreement](https://gist.github.com/plegner/5ad5b7be2948a4ad073c50b15ac01d39).


## Copyright and License

Copyright © Mathigon ([dev@mathigon.org](mailto:dev@mathigon.org))  
Released under the [MIT license](LICENSE)
