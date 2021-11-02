import typeOf from "./index";

// OK
const obj: "object" = typeOf({}); // 'object'
const arr: "array" = typeOf([]); // 'array'
const func: "function" = typeOf(function () {}); // 'function'
const asyncFunc: "function" = typeOf(async function () {}); // 'function'
const regex: "regexp" = typeOf(/a/); // 'regexp'
const date: "date" = typeOf(new Date()); // 'date'
const undef: "undefined" = typeOf(undefined); // 'undefined'
const str: "string" = typeOf("a"); // 'string'
const num: "number" = typeOf(1); // 'number'
const big: "bigint" = typeOf(BigInt(132894839248)); // 'bigint'
const bool: "boolean" = typeOf(true); // 'boolean'
const map: "map" = typeOf(new Map()); // 'map'
const set: "set" = typeOf(new Set()); // 'set'
const sym: "symbol" = typeOf(Symbol("foo"));

// Not OK
// @ts-expect-error
typeOf();
// @ts-expect-error
typeOf([1, 2], [2, 3]);
