import filter from './index'

// OK
filter({a: 5}, (_key: string, _val: number) => true);
filter({a: 5, b: "c"}, (_key: string, _val: string|number) => true);
filter({a: 5, b: "c"}, (_key: 'a'|'b', _val: string|number) => true);
filter({a: 5, b: "c"}, (_key: 'a'|'b'|'c', _val: string|number) => true);


// Not OK
// @ts-expect-error
filter(5, (_key: string, _val: number) => "a");
// @ts-expect-error
filter(null, (_key: string, _val: number) => "a");
// @ts-expect-error
filter(true, (_key: string, _val: number) => "a");
// @ts-expect-error
filter({ a: 5 })
// @ts-expect-error
filter({ a: 5 }, (_key: string, _val: number) => true, 10);
// @ts-expect-error
filter(['a', 'b', 'c'], (_key: string, _val: number) => true);
// @ts-expect-error
filter(new Set(), (_key: string, _val: number) => true);
// @ts-expect-error
filter(new Map(), (_key: string, _val: number) => true);

