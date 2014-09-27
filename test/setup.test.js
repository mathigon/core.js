require('../dist/core.js');

exports.noop = function(test) {
    M.noop();
    test.done();
};

exports.run = function(test) {
    test.equal(M.run(1, [], []), 1);
    test.equal(M.run(false, [], []), false);
    test.deepEqual(M.run({}, [], []), {});
    test.equal(M.run(function(x, y) { return this.t * x * y; }, [2, 3], {t: 5}), 30);
    test.done();
};

exports.isOneOf = function(test) {
    test.ok(!M.isOneOf('a'));
    test.ok(!M.isOneOf('a', 'b'));
    test.ok(!M.isOneOf(1, true));
    test.ok(M.isOneOf('a', 'b', 'c', 'a'));
    test.ok(M.isOneOf(false, 'a', 'b', false));
    test.done();
};
