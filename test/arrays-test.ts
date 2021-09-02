// =============================================================================
// Core.js | Arrays Test
// (c) Mathigon
// =============================================================================


import tape from 'tape';
import {tabulate2D} from '../src';


tape('tabulate', (t) => {
  t.deepEqual(tabulate2D(((x, y) => x + y), 2, 2), [[0, 1], [1, 2]]);
  t.end();
});
