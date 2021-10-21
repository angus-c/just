import index from './index'

// OK
index([ { a: 5 }, { a: 6 } ], 'a');
index([ { a: 5 }, { a: 6 }, null, undefined ], 'a');
index([ { a: 5 }, { a: 6 } ], 'b');
index([1, 2, 3], 'a');

// Not OK
// @ts-expect-error
index([ { a: 5 }, { a: 6 } ], (o) => o.a);
// @ts-expect-error
index({ a: 6 }, 'a');
