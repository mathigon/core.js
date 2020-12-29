// =============================================================================
// Core.js | Iterable Arrays Test
// (c) Mathigon
// =============================================================================


import * as tape from 'tape';
import {Itarray} from '../src/iterable';


tape('itarray-basic', (t) => {
  const it = new Itarray([1, 2], [3, 4], new Set([5, 6]));
  t.deepEqual(Array.from(it), [1, 2, 3, 4, 5, 6]);
  t.end();
});

tape('itarray-filter', (t) => {
  const it = new Itarray([1, 2], [3, 4], [5, 6]);
  t.deepEqual(Array.from(it.filter(v => v % 2)), [1, 3, 5]);
  t.end();
});

tape('itarray-map', (t) => {
  const it = new Itarray([1, 2], [3, 4], [5, 6]);
  t.deepEqual(Array.from(it.map(v => v * 10)), [10, 20, 30, 40, 50, 60]);
  t.end();
});
