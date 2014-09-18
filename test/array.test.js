require('../dist/tesla.js');

exports.tabulate = function(test) {
    test.deepEqual(M.tabulate(function(a){ return a; }, 3), [0, 1, 2], '1D array');
    test.deepEqual(M.tabulate(function(a, b){ return a+b; }, 2, 2), [[0, 1], [1, 2]], '2D array');
    test.equal(M.tabulate(function(){ return 1; }, 3, 3, 3, 3)[0][0][0][0], 1, '4D array');
    test.done();
};

exports.list = function(test) {
    test.deepEqual(M.list(5), [0, 1, 2, 3, 4]);
    test.deepEqual(M.list(), []);
    test.deepEqual(M.list(3, 6), [3, 4, 5, 6]);
    test.deepEqual(M.list(6, 3), [6, 5, 4, 3]);
    test.deepEqual(M.list(-3, -6), [-3, -4, -5, -6]);
    test.deepEqual(M.list(-6, -3), [-6, -5, -4, -3]);
    test.deepEqual(M.list(-3), [0, -1, -2]);
    test.deepEqual(M.list(-2, 2), [-2, -1, 0, 1, 2]);
    test.deepEqual(M.list(2, -2), [2, 1, 0, -1, -2]);
    test.done();
};

exports.map = function(test) {
    var myMax = function() { return Math.max.apply(Math, arguments); };
    test.deepEqual(M.map(myMax, [3, 2, 1], [2,3, 4], [2, 5, 2]), [3, 5, 4]);
    // TODO More tests
    test.done();
};

exports.each = function(test) {
    // TODO More tests
    test.done();
};

exports.total = function(test) {
    // TODO More tests
    test.done();
};

exports.first = function(test) {
    // TODO More tests
    test.done();
};

exports.last = function(test) {
    // TODO More tests
    test.done();
};

exports.min = function(test) {
    // TODO More tests
    test.done();
};

exports.max = function(test) {
    // TODO More tests
    test.done();
};

exports.range = function(test) {
    // TODO More tests
    test.done();
};

exports.clean = function(test) {
    // TODO More tests
    test.done();
};

exports.unique = function(test) {
    // TODO More tests
    test.done();
};

exports.without = function(test) {
    // TODO More tests
    test.done();
};

exports.chunk = function(test) {
    // TODO More tests
    test.done();
};
