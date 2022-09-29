// =============================================================================
// Core.js | Arrays Test
// (c) Mathigon
// =============================================================================


import tape from 'tape';
import {binaryIndexOf, binarySearch, BinarySearchType, tabulate2D} from '../src';


tape('tabulate', (t) => {
  t.deepEqual(tabulate2D(((x, y) => x + y), 2, 2), [[0, 1], [1, 2]]);
  t.end();
});

tape('binary search', (t) => {
  const data = [1, 2, 2, 4, 4, 5, 5, 6].map(val => ({item: {}, val}));

  t.equals(binarySearch(data, 0, BinarySearchType.first), -1);
  t.equals(binarySearch(data, 1, BinarySearchType.first), 0);
  t.equals(binarySearch(data, 4, BinarySearchType.first), 3);
  t.equals(binarySearch(data, 6, BinarySearchType.first), 7);
  t.equals(binarySearch(data, 7, BinarySearchType.first), -1);

  t.equals(binarySearch(data, 0, BinarySearchType.firstGreater), 0);
  t.equals(binarySearch(data, 1, BinarySearchType.firstGreater), 1);
  t.equals(binarySearch(data, 4, BinarySearchType.firstGreater), 5);
  t.equals(binarySearch(data, 6, BinarySearchType.firstGreater), -1);
  t.equals(binarySearch(data, 7, BinarySearchType.firstGreater), -1);

  t.equals(binaryIndexOf(data, {}, 0), -1);
  t.equals(binaryIndexOf(data, {}, 2), -1);
  t.equals(binaryIndexOf(data, data[2].item, data[2].val), 2);
  t.equals(binaryIndexOf(data, data[3].item, data[3].val), 3);
  t.equals(binaryIndexOf(data, data[6].item, data[6].val), 6);
  t.equals(binaryIndexOf(data, data[7].item, data[7].val), 7);

  t.end();
});
