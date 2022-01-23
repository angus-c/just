import flush from "./index";

// OK

flush([1, 2, null, 'hello', 'world']);
flush<(number | string | null)[]>([1, 2, null, 'hello', 'world']);
flush<[number, number, null, string, string]>([1, 2, null, 'hello', 'world']);
flush<[number, number, number[], string, string]>([1, 2, [1], 'hello', 'world']);
flush<(number | string | number[])[]>([1, 2, [1], 'hello', 'world']);
flush([]);
flush([1]);
flush<{
  hello: string,
  world: string,
  nothing: undefined,
  numeric: number
}>({
  hello: "world",
  world: "hello",
  nothing: undefined,
  numeric: 1,
});
flush<{
  [key: string]: string | number | undefined
}>({
  hello: "world",
  world: "hello",
  nothing: undefined,
  numeric: 1,
});
flush({
  hello: "world",
  world: "hello",
  numeric: 1,
  collection: [1, 2, 3],
});

// Not OK

// @ts-expect-error
flush()
// @ts-expect-error
flush("hello World")
// @ts-expect-error
flush(1)
// @ts-expect-error
flush(true)
// @ts-expect-error
flush(null)
// @ts-expect-error
flush(undefined)
// @ts-expect-error
flush(Symbol("hello"))
// @ts-expect-error
flush(BigInt("9007199254740991"))
// @ts-expect-error
flush<(number | null)[]>([1, 2, null, 'hello', 'world']);
// @ts-expect-error
flush<[number, number, null, string, number]>([1, 2, null, 'hello', 'world']);
// @ts-expect-error
flush<(number | string)[]>([1, 2, [1], 'hello', 'world']);
flush<{
  [key: string]: string | number
}>({
  hello: "world",
  world: "hello",
  // @ts-expect-error
  nothing: undefined,
  numeric: 1,
});
flush<{
  hello: string,
  world: string,
  numeric: number
}>({
  hello: "world",
  world: "hello",
  // @ts-expect-error
  nothing: undefined,
  numeric: 1,
});
flush<{
  hello: number,
  world: string,
  nothing: undefined,
  numeric: number
}>({
  // @ts-expect-error
  hello: "world",
  world: "hello",
  nothing: undefined,
  numeric: 1,
});
