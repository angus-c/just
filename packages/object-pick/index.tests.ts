import pick from './index'

const a = "a";
const b = "b";
const c = "c";
const obj = { a, b };

// OK
pick(obj, []); // $ExpectType Pick<{ a: string; b: string; }, never>
pick(obj, [a]); // $ExpectType Pick<{ a: string; b: string; }, "a">
pick(obj, [a, a]); // $ExpectType Pick<{ a: string; b: string; }, "a">
pick(obj, [a, b]); // $ExpectType Pick<{ a: string; b: string; }, "a" | "b">

pick(obj, a); // $ExpectType Pick<{ a: string; b: string; }, "a">
pick(obj, a, a); // $ExpectType Pick<{ a: string; b: string; }, "a">
pick(obj, a, b); // $ExpectType Pick<{ a: string; b: string; }, "a" | "b">


// Not OK
// @ts-expect-error
pick(obj, [a, b, c]);
// @ts-expect-error
pick(obj, a, b, c);
// @ts-expect-error
pick();
// @ts-expect-error
pick(obj);
// @ts-expect-error
pick(obj, 0);
// @ts-expect-error
pick(obj, false);
// @ts-expect-error
pick(obj);
// @ts-expect-error
pick(obj);
// @ts-expect-error
pick(obj, {});
// @ts-expect-error
pick(obj, () => {});
