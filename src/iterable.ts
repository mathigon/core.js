// =============================================================================
// Core.ts | Iterable Array Functions
// (c) Mathigon
// =============================================================================


export function first<T>(set: Iterable<T>): T|undefined {
  return set[Symbol.iterator]().next().value;
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

export function* flatMap<S, T>(set: Iterable<T>, map: (x: T) => Iterable<S>) {
  for (const s of set) {
    for (const x of map(s)) {
      yield x;
    }
  }
}

export function* pairs<S, T>(a: Iterable<S>, b: Iterable<T>) {
  for (const i of a) {
    for (const j of b) {
      yield [i, j];
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


export class Itarray<T> implements Iterable<T> {
  private readonly values: Array<Iterable<T>>;

  constructor(...values: Array<Iterable<T>>) {
    this.values = values;
  }

  map<S>(fn: (t: T, i: number) => S) {
    const values = this.values;
    return new Itarray<S>((function* () {
      let i = 0;
      for (const row of values) {
        for (const v of row) {
          yield fn(v, i);
          i += 1;
        }
      }
    })());
  }

  every(fn: (t: T, i: number) => boolean) {
    let i = 0;
    for (const row of this.values) {
      for (const v of row) {
        if (!fn(v, i)) return false;
        i += 1;
      }
    }
    return true;
  }

  some(fn: (t: T, i: number) => boolean) {
    let i = 0;
    for (const row of this.values) {
      for (const v of row) {
        if (fn(v, i)) return true;
        i += 1;
      }
    }
    return false;
  }

  slice(from: number, to?: number) {
    const values = this.values;
    return new Itarray<T>((function* () {
      let i = 0;
      for (const row of values) {
        for (const v of row) {
          if (i < from || (to !== undefined && i > from + to)) continue;
          yield v;
          i += 1;
        }
      }
    })());
  }

  filter(fn: (t: T, i: number) => unknown) {
    const values = this.values;
    return new Itarray<T>((function* () {
      let i = 0;
      for (const row of values) {
        for (const v of row) {
          if (fn(v, i)) yield v;
          i += 1;
        }
      }
    })());
  }

  concat(newValues: Iterable<T>) {
    this.values.push(newValues);
  }

  [Symbol.iterator]() {
    const values = this.values;
    return (function* () {
      for (const row of values) {
        for (const v of row) {
          yield v;
        }
      }
    })();
  }

  static make<T>(fn: (i: number) => T, max?: number) {
    return new Itarray<T>((function* () {
      let i = 0;
      while (max === undefined || i < max) {
        yield fn(i);
        i += 1;
      }
    })());
  }
}
