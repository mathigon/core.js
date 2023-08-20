// =============================================================================
// Core.ts | Utility Functions
// (c) Mathigon
// =============================================================================


/** Object Map Interface. */
export type Obj<T> = {[key: string]: T};


/** Creates a random UID string of a given length. */
export function uid(n = 10) {
  return Math.random().toString(36).substr(2, n);
}


/** Executes a function or returns the default value. */
export function run<T, S>(val: T|((...args: S[]) => T), ...args: S[]) {
  if (val instanceof Function) return val(...args);
  return val;
}


/** Checks if x is strictly equal to any one of the following arguments. */
export function isOneOf<T>(x: T, ...values: T[]) {
  return values.includes(x);
}


const defaultMerge = ((a: unknown[], b: unknown[]) => a.concat(b));

/** Deep extends obj1 with obj2, using a custom array merge function. */
export function deepExtend(obj1: Obj<unknown>, obj2: Obj<unknown>, arrayMergeFn = defaultMerge) {
  for (const i of Object.keys(obj2)) {
    if (i in obj1 && Array.isArray(obj1[i]) && Array.isArray(obj2[i])) {
      obj1[i] = arrayMergeFn(obj1[i] as unknown[], obj2[i] as unknown[]);
    } else if (i in obj1 && obj1[i] instanceof Object && obj2[i] instanceof Object) {
      deepExtend(obj1[i] as Obj<unknown>, obj2[i] as Obj<unknown>);
    } else {
      obj1[i] = obj2[i];
    }
  }
}


/** Replacement for setTimeout() that is synchronous for time 0. */
export function delay(fn: () => void, t = 0) {
  if (t) {
    return +setTimeout(fn, t);
  } else {
    fn();
    return 0;
  }
}


/** Returns a promise that resolves after a fixed time. */
export function wait(t: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, t));
}


/** Creates a new promise together with functions to resolve or reject. */
export function defer<T = void>() {
  let resolve: ((value: T | PromiseLike<T>) => void) = () => undefined;
  let reject: ((reason?: unknown) => void) = () => undefined;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  // This prevents exceptions when promises without .catch are rejected:
  promise.catch((error) => error);

  return {promise, resolve, reject};
}


class CacheError extends Error {
  constructor(readonly data: unknown) {
    super('[Cache Error]');
  }
}

/**
 * Function wrapper that modifies a function to cache its return values. This
 * is useful for performance intensive functions which are called repeatedly
 * with the same arguments. However it can reduce performance for functions
 * which are always called with different arguments. Note that argument
 * comparison does not work with Objects or nested arrays.
 */
export function cache<T, Args extends unknown[]>(fn: (...args: Args) => T) {
  const cached = new Map<string, T|CacheError>();
  return function(...args: Args) {
    const argString = args.join('--');
    if (!cached.has(argString)) {
      try {
        cached.set(argString, fn(...args));
      } catch (e) {
        cached.set(argString, new CacheError(e));
      }
    }
    const value = cached.get(argString)!;
    if (value instanceof CacheError) throw value.data;
    return value;
  };
}


/**
 * Function wrapper that prevents a function from being executed more than once
 * every t ms. This is particularly useful for optimising callbacks for
 * continues events like scroll, resize or slider move. Setting `forceDelay`
 * to `true` means that even the first function call is after the minimum
 * timout, rather than instantly.
 */
export function throttle<Args extends unknown[]>(fn: (...args: Args) => void, t = 0, forceDelay = false) {
  let delay = false;
  let repeat = false;

  return (...args: Args) => {
    if (delay) {
      repeat = true;
    } else {
      if (forceDelay) {
        repeat = true;
      } else {
        fn(...args);
      }
      delay = true;
      setTimeout(() => {
        if (repeat) fn(...args);
        delay = repeat = false;
      }, t);
    }
  };
}


function reviver(allowed: string[]) {
  // Filter only specific keys in a JSON object.
  return function(this: unknown, key: string, value: unknown) {
    // eslint-disable-next-line no-invalid-this
    if (!key || Array.isArray(this) || allowed.includes(key)) return value;
  };
}

/** Safe wrapper for JSON.parse. */
export function safeToJSON<T>(str?: string|null, fallback?: T, allowedKeys?: string[]): T|undefined {
  if (!str) return fallback;
  try {
    return JSON.parse(str, allowedKeys ? reviver(allowedKeys) : undefined) || fallback;
  } catch (e) {
    return fallback;
  }
}
