import sortBy = require('./index');

// OK
sortBy(['a', 'b', 'c']);
sortBy([1, 2, 3]);
sortBy([{name: 'claudio'}, {name: 'klaus'}]);
sortBy([{name: 'claudio'}, {name: 'klaus'}], 'name');

// NOT OK
// @ts-expect-error
sortBy();
// @ts-expect-error
sortBy({});
// @ts-expect-error
sortBy([1, 2, 3], 1);
// @ts-expect-error
sortBy([1, 2, 3], function () {});
