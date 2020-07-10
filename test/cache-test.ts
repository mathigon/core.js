// =============================================================================
// Core.js | Cache Test
// (c) Mathigon
// =============================================================================


import * as tape from 'tape';
import {Cache} from '../src/cache';


tape('cache', (test) => {
  const cache = new Cache<number>(3);

  // Get an undefined item.
  test.equal(cache.get('a'), undefined);

  // Set a new item and return it.
  cache.set('a', 2);
  test.equal(cache.get('a'), 2);

  // Update an existing item and return it.
  cache.set('a', 2);
  test.equal(cache.get('a'), 2);

  cache.set('b', 2);
  cache.set('c', 3);
  cache.set('d', 4);

  // Return an item that has been removed.
  test.equal(cache.get('a'), undefined);

  test.end();
});
