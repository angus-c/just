import index = require('./index');

// OK
index([ { a: 5 }, { a: 6 } ], 'a');
index([ { a: 5 }, { a: 6 }, null, undefined ], 'a');

// Not OK
// @ts-expect-error
index([ { a: 5 }, { a: 6 } ], 'b');
// @ts-expect-error
index([ { a: 5 }, { a: 6 } ], (o: number) => o.a);
// @ts-expect-error
index([1, 2, 3], 'a');
// @ts-expect-error
index({ a: 6 }, 'a');
