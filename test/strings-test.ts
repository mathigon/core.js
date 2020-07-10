// =============================================================================
// Core.js | Arrays Test
// (c) Mathigon
// =============================================================================


import * as tape from 'tape';
import {stringDistance} from '../src/strings';


tape('stringDistance', (test) => {
  test.equal(stringDistance('abc', 'abc'), 0);

  test.equal(stringDistance('abcd', 'abc'), 1);
  test.equal(stringDistance('abdc', 'abc'), 1);
  test.equal(stringDistance('dabc', 'abc'), 1);

  test.equal(stringDistance('abc', 'def'), 3);

  test.equal(stringDistance('kitten', 'sitting'), 3);
  test.equal(stringDistance('sitting', 'kitten'), 3);

  test.equal(stringDistance('abc', 'abcdef', true), 0);
  test.equal(stringDistance('abc', 'abdcef', true), 1);

  test.end();
});
