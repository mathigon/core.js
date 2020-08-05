// =============================================================================
// Core.ts | Array Functions
// (c) Mathigon
// =============================================================================


/** Creates an array of size `n`, containing `value` at every entry. */
export function repeat<T>(value: T, n: number): T[] {
  return new Array(n).fill(value);
}


/** Creates a matrix of size `x` by `y`, containing `value` at every entry. */
export function repeat2D<T>(value: T, x: number, y: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < x; ++i) {
    result.push(repeat<T>(value, y));
  }
  return result;
}


/** Creates an array of size `n`, with the result of `fn(i)` at position i. */
export function tabulate<T>(fn: (i: number) => T, n: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < n; ++i) {
    result.push(fn(i));
  }
  return result;
}


/**
 * Creates a matrix of size `x` by `y`, with the result of `fn(i, j)` at
 * position (i, j.
 */
export function tabulate2D<T>(fn: (i: number, j: number) => T, x: number,
    y: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < x; ++i) {
    const row: T[] = [];
    for (let j = 0; j < y; ++j) {
      row.push(fn(i, j));
    }
    result.push(row);
  }
  return result;
}


/** Creates an array of numbers from 0 to a, or from a to b. */
export function list(a: number, b?: number, step = 1) {
  const arr: number[] = [];

  if (b === undefined && a >= 0) {
    for (let i = 0; i < a; i += step) arr.push(i);
  } else if (b === undefined) {
    for (let i = 0; i > a; i -= step) arr.push(i);
  } else if (a <= b) {
    for (let i = a; i <= b; i += step) arr.push(i);
  } else {
    for (let i = a; i >= b; i -= step) arr.push(i);
  }

  return arr;
}


/** Returns the last item in an array, or the ith item from the end. */
export function last<T>(array: T[], i = 0): T {
  return array[array.length - 1 - i];
}


/** Finds the sum of all elements in an numeric array. */
export function total(array: number[]) {
  return array.reduce((t, v) => t + v, 0);
}


/** Sorts an array by the return value when evaluating a given function. */
export function sortBy<T>(array: T[], fn: (x: T) => any, reverse = false) {
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
export function loop<T>(array: T[]): () => T {
  let i = 0;
  return () => array[(i++) % array.length];
}


/** Filters all duplicate elements from an array. */
export function unique<T>(array: T[]): T[] {
  return array.filter((a, i) => array.indexOf(a) === i);
}


/** Flattens a nested array into a single list. */
export function flatten<T = any>(array: any[]): T[] {
  return array.reduce((a, b) =>
    a.concat(Array.isArray(b) ? flatten(b) : b), []);
}


/** Creates a cumulative array by adding its elements. */
export function cumulative(array: number[]) {
  let total = 0;
  return array.map(a => total += a);
}


/** Breaks an array into chunks of size at most n. */
export function chunk<T>(array: T[], n: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += n) {
    chunks.push(array.slice(i, i + n));
  }
  return chunks;
}


/** Rotates the elements of an array by offset. */
export function rotate<T>(array: T[], offset = 1): T[] {
  const n = array.length;
  offset = ((offset % n) + n) % n; // Offset could initially be negative...

  const start = array.slice(0, offset);
  const end = array.slice(offset);
  return end.concat(start);
}


/** Returns all elements that are in both a1 and a2.  */
export function intersect(a1: any[], a2: any[]) {
  return a1.filter(x => a2.includes(x));
}


/** Returns all elements that are only in one of a1 and a2. */
export function difference<T>(a1: T[], a2: T[]) {
  const notIn1 = a2.filter(a => !a1.includes(a));
  const notIn2 = a1.filter(a => !a2.includes(a));
  return [...notIn1, ...notIn2];
}


/** Join multiple Arrays */
export function join(...arrays: any[][]) {
  return arrays.reduce((a, x) => a.concat(x), []);
}


export interface LinkedListItem<T> {
  val: T;
  next?: LinkedListItem<T>;
}

/** Converts an array to a linked list data structure. */
export function toLinkedList<T>(array: T[]): LinkedListItem<T>[] {
  const result: LinkedListItem<T>[] = array.map(a => ({val: a, next: undefined}));

  const n = result.length;
  for (let i = 0; i < n - 1; ++i) {
    result[i].next = result[i + 1];
  }
  result[n - 1].next = result[0];

  return result;
}
