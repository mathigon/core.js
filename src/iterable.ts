// =============================================================================
// Core.ts | Iterator Functions
// (c) Mathigon
// =============================================================================


export function first<T>(set: Iterable<T>): T|undefined {
  return set[Symbol.iterator]().next().value;
}

/** Iterator version of Array.concat(). */
export function* concat<T>(...sets: Array<Iterable<T>>): Iterable<T> {
  for (const set of sets) yield* set;
}

export function every<T>(set: Iterable<T>, callback: (v: T) => unknown): boolean {
  for (const s of set) {
    if (!callback(s)) return false;
  }
  return true;
}

export function some<T>(set: Iterable<T>, callback: (v: T) => unknown): boolean {
  for (const s of set) {
    if (callback(s)) return true;
  }
  return false;
}

/** Iterator version of Array.filter(). */
export function* filter<T>(set: Iterable<T>, test: (v: T, i: number) => unknown): Iterable<T> {
  let i = 0;
  for (const s of set) {
    if (test(s, i)) yield s;
    i += 1;
  }
}

/** Iterator version of Array.map(). */
export function* map<T, S>(set: Iterable<T>, fn: (v: T, i: number) => S): Iterable<S> {
  let i = 0;
  for (const s of set) {
    yield fn(s, i);
    i += 1;
  }
}

export function* flatMap<S, T>(set: Iterable<T>, map: (x: T) => Iterable<S>) {
  for (const s of set) {
    for (const x of map(s)) {
      yield x;
    }
  }
}

export function* pairs<S, T>(a: Iterable<S>, b: Iterable<T>): Iterable<[S, T]> {
  for (const i of a) {
    for (const j of b) {
      yield [i, j];
    }
  }
}

export function* listPairs<T>(list: T[]): Iterable<[T, T]> {
  const n = list.length;
  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      yield [list[i], list[j]];
    }
  }
}

/** Find the item in an iterable for which value() returns the smallest value. */
export function findMin<T>(items: Iterable<T>, value: (item: T) => number, max = Infinity, min?: number) {
  let best: T|undefined = undefined;
  let v = max;

  for (const item of items) {
    const v1 = value(item);
    if (v1 < v) {
      best = item;
      v = v1;
      if (min !== undefined && v < min) return best;
    }
  }

  return best;
}
