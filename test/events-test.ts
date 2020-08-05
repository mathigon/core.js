// =============================================================================
// Core.js | Arrays Test
// (c) Mathigon
// =============================================================================


import * as tape from 'tape';
import {EventTarget} from '../src/events';


tape('repeat events', (t) => {
  const target = new EventTarget();

  let count = 0;
  target.on('increment', () => count++);

  target.trigger('increment');
  target.trigger('increment');
  target.trigger('increment');

  setTimeout(() => {
    t.equal(count, 3);
    t.end();
  }, 100);
});

tape('one-time events', (t) => {
  const target = new EventTarget();

  let count = 0;
  target.one('increment', () => count++);

  target.trigger('increment');
  target.trigger('increment');
  target.trigger('increment');

  setTimeout(() => {
    t.equal(count, 1);
    t.end();
  }, 100);
});
