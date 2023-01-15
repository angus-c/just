import merge from "./index";

// OK

// Single argument
merge({});
merge({ a: 1 });
merge([]);
merge(() => {});
merge(new Map());
merge(new Set());
merge<{ a: number; b: number; }>({ a: 1, b: 2 });

// Multiple arguments
merge({}, {});
merge({}, { a: 1 });
merge({}, []);
merge({}, () => {});
merge({}, new Map());
merge({}, new Set());
merge({}, { a: 1 }, { a: 2, b: 3 });
merge<{ a: number; b: number; }, { a: number; b: number; c: number; }>(
  { a: 4, b: 8 },
  { a: 6, b: 1, c: 8 }
);

// Not OK

// Single argument
// @ts-expect-error
merge();
// @ts-expect-error
merge(0);
// @ts-expect-error
merge("");
// @ts-expect-error
merge(false);
// @ts-expect-error
merge(null);
// @ts-expect-error
merge(undefined);
// @ts-expect-error
merge(Symbol());
// @ts-expect-error
merge<{ a: string; b: string; }>({ a: 1, b: 2 });

// Multiple arguments
// @ts-expect-error
merge({}, 0);
// @ts-expect-error
merge({}, "");
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
// @ts-expect-error
merge<{ a: string; b: string; }, { a: string; b: string; c: string; }>({ a: 4, b: 8 }, { a: 6, b: 1, c: 8 });
