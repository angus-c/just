import merge from './index'

// OK

// Single argument
merge({});
merge({ a: 1 });
merge([]);
merge(() => {});
merge(new Map());
merge(new Set());

// Multiple arguments
merge({}, {});
merge({}, { a: 1 });
merge({}, []);
merge({}, () => {});
merge({}, new Map());
merge({}, new Set());
merge({}, { a: 1 }, { a: 2, b: 3 });

// Not OK

// Single argument
// @ts-expect-error
merge();
// @ts-expect-error
merge(0);
// @ts-expect-error
merge('');
// @ts-expect-error
merge(false);
// @ts-expect-error
merge(null);
// @ts-expect-error
merge(undefined);
// @ts-expect-error
merge(Symbol());

// Multiple arguments
// @ts-expect-error
merge({}, 0);
// @ts-expect-error
merge({}, '');
// @ts-expect-error
merge({}, false);
// @ts-expect-error
merge({}, null);
// @ts-expect-error
merge({}, undefined);
// @ts-expect-error
merge({}, Symbol());
// @ts-expect-error
merge({}, {}, null);
