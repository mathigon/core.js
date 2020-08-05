// =============================================================================
// Core.ts | Cache Functions
// (c) Mathigon
// =============================================================================


/** A basic LRU cache implementation. */
export class Cache<T> {
  private store = new Map<string, {val: T, i: number}>();
  private list: string[] = [];

  constructor(readonly maxSize: number) {}

  has(a: string) {
    return this.store.has(a);
  }

  get(a: string) {
    const item = this.store.get(a);
    if (item) this.touch(a, item);
    return item ? item.val : undefined;
  }

  set(a: string, b: T) {
    // Update an existing item, if it already exists.
    const item = this.store.get(a);
    if (item) {
      item.val = b;
      this.touch(a, item);
      return;
    }

    // Add a new item.
    this.list.push(a);
    this.store.set(a, {val: b, i: this.list.length});

    // Remove the last item if necessary.
    if (this.list.length > this.maxSize) {
      const a1 = this.list.shift();
      this.store.delete(a1!);
    }
  }

  getOrSet(a: string, callback: (a: string) => T) {
    const cached = this.get(a);
    if (cached) return cached;

    const calculated = callback(a);
    this.set(a, calculated);
    return calculated;
  }

  private touch(a: string, item: {val: T, i: number}) {
    this.list.splice(item.i, 1).push(a);
    item.i = this.list.length;
  }
}
