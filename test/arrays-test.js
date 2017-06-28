// =============================================================================
// Core.js | Arrays Test
// (c) Mathigon
// =============================================================================



const tape = require('tape');
const core = require('../');

tape('tabulate', function(test) {
  test.deepEqual(core.tabulate(((x, y) => x + y), 2, 2), [[0, 1], [1, 2]]);
  test.end();
});
