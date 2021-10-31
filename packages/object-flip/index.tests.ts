import flip from "./index";

// OK
flip({ a: 5 });
flip({ a: "x", b: "y", c: "z" }); // {x: 'a', y: 'b', z: 'c'}
flip({ a: 1, b: 2, c: 3 }); // {'1': 'a', '2': 'b', '3': 'c'}
flip({ a: false, b: true }); // {false: 'a', true: 'b'}

// Not OK
// @ts-expect-error
flip(5);
// @ts-expect-error
flip(true);
// @ts-expect-error
flip();
// @ts-expect-error
flip("{hi: 'bye'}");
// @ts-expect-error
flip(["a", "b", "c"]);
// @ts-expect-error
flip(new Set());
// @ts-expect-error
flip(new Map());
// @ts-expect-error
flip(() => {});
