'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// =============================================================================
// Core.ts | Utility Functions
// (c) Mathigon
// =============================================================================
/** Creates a random UID string of a given length. */
function uid(n = 10) {
    return Math.random().toString(36).substr(2, n);
}
/** Executes a function or returns the default value. */
function run(val, ...args) {
    if (val instanceof Function)
        return val(...args);
    return val;
}
/** Checks if x is strictly equal to any one of the following arguments. */
function isOneOf(x, ...values) {
    return values.includes(x);
}
/** Applies default keys to an object. */
function applyDefaults(obj, defaults) {
    for (let key of Object.keys(defaults)) {
        if (!obj.hasOwnProperty(key))
            obj[key] = defaults[key];
    }
    return obj;
}
const defaultMerge = ((a, b) => a.concat(b));
/** Deep extends obj1 with obj2, using a custom array merge function. */
function deepExtend(obj1, obj2, arrayMergeFn = defaultMerge) {
    for (const i of Object.keys(obj2)) {
        if (i in obj1 && Array.isArray(obj1[i]) && Array.isArray(obj2[i])) {
            obj1[i] = arrayMergeFn(obj1[i], obj2[i]);
        }
        else if (i in obj1 && obj1[i] instanceof Object &&
            obj2[i] instanceof Object) {
            deepExtend(obj1[i], obj2[i]);
        }
        else {
            obj1[i] = obj2[i];
        }
    }
}
/** Replacement for setTimeout() that is synchronous for time 0. */
function delay(fn, t = 0) {
    if (t) {
        return +setTimeout(fn, t);
    }
    else {
        fn();
        return 0;
    }
}
/** Returns a promise that resolves after a fixed time. */
function wait(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}
/** Creates a new promise together with functions to resolve or reject. */
function defer() {
    let resolve = (arg) => { };
    let reject = (arg) => { };
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    // This prevents exceptions when promises without .catch are rejected:
    promise.catch((error) => error);
    return { promise, resolve, reject };
}
/**
 * Function wrapper that modifies a function to cache its return values. This
 * is useful for performance intensive functions which are called repeatedly
 * with the same arguments. However it can reduce performance for functions
 * which are always called with different arguments. Note that argument
 * comparison doesn't not work with Objects or nested arrays.
 */
function cache(fn) {
    let cached = new Map();
    return function (...args) {
        let argString = args.join('--');
        if (!cached.has(argString))
            cached.set(argString, fn(...args));
        return cached.get(argString);
    };
}
/**
 * Function wrapper that prevents a function from being executed more than once
 * every t ms. This is particularly useful for optimising callbacks for
 * continues events like scroll, resize or slider move. Setting `forceDelay`
 * to `true` means that even the first function call is after the minimum
 * timout, rather than instantly.
 */
function throttle(fn, t = 0, forceDelay = false) {
    let delay = false;
    let repeat = false;
    return (...args) => {
        if (delay) {
            repeat = true;
        }
        else {
            if (forceDelay) {
                repeat = true;
            }
            else {
                fn(...args);
            }
            delay = true;
            setTimeout(() => {
                if (repeat)
                    fn(...args);
                delay = repeat = false;
            }, t);
        }
    };
}
/** Safe wrapper for JSON.parse. */
function safeToJSON(str, fallback = {}) {
    if (!str)
        return fallback;
    try {
        return JSON.parse(str) || fallback;
    }
    catch (e) {
        return fallback;
    }
}

// =============================================================================
// Core.ts | Array Functions
// (c) Mathigon
// =============================================================================
/** Creates an array of size `n`, containing `value` at every entry. */
function repeat(value, n) {
    return new Array(n).fill(value);
}
/** Creates a matrix of size `x` by `y`, containing `value` at every entry. */
function repeat2D(value, x, y) {
    const result = [];
    for (let i = 0; i < x; ++i) {
        result.push(repeat(value, y));
    }
    return result;
}
/** Creates an array of size `n`, with the result of `fn(i)` at position i. */
function tabulate(fn, n) {
    const result = [];
    for (let i = 0; i < n; ++i) {
        result.push(fn(i));
    }
    return result;
}
/**
 * Creates a matrix of size `x` by `y`, with the result of `fn(i, j)` at
 * position (i, j.
 */
function tabulate2D(fn, x, y) {
    const result = [];
    for (let i = 0; i < x; ++i) {
        const row = [];
        for (let j = 0; j < y; ++j) {
            row.push(fn(i, j));
        }
        result.push(row);
    }
    return result;
}
/** Creates an array of numbers from 0 to a, or from a to b. */
function list(a, b, step = 1) {
    const arr = [];
    if (b === undefined && a >= 0) {
        for (let i = 0; i < a; i += step)
            arr.push(i);
    }
    else if (b === undefined) {
        for (let i = 0; i > a; i -= step)
            arr.push(i);
    }
    else if (a <= b) {
        for (let i = a; i <= b; i += step)
            arr.push(i);
    }
    else {
        for (let i = a; i >= b; i -= step)
            arr.push(i);
    }
    return arr;
}
/** Returns the last item in an array, or the ith item from the end. */
function last(array, i = 0) {
    return array[array.length - 1 - i];
}
/** Finds the sum of all elements in an numeric array. */
function total(array) {
    return array.reduce((t, v) => t + v, 0);
}
/** Sorts an array by the return value when evaluating a given function. */
function sortBy(array, fn, reverse = false) {
    return array.slice(0).sort((a, b) => {
        const x = fn(a);
        const y = fn(b);
        return x < y ? (reverse ? 1 : -1) : x > y ? (reverse ? -1 : 1) : 0;
    });
}
/**
 * Returns a function that can be called repeatedly, and returns items of the
 * array, continuously looping
 */
function loop(array) {
    let i = 0;
    return () => array[(i++) % array.length];
}
/** Filters all duplicate elements from an array. */
function unique(array) {
    return array.filter((a, i) => array.indexOf(a) === i);
}
/** Flattens a nested array into a single list. */
function flatten(array) {
    return array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}
/** Creates a cumulative array by adding its elements. */
function cumulative(array) {
    let total = 0;
    return array.map(a => total += a);
}
/** Breaks an array into chunks of size at most n. */
function chunk(array, n) {
    const chunks = [];
    for (let i = 0; i < array.length; i += n) {
        chunks.push(array.slice(i, i + n));
    }
    return chunks;
}
/** Rotates the elements of an array by offset. */
function rotate(array, offset = 1) {
    const n = array.length;
    offset = ((offset % n) + n) % n; // Offset could initially be negative...
    const start = array.slice(0, offset);
    const end = array.slice(offset);
    return end.concat(start);
}
/** Returns all elements that are in both a1 and a2.  */
function intersect(a1, a2) {
    return a1.filter(x => a2.includes(x));
}
/** Returns all elements that are only in one of a1 and a2. */
function difference(a1, a2) {
    let notIn1 = a2.filter(a => !a1.includes(a));
    let notIn2 = a1.filter(a => !a2.includes(a));
    return [...notIn1, ...notIn2];
}
/** Join multiple Arrays */
function join(...arrays) {
    return arrays.reduce((a, x) => a.concat(x), []);
}
/** Converts an array to a linked list data structure. */
function toLinkedList(array) {
    const result = array.map(a => ({ val: a, next: undefined }));
    const n = result.length;
    for (let i = 0; i < n - 1; ++i) {
        result[i].next = result[i + 1];
    }
    result[n - 1].next = result[0];
    return result;
}

// =============================================================================
/** Splits a string into space separated words. */
function words(str, divider = /\s+/) {
    if (!str)
        return [];
    return str.trim().split(divider);
}
/** Converts a string to title case. */
function toTitleCase(str) {
    return str.replace(/\S+/g, a => a.charAt(0).toUpperCase() + a.slice(1));
}
/** Converts a string to camel case. */
function toCamelCase(str) {
    return str.toLowerCase().replace(/^-/, '')
        .replace(/-(.)/g, (_, g) => g.toUpperCase());
}
/** Checks if a string is a palindrome. */
function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}
/** Determines the Levenshtein distance between two strings. */
function stringDistance(s1, s2) {
    let arr = repeat2D(0, s1.length + 1, s2.length + 1);
    for (let i = 0; i <= s1.length; i++)
        arr[i][0] = i;
    for (let i = 0; i <= s2.length; i++)
        arr[0][i] = i;
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            arr[i][j] = Math.min(arr[i - 1][j - 1] +
                (s1.charAt(i - 1) === s2.charAt(j - 1) ? 0 : 1), arr[i - 1][j] + 1, arr[i][j - 1] + 1);
        }
    }
    return arr[s1.length][s2.length];
}
/** Tries to auto-correct a word from a dictionary. */
function autoCorrect(word, dict) {
    let maxDistance = word.length / 2;
    let distances = dict.map(w => ({ w, d: stringDistance(word, w) }))
        .filter(({ d }) => d < maxDistance);
    let bestMatch = sortBy(distances, d => d.d)[0];
    return bestMatch ? bestMatch.w : undefined;
}

// =============================================================================
/** Base class for event management. */
class EventTarget {
    constructor() {
        this.events = new Map();
    }
    /** Adds an event listener for one or more events. */
    on(events, fn) {
        for (let e of words(events)) {
            if (!this.events.has(e))
                this.events.set(e, []);
            this.events.get(e).push(fn);
        }
    }
    /** Adds a one-time event listener to one or more events. */
    one(events, fn) {
        const callback = (e) => {
            this.off(events, callback);
            fn(e);
        };
        this.on(events, callback);
    }
    /** Removes an event listener from one or more events. */
    off(events, fn) {
        for (let e of words(events)) {
            if (this.events.has(e)) {
                this.events.set(e, this.events.get(e).filter(x => x !== fn));
            }
        }
    }
    /** Triggers one or more events, and executes all bound event listeners. */
    trigger(events, arg) {
        for (let e of words(events)) {
            if (this.events.has(e)) {
                for (const callback of this.events.get(e)) {
                    callback(arg);
                }
            }
        }
    }
}

// =============================================================================
const shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const longHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const rgbaRegex = /rgba?\(([0-9,]+), ?([0-9,]+), ?([0-9,]+)(, ?([0-9,]+))?\)/;
const rainbow = ['#22ab24', '#0f82f2', '#cd0e66', '#fd8c00'];
function pad2(str) {
    return str.length === 1 ? '0' + str : str;
}
/** Gets the colour of a multi-step gradient at a given percentage p */
function getColourAt(gradient, p) {
    if (p <= 0)
        return Color.from(gradient[0]);
    if (p >= 1)
        return Color.from(last(gradient));
    const r = Math.floor(p * (gradient.length - 1));
    const q = p * (gradient.length - 1) - r;
    return Color.mix(gradient[r + 1], gradient[r], q);
}
/** Colour generation and conversion class. */
class Color {
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /** Converts this colour to a hex string. */
    get hex() {
        const c = [this.r, this.g, this.b].map(x => pad2(Math.round(x).toString(16)));
        return '#' + c.join('');
    }
    /** Converts this colour to an rgba string. */
    get rgb() {
        const c = [this.r, this.g, this.b].map(x => Math.round(x)).join(',');
        return 'rgba(' + c + ',' + this.a + ')';
    }
    /** Converts this colour to an hsl string. */
    get hsl() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s;
        const l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        }
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                default: // b
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return 'hsl(' + [h, s, l].join(',') + ')';
    }
    toString() {
        return this.rgb;
    }
    /** Creates a copy of this colour. */
    copy() {
        return new Color(this.r, this.g, this.b, this.a);
    }
    // ---------------------------------------------------------------------------
    static from(color) {
        if (typeof color !== 'string')
            return color;
        return color.startsWith('#') ? Color.fromHex(color) : Color.fromRgb(color);
    }
    static fromRgb(color) {
        const match = color.match(rgbaRegex);
        if (!match)
            return new Color(0, 0, 0);
        const a = match[4] ? (+match[5] || 0) : 1;
        return new Color(+match[1], +match[2], +match[3], a);
    }
    /** Creates a Colour instance from a hex string. */
    static fromHex(hex) {
        hex = hex.replace(shortHexRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        const rgbParts = longHexRegex.exec(hex);
        if (!rgbParts)
            return new Color(0, 0, 0);
        return new Color(parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16));
    }
    /** Generates a rainbow gradient with a given number of steps. */
    static rainbow(steps) {
        return tabulate(x => getColourAt(rainbow, x / (steps - 1)), steps);
    }
    /** Generates a rainbow gradient with a given number of steps. */
    static gradient(from, to, steps) {
        return tabulate(x => getColourAt([from, to], x / (steps - 1)), steps);
    }
    /** Linearly interpolates two colours or hex strings. */
    static mix(c1, c2, p = 0.5) {
        c1 = Color.from(c1);
        c2 = Color.from(c2);
        return new Color(p * c1.r + (1 - p) * c2.r, p * c1.g + (1 - p) * c2.g, p * c1.b + (1 - p) * c2.b, p * c1.a + (1 - p) * c2.a);
    }
}

exports.Color = Color;
exports.EventTarget = EventTarget;
exports.applyDefaults = applyDefaults;
exports.autoCorrect = autoCorrect;
exports.cache = cache;
exports.chunk = chunk;
exports.cumulative = cumulative;
exports.deepExtend = deepExtend;
exports.defer = defer;
exports.delay = delay;
exports.difference = difference;
exports.flatten = flatten;
exports.intersect = intersect;
exports.isOneOf = isOneOf;
exports.isPalindrome = isPalindrome;
exports.join = join;
exports.last = last;
exports.list = list;
exports.loop = loop;
exports.repeat = repeat;
exports.repeat2D = repeat2D;
exports.rotate = rotate;
exports.run = run;
exports.safeToJSON = safeToJSON;
exports.sortBy = sortBy;
exports.stringDistance = stringDistance;
exports.tabulate = tabulate;
exports.tabulate2D = tabulate2D;
exports.throttle = throttle;
exports.toCamelCase = toCamelCase;
exports.toLinkedList = toLinkedList;
exports.toTitleCase = toTitleCase;
exports.total = total;
exports.uid = uid;
exports.unique = unique;
exports.wait = wait;
exports.words = words;
