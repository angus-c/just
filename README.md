## Just

A library of **zero-dependency** npm modules that do just one thing.
A guilt-free alternative to those bulkier utility libraries. Ideal for PWA development or whenever bytes are precious.

![Build status](https://github.com/angus-c/just/actions/workflows/node.js.yml/badge.svg)

**[Jump To API](#the-modules-package)**

We welcome contributions. Please follow our [contribution guidelines](https://github.com/angus-c/just/blob/master/CONTRIBUTING.md).

## Try :icecream:

A [REPL](https://anguscroll.com/just) for every utility (powered by [RunKit](https://runkit.com))

<a href="https://anguscroll.com/just"><img src="images/repl.png" width="500"/></a>

## Read :books:

- [TRADEOFFS.md](https://github.com/angus-c/just/blob/master/TRADEOFFS.md) -- When to use Just (and when not to).
- [The Zen of Dependency-Free](https://medium.com/@angustweets/just-a12d54221f65#.ljib0mfr5) -- Why I wrote Just.

## ES and CJS modules available for every utility <img src="images/esm.png" width="22"/> <img src="images/node.jpeg" width="18"/>

All packages support ES module or Common JS syntax without requiring transpilation
```
// esm (node / bundler)
import clone from 'just-clone'; 

// esm (native browser code)
import clone from './node_modules/just-clone/index.mjs'; 

// cjs
const clone = require('just-clone'); 
```
## TypeScript <img src="images/ts.png" width="18"/>

We're in the process of adding TypeScript definitions and tests to every Just utility. You're welcome to help us get there!
[Here's](https://github.com/angus-c/just/pull/247/files) an example PR.

You can verify new TypeScript definitions by running `yarn test-types` (This also gets run as part of the `yarn test` script)

## Browser Support :computer:

Data based on [available saucelabs test browsers](https://github.com/angus-c/just/tree/sauce). It's likely _Just_ is also fully supported by some older versions not verifiable via saucelabs.

| Chrome | Safari | Firefox | Edge | Node | Mobile Safari | Android       |
| ------ | ------ | ------- | ---- | ---- | ------------- | ------------- |
| yes    | yes    | yes     | 12   | 6+   | iOS 8+        | Android OS 5+ |

## The Modules :package:

- [Collections](#collections) {}[]
  - [just-diff](#just-diff)
  - [just-diff-apply](#just-diff-apply)
  - [just-compare](#just-compare)
  - [just-clone](#just-clone)
  - [just-pluck-it](#just-pluck-it)
  - [just-flush](#just-flush)
- [Objects](#objects) {}
  - [just-extend](#just-extend)
  - [just-merge](#just-merge)
  - [just-values](#just-values)
  - [just-entries](#just-entries)
  - [just-pick](#just-pick)
  - [just-omit](#just-omit)
  - [just-filter-object](#just-filter-object)
  - [just-map-object](#just-map-object)
  - [just-map-values](#just-map-values)
  - [just-map-keys](#just-map-keys)
  - [just-deep-map-values](#just-deep-map-values)
  - [just-reduce-object](#just-reduce-object)
  - [just-is-empty](#just-is-empty)
  - [just-is-circular](#just-is-circular)
  - [just-is-primitive](#just-is-primitive)
  - [just-safe-get](#just-safe-get)
  - [just-safe-set](#just-safe-set)
  - [just-typeof](#just-typeof)
  - [just-flip-object](#just-flip-object)
  - [just-has](#just-has)
- [Arrays](#arrays) []
  - [just-cartesian-product](#just-cartesian-product)
  - [just-unique](#just-unique)
  - [just-flatten-it](#just-flatten-it)
  - [just-index](#just-index)
  - [just-insert](#just-insert)
  - [just-intersect](#just-intersect)
  - [just-compact](#just-compact)
  - [just-last](#just-last)
  - [just-tail](#just-tail)
  - [just-random](#just-random)
  - [just-shuffle](#just-shuffle)
  - [just-split](#just-split)
  - [just-split-at](#just-split-at)
  - [just-sort-by](#just-sort-by)
  - [just-partition](#just-partition)
  - [just-permutations](#just-permutations)
  - [just-range](#just-range)
  - [just-remove](#just-remove)
  - [just-union](#just-union)
  - [just-zip-it](#just-zip-it)
  - [just-group-by](#just-group-by)
- [Statistics](#stats) Σ
  - [just-mean](#just-mean)
  - [just-median](#just-median)
  - [just-mode](#just-mode)
  - [just-percentile](#just-percentile)
  - [just-variance](#just-variance)
  - [just-standard-deviation](#just-standard-deviation)
  - [just-skewness](#just-skewness)
- [Strings](#strings) ""
  - [just-template](#just-template)
  - [just-truncate](#just-truncate)
  - [just-prune](#just-prune)
  - [just-squash](#just-squash)
  - [just-left-pad](#just-left-pad)
  - [just-right-pad](#just-right-pad)
  - [just-camel-case](#just-camel-case)
  - [just-kebab-case](#just-kebab-case)
  - [just-snake-case](#just-snake-case)
  - [just-pascal-case](#just-pascal-case)
  - [just-capitalize](#just-capitalize)
  - [just-replace-all](#just-replace-all)
- [Numbers](#numbers) +-
  - [just-clamp](#just-clamp)
  - [just-is-prime](#just-is-prime)
  - [just-modulo](#just-modulo)
- [Functions](#functions) =>
  - [just-compose](#just-compose)
  - [just-curry-it](#just-curry-it)
  - [just-demethodize](#just-demethodize)
  - [just-flip](#just-flip)
  - [just-partial-it](#just-partial-it)
  - [just-debounce-it](#just-debounce-it)
  - [just-memoize](#just-memoize)
  - [just-memoize-last](#just-memoize-last)
  - [just-random](#just-random)
  - [just-throttle](#just-throttle)
  - [just-once](#just-once)

### Collections

### [just-diff](https://www.npmjs.com/package/just-diff)
[source](https://github.com/angus-c/just/tree/master/packages/collection-diff/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-diff)

```shell
npm install just-diff
```
```shell
yarn add just-diff
```

Return an object representing the difference between two other objects
Pass converter to format as http://jsonpatch.com

```js
import {diff} from 'just-diff';

const obj1 = {a: 4, b: 5};
const obj2 = {a: 3, b: 5};
const obj3 = {a: 4, c: 5};

diff(obj1, obj2);
[
  { "op": "replace", "path": ['a'], "value": 3 }
]

diff(obj2, obj3);
[
  { "op": "remove", "path": ['b'] },
  { "op": "replace", "path": ['a'], "value": 4 }
  { "op": "add", "path": ['c'], "value": 5 }
]

// using converter to generate jsPatch standard paths
import {diff, jsonPatchPathConverter} from 'just-diff'
diff(obj1, obj2, jsonPatchPathConverter);
[
  { "op": "replace", "path": '/a', "value": 3 }
]

diff(obj2, obj3, jsonPatchPathConverter);
[
  { "op": "remove", "path": '/b' },
  { "op": "replace", "path": '/a', "value": 4 }
  { "op": "add", "path": '/c', "value": 5 }
]

// arrays
const obj4 = {a: 4, b: [1, 2, 3]};
const obj5 = {a: 3, b: [1, 2, 4]};
const obj6 = {a: 3, b: [1, 2, 4, 5]};

diff(obj4, obj5);
[
  { "op": "replace", "path": ['a'], "value": 3 }
  { "op": "replace", "path": ['b', 2], "value": 4 }
]

diff(obj5, obj6);
[
  { "op": "add", "path": ['b', 3], "value": 5 }
]

// nested paths
const obj7 = {a: 4, b: {c: 3}};
const obj8 = {a: 4, b: {c: 4}};
const obj9 = {a: 5, b: {d: 4}};

diff(obj7, obj8);
[
  { "op": "replace", "path": ['b', 'c'], "value": 4 }
]

diff(obj8, obj9);
[
  { "op": "replace", "path": ['a'], "value": 5 }
  { "op": "remove", "path": ['b', 'c']}
  { "op": "add", "path": ['b', 'd'], "value": 4 }
]
```

### [just-diff-apply](https://www.npmjs.com/package/just-diff-apply)
[source](https://github.com/angus-c/just/tree/master/packages/collection-diff-apply/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-diff-apply)

```shell
npm install just-diff-apply
```
```shell
yarn add just-diff-apply
```

Apply a diff object to an object. Pass converter to apply a http://jsonpatch.com standard patch

```js
  import diffApply from 'just-diff-apply';

  const obj1 = {a: 3, b: 5};
  diffApply(obj1,
    [
      { "op": "remove", "path": ['b'] },
      { "op": "replace", "path": ['a'], "value": 4 },
      { "op": "add", "path": ['c'], "value": 5 }
    ]
  );
  obj1; // {a: 4, c: 5}

  // using converter to apply jsPatch standard paths
  // see http://jsonpatch.com
  import {diffApply, jsonPatchPathConverter} from 'just-diff-apply'
  const obj2 = {a: 3, b: 5};
  diffApply(obj2, [
    { "op": "remove", "path": '/b' },
    { "op": "replace", "path": '/a', "value": 4 }
    { "op": "add", "path": '/c', "value": 5 }
  ], jsonPatchPathConverter);
  obj2; // {a: 4, c: 5}

  // arrays (array key can be string or numeric)
  const obj3 = {a: 4, b: [1, 2, 3]};
  diffApply(obj3, [
    { "op": "replace", "path": ['a'], "value": 3 }
    { "op": "replace", "path": ['b', 2], "value": 4 }
    { "op": "add", "path": ['b', 3], "value": 9 }
  ]);
  obj3; // {a: 3, b: [1, 2, 4, 9]}

  // nested paths
  const obj4 = {a: 4, b: {c: 3}};
  diffApply(obj4, [
    { "op": "replace", "path": ['a'], "value": 5 }
    { "op": "remove", "path": ['b', 'c']}
    { "op": "add", "path": ['b', 'd'], "value": 4 }
  ]);
  obj4; // {a: 5, b: {d: 4}}
```

### [just-compare](https://www.npmjs.com/package/just-compare)
[source](https://github.com/angus-c/just/tree/master/packages/collection-compare/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-compare)

```shell
npm install just-compare
```
```shell
yarn add just-compare
```

Compare two collections

```js
import compare from 'just-compare';

// primitives: value1 === value2
// functions: value1.toString == value2.toString
// arrays: if length, sequence and values of properties are identical
// objects: if length, names and values of properties are identical
compare([1, [2, 3]], [1, [2, 3]]); // true
compare([1, [2, 3], 4], [1, [2, 3]]); // false
compare({a: 2, b: 3}, {a: 2, b: 3}); // true
compare({a: 2, b: 3}, {b: 3, a: 2}); // true
compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
compare([1, [2, {a: 4}], 4], [1, [2, {a: 4}]]); // false
compare([1, [2, {a: 4}], 4], [1, [2, {a: 4}], 4]); // true
compare(NaN, NaN); // true
```

### [just-clone](https://www.npmjs.com/package/just-clone)
[source](https://github.com/angus-c/just/tree/master/packages/collection-clone/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-clone)

```shell
npm install just-clone
```
```shell
yarn add just-clone
```

Deep copies objects and arrays

```js
// Deep copies objects and arrays, doesn't clone functions

import clone from 'just-clone';

var arr = [1, 2, 3];
var subObj = { aa: 1 };
var obj = { a: 3, b: 5, c: arr, d: subObj };
var objClone = clone(obj);
arr.push(4);
objClone.d.bb = 2;
obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}
objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}
```

### [just-pluck-it](https://www.npmjs.com/package/just-pluck-it)
[source](https://github.com/angus-c/just/tree/master/packages/collection-pluck/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-pluck-it)

```shell
npm install just-pluck-it
```
```shell
yarn add just-pluck-it
```

Pluck a property from each member of a collection

```js
import pluck from 'just-pluck-it';

pluck([{a:1, b:2}, {a:4, b:3}, {a:2, b:5}], 'a'); // [1, 4, 2]
pluck({x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}}, 'a'); // {x: 1, y: 4, z: 2}
```

### [just-flush](https://www.npmjs.com/package/just-flush)
[source](https://github.com/angus-c/just/tree/master/packages/collection-flush/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-flush)

```shell
npm install just-flush
```
```shell
yarn add just-flush
```

Returns a copy of an array or object with null/undefined members removed

```js
import flush from 'just-flush';

flush([1, undefined, 2, null, 3, NaN, 0]); // [1, 2, 3, NaN, 0]
flush([true, null, false, true, [null], undefined]); // [true, false, true, [null]]
flush({a: 2, b: null, c: 4, d: undefined}); // {a: 2, c: 4}
flush('something'); // undefined
flush(); // undefined
```

### Objects

### [just-extend](https://www.npmjs.com/package/just-extend)
[source](https://github.com/angus-c/just/tree/master/packages/object-extend/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-extend)

```shell
npm install just-extend
```
```shell
yarn add just-extend
```

Extend an object

```js
import extend from 'just-extend';

var obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 4, b: 5, c: 8}

var obj = {a: 3, b: 5};
extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 3, b: 5}

var arr = [1, 2, 3];
var obj = {a: 3, b: 5};
extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push(4);
obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

var arr = [1, 2, 3];
var obj = {a: 3, b: 5};
extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push(4);
obj; // {a: 3, b: 5, c: [1, 2, 3]}

extend({a: 4, b: 5}); // {a: 4, b: 5}
extend({a: 4, b: 5}, 3); {a: 4, b: 5}
extend({a: 4, b: 5}, true); {a: 4, b: 5}
extend('hello', {a: 4, b: 5}); // throws
extend(3, {a: 4, b: 5}); // throws
```

### [just-merge](https://www.npmjs.com/package/just-merge)
[source](https://github.com/angus-c/just/tree/master/packages/object-merge/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-merge)

```shell
npm install just-merge
```
```shell
yarn add just-merge
```

Shallow assign. Like just-extend but without deep copy option.

```js
import merge from 'just-merge';

let obj = {a: 3, b: 5};
merge(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 4, b: 5, c: 8}

let obj = {a: 3, b: 5};
merge({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 3, b: 5}

let arr = [1, 2, 3];
let obj = {a: 3, b: 5};
merge(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push[4];
obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

merge({a: 4, b: 5}); // {a: 4, b: 5}
merge(3, {a: 4, b: 5}); // throws
merge({a: 4, b: 5}, 3); // throws
merge({a: 4, b: 5}, {b: 4, c: 5}, 'c'); // throws
```

### [just-values](https://www.npmjs.com/package/just-values)
[source](https://github.com/angus-c/just/tree/master/packages/object-values/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-values)

```shell
npm install just-values
```
```shell
yarn add just-values
```

Return property values as an array

```js
const values = require('just-values');

values({a: 4, c: 8}); // [4, 8]
values({a: {aa: 2}, b: {bb: 4}}); // [{aa: 2}, {bb: 4}]
values({}); // []
values([1, 2, 3]); // [1, 2, 3]
values(function(a, b) {return a + b;}); // []
values(new String('hello')); // ['h', 'e', 'l', 'l', 'o']
values(1); // throws exception
values(true); // throws exception
values(undefined); // throws exception
values(null); // throws exception
```

### [just-entries](https://www.npmjs.com/package/just-entries)
[source](https://github.com/angus-c/just/tree/master/packages/object-entries/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-entries)

```shell
npm install just-entries
```
```shell
yarn add just-entries
```

Return object entries as an array of [key, value] pairs

```js
import entries from 'just-entries';

// Object:
entries({c: 8, a: 4}); // [['c', 8], ['a', 4]]
entries({b: {bb: 4}, a: {aa: 2}}); // [['b', {bb: 4}], ['a', {aa: 2}]]
entries({}); // []

// Array:
entries([{c: 8}, {a: 4}]); // [[0, {c: 8}], [1, {a: 4}]]
entries(['À', 'mauvais', 'ouvrier', 'point', 'de', 'bon', 'outil'])
// [[0, 'À'], [1, 'mauvais'] ... [6, 'outil']]
entries([]); // []
```

### [just-pick](https://www.npmjs.com/package/just-pick)
[source](https://github.com/angus-c/just/tree/master/packages/object-pick/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-pick)

```shell
npm install just-pick
```
```shell
yarn add just-pick
```

Copy an object but with only the specified keys

```js
import pick from 'just-pick';

var obj = { a: 3, b: 5, c: 9 };
pick(obj, ['a', 'c']); // {a: 3, c: 9}
pick(obj, 'a', 'c'); // {a: 3, c: 9}
pick(obj, ['a', 'b', 'd']); // {a: 3, b: 5}
pick(obj, ['a', 'a']); // {a: 3}
```

### [just-omit](https://www.npmjs.com/package/just-omit)
[source](https://github.com/angus-c/just/tree/master/packages/object-omit/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-omit)

```shell
npm install just-omit
```
```shell
yarn add just-omit
```

Copy an object but omit the specified keys

```js
import omit from 'just-omit';

var obj = {a: 3, b: 5, c: 9};
omit(obj, ['a', 'c']); // {b: 5}
omit(obj, 'a', 'c'); // {b: 5}
omit(obj, ['a', 'b', 'd']); // {c: 9}
omit(obj, ['a', 'a']); // {b: 5, c: 9}
```

### [just-is-empty](https://www.npmjs.com/package/just-is-empty)
[source](https://github.com/angus-c/just/tree/master/packages/object-is-empty/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-is-empty)

```shell
npm install just-is-empty
```
```shell
yarn add just-is-empty
```

Return true if object has no enumerable key values

```js
import isEmpty from 'just-is-empty';
 isEmpty({a: 3, b: 5}) // false
 isEmpty([1, 2]) // false
 isEmpty(new Set([1, 2, 2])) // false
 isEmpty((new Map()).set('a', 2)) // false
 isEmpty({}) // true
 isEmpty([]) // true
 isEmpty(new Set()) // true
 isEmpty(new Map()) // true
 isEmpty('abc') // false
 isEmpty('') // true
 isEmpty(0) // true
 isEmpty(1) // true
 isEmpty(true) // true
 isEmpty(Symbol('abc')); // true
 isEmpty(//); // true
 isEmpty(new String('abc')); // false
 isEmpty(new String('')); // true
 isEmpty(new Boolean(true)); // true
 isEmpty(null) // true
 isEmpty(undefined) // true
```

### [just-is-circular](https://www.npmjs.com/package/just-is-circular)
[source](https://github.com/angus-c/just/tree/master/packages/object-is-circular/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-is-circular)

```shell
npm install just-is-circular
```
```shell
yarn add just-is-circular
```

NOTE: not supported in IE or microsoft edge

```js
import isCircular from 'just-is-circular';
const a = {};
a.b = a;
isCircular(a); // true

const a = {};
a.b = {
  c: a
};
isCircular(a); // true

const a = {};
a.b = {
  c: 4
};
isCircular(a); // false

const a = [];
a.push(a);
isCircular(a); // true

isCircular({}); // false
isCircular('hi'); // false
isCircular(undefined); // false
```

### [just-is-primitive](https://www.npmjs.com/package/just-is-primitive)
[source](https://github.com/angus-c/just/tree/master/packages/object-is-primitive/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-is-primitive)

```shell
npm install just-is-primitive
```
```shell
yarn add just-is-primitive
```

Determine if a value is a primitive value

```js
import isPrimitive from 'just-is-primitive';
isPrimitive('hi') // true
isPrimitive(3) // true
isPrimitive(true) // true
isPrimitive(false) // true
isPrimitive(null) // true
isPrimitive(undefined) // true
isPrimitive(Symbol()) // true
isPrimitive({}) // false
isPrimitive([]) // false
isPrimitive(function() {}) // false
isPrimitive(new Date()) // false
isPrimitive(/a/) // false
```

### [just-filter-object](https://www.npmjs.com/package/just-filter-object)
[source](https://github.com/angus-c/just/tree/master/packages/object-filter/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-filter-object)

```shell
npm install just-filter-object
```
```shell
yarn add just-filter-object
```

Filter an object

```js
import filter from 'just-filter';

// returns a new object containing those original properties for which the predicate returns truthy
filter({a: 3, b: 5, c: 9}, (key, value) => value < 6); // {a: 3, b: 5}
filter({a1: 3, b1: 5, a2: 9}, (key, value) => key[0] == 'a'); // {a1: 3, a2: 9}
filter({a: 3, b: 5, c: null}, (key, value) => value); // {a: 3, b: 5}
```

### [just-map-object](https://www.npmjs.com/package/just-map-object)
[source](https://github.com/angus-c/just/tree/master/packages/object-map/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-map-object)

```shell
npm install just-map-object
```
```shell
yarn add just-map-object
```

Map an object, passing key and value to predicates

```js
import map from 'just-map-object';

// DEPRECATED: use just-map-values
map({a: 3, b: 5, c: 9}, (key, value) => value + 1); // {a: 4, b: 6, c: 10}
map({a: 3, b: 5, c: 9}, (key, value) => key); // {a: 'a', b: 'b', c: 'c'}
map({a: 3, b: 5, c: 9}, (key, value) => key + value); // {a: 'a3', b: 'b5', c: 'c9'}```
```

### [just-map-values](https://www.npmjs.com/package/just-map-values)
[source](https://github.com/angus-c/just/tree/master/packages/object-map-values/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-map-values)

```shell
npm install just-map-values
```
```shell
yarn add just-map-values
```

Map an object, predicate updates values, receives (value, key, object)

```js
import map from 'just-map-values';

// predicate updates values, receives (value, key, obj)
map({a: 3, b: 5, c: 9}, (value) => value + 1); // {a: 4, b: 6, c: 10}
map({a: 3, b: 5, c: 9}, (value, key) => value + key); // {a: 3a, b: 5b, c: 9c}
map({a: 3, b: 5, c: 9}, (value, key, obj) => obj.b); // {a: 5, b: 5, c: 5}
```

### [just-map-keys](https://www.npmjs.com/package/just-map-keys)
[source](https://github.com/angus-c/just/tree/master/packages/object-map-keys/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-map-keys)

```shell
npm install just-map-keys
```
```shell
yarn add just-map-keys
```

Map an object, predicate updates keys, receives (value, key, object)

```js
import map from 'just-map-keys';

// predicate updates keys, receives (value, key, object)
map({a: 'cow', b: 'sheep', c: 'pig'}, (value) => value);
  // {cow: 'cow', sheep: 'sheep', pig: 'pig'}
map([4, 5, 6], (value, key) => key + 1); // {1: 4, 2: 5, 3: 6}
map({a: 3, b: 5, c: 9}, (value, key) => key + value); // {a3: 3, b5: 5, c9: 9}
map({a: 3, b: 5, c: 9}, (value, key, obj) => obj.b + value + key);
  // {'8a': 3, '10b': 5, '14c': 9}
```

### [just-deep-map-values](https://www.npmjs.com/package/just-deep-map-values)
[source](https://github.com/angus-c/just/tree/master/packages/object-deep-map-values/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-deep-map-values)

```shell
npm install just-deep-map-values
```
```shell
yarn add just-deep-map-values
```

Returns an object with values at all depths mapped according to the provided function

```js
import deepMapValues from 'just-deep-map-values';

const squareFn = (number) => number * number;
deepMapValues({ a: 1, b: { c: 2, d: { e: 3 } } }, squareFn); // => { a: 1, b: { c: 4, d: { e: 9 } } }
```

### [just-reduce-object](https://www.npmjs.com/package/just-reduce-object)
[source](https://github.com/angus-c/just/tree/master/packages/object-reduce/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-reduce-object)

```shell
npm install just-reduce-object
```
```shell
yarn add just-reduce-object
```

Reduce an object

```js
import reduce from 'just-reduce-object';

// applies a function against an accumulator and each key-value pairs of the object
// to reduce it to a single value
reduce({a: 3, b: 5, c: 9}, (acc, key, value, index, keys) => {
  acc[value] = key;
  return acc;
}, {}); // {3: 'a', 5: 'b', 9: 'c'}

reduce({a: 3, b: 5, c: 9}, (acc, key, value, index, keys) => {
  acc += value;
  return acc;
}); // 17
```

### [just-safe-get](https://www.npmjs.com/package/just-safe-get)
[source](https://github.com/angus-c/just/tree/master/packages/object-safe-get/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-safe-get)

```shell
npm install just-safe-get
```
```shell
yarn add just-safe-get
```

Get value at property, don't throw if parent is undefined

```js
import get from 'just-safe-get';

const obj = {a: {aa: {aaa: 2}}, b: 4};

get(obj, 'a.aa.aaa'); // 2
get(obj, ['a', 'aa', 'aaa']); // 2

get(obj, 'b.bb.bbb'); // undefined
get(obj, ['b', 'bb', 'bbb']); // undefined

get(obj.a, 'aa.aaa'); // 2
get(obj.a, ['aa', 'aaa']); // 2

get(obj.b, 'bb.bbb'); // undefined
get(obj.b, ['bb', 'bbb']); // undefined

get(obj.b, 'bb.bbb', 5); // 5
get(obj.b, ['bb', 'bbb'], true); // true

get(null, 'a'); // undefined
get(undefined, ['a']); // undefined

get(null, 'a', 42); // 42
get(undefined, ['a'], 42); // 42

const obj = {a: {}};
const sym = Symbol();
obj.a[sym] = 4;
get(obj.a, sym); // 4
```

### [just-safe-set](https://www.npmjs.com/package/just-safe-set)
[source](https://github.com/angus-c/just/tree/master/packages/object-safe-set/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-safe-set)

```shell
npm install just-safe-set
```
```shell
yarn add just-safe-set
```

Set value at property, create intermediate properties if necessary

```js
import set from 'just-safe-set';

const obj1 = {};
set(obj1, 'a.aa.aaa', 4); // true
obj1; // {a: {aa: {aaa: 4}}}

const obj2 = {};
set(obj2, ['a', 'aa', 'aaa'], 4); // true
obj2; // {a: {aa: {aaa: 4}}}

const obj3 = {a: {aa: {aaa: 2}}};
set(obj3, 'a.aa.aaa', 3); // true
obj3; // {a: {aa: {aaa: 3}}}

// don't clobber existing
const obj4 = {a: {aa: {aaa: 2}}};
set(obj4, 'a.aa', {bbb: 7}); // false

const obj5 = {a: {}};
const sym = Symbol();
set(obj5.a, sym, 7); // true
obj5; // {a: {Symbol(): 7}}
```

### [just-typeof](https://www.npmjs.com/package/just-typeof)
[source](https://github.com/angus-c/just/tree/master/packages/object-typeof/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-typeof)

```shell
npm install just-typeof
```
```shell
yarn add just-typeof
```

Type inferer

```js
import typeOf from 'just-typeof';

typeOf({}); // 'object'
typeOf([]); // 'array'
typeOf(function() {}); // 'function'
typeOf(/a/); // 'regexp'
typeOf(new Date()); // 'date'
typeOf(null); // 'null'
typeOf(undefined); // 'undefined'
typeOf('a'); // 'string'
typeOf(1); // 'number'
typeOf(true); // 'boolean'
```

### [just-flip-object](https://www.npmjs.com/package/just-flip-object)
[source](https://github.com/angus-c/just/tree/master/packages/object-flip/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-flip-object)

```shell
npm install just-flip-object
```
```shell
yarn add just-flip-object
```

Flip the keys and values

```js
import flip from 'just-flip-object';

// flip the key and value
flip({a: 'x', b: 'y', c: 'z'}); // {x: 'a', y: 'b', z: 'c'}
flip({a: 1, b: 2, c: 3}); // {'1': 'a', '2': 'b', '3': 'c'}
flip({a: false, b: true}); // {false: 'a', true: 'b'}
```

### [just-has](https://www.npmjs.com/package/just-has)
[source](https://github.com/angus-c/just/tree/master/packages/object-has/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-has)

```shell
npm install just-has
```
```shell
yarn add just-has
```

Return a boolen indicating the existence of a deep property, don't throw if parent is undefined

```js
import has from 'just-has';

const obj = {a: {aa: {aaa: 2}}, b: 4};

has(obj, 'a.aa.aaa'); // true
has(obj, ['a', 'aa', 'aaa']); // true

has(obj, 'b.bb.bbb'); // false
has(obj, ['b', 'bb', 'bbb']); // false

has(obj.a, 'aa.aaa'); // true
has(obj.a, ['aa', 'aaa']); // true

has(obj.b, 'bb.bbb'); // false
has(obj.b, ['bb', 'bbb']); // false

has(null, 'a'); // false
has(undefined, ['a']); // false

const obj = {a: {}};
const sym = Symbol();
obj.a[sym] = 4;
has(obj.a, sym); // true
```

### Arrays

### [just-cartesian-product](https://www.npmjs.com/package/just-cartesian-product)
[source](https://github.com/angus-c/just/tree/master/packages/array-cartesian-product/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-cartesian-product)

```shell
npm install just-cartesian-product
```
```shell
yarn add just-cartesian-product
```

Takes an input of an array of arrays and returns their Cartesian product.

```js
import cartesianProduct from 'just-cartesian-product;

cartesianProduct([[1, 2], ['a', 'b']]); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
cartesianProduct([[1, 2], ['a', 'b', 'c']]); // [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]
cartesianProduct([]); // []
cartesianProduct(); // throws
```

### [just-unique](https://www.npmjs.com/package/just-unique)
[source](https://github.com/angus-c/just/tree/master/packages/array-unique/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-unique)

```shell
npm install just-unique
```
```shell
yarn add just-unique
```

Dedupes an array

```js
import unique from 'just-unique';

unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]); // [1, 2, 3, 4]

var a = {a: 3};
var b = {b: 4};
var c = {c: 5};
unique([a, a, b, c, b]); // [a, b, c]

unique([1, '1', 2, '2', 3, 2]); // [1, '1', 2, '2', 3]

// declaring sorted array for performance
unique([1, 1, '1', 2, 2, 5, '5', '5'], true); // [1, '1', 2, 5, '6']

// declaring strings array for performance
unique(['a', 'c', 'b', 'c', 'a'], false, true); // ['a', 'b', 'c']
```

### [just-flatten-it](https://www.npmjs.com/package/just-flatten-it)
[source](https://github.com/angus-c/just/tree/master/packages/array-flatten/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-flatten-it)

```shell
npm install just-flatten-it
```
```shell
yarn add just-flatten-it
```

Return a flattened array

```js
import flatten from 'just-flatten-it';

flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]], 1);
// [1, [2, 3], [[4, 5], 6, 7, [8, 9]]]
```

### [just-index](https://www.npmjs.com/package/just-index)
[source](https://github.com/angus-c/just/tree/master/packages/array-index/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-index)

```shell
npm install just-index
```
```shell
yarn add just-index
```

Return an object from an array, keyed by the value at the given id

```js
import index from 'just-index';

index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id');
// {first: {id: 'first', val: 1}, second: {id: 'second', val: 2}}
index([{id: 'first', val: 1}, null], 'id'); // {first: {id: 'first', val: 1}}
index([], 'id'); // {}
index([], null); // undefined
index({}, 'id'); // undefined
```

### [just-insert](https://www.npmjs.com/package/just-insert)
[source](https://github.com/angus-c/just/tree/master/packages/array-insert/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-insert)

```shell
npm install just-insert
```
```shell
yarn add just-insert
```

Inserts a sub-array into an array starting at the given index. Returns a copy

```js
import insert from 'just-insert';

insert([1, 2, 5, 6], ['a', 'c', 'e'], 2); // [1, 2, 'a', 'c', 'e', 5, 6]
insert([1, 2, 5, 6], 'a', 2); // [1, 2, 'a', 5, 6]
insert([1, 2, 5, 6], ['a', 'c', 'e'], 0); // ['a', 'c', 'e', 1, 2, 5, 6]
insert([1, 2, 5, 6], ['a', 'c', 'e']); // ['a', 'c', 'e', 1, 2, 5, 6]
```

### [just-intersect](https://www.npmjs.com/package/just-intersect)
[source](https://github.com/angus-c/just/tree/master/packages/array-intersect/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-intersect)

```shell
npm install just-intersect
```
```shell
yarn add just-intersect
```

Return the intersect of two arrays

```js
import intersect from 'just-intersect';

intersect([1, 2, 5, 6], [2, 3, 5, 6]); // [2, 5, 6]
intersect([1, 2, 2, 4, 5], [3, 2, 2, 5, 7]); // [2, 5]  
```

### [just-compact](https://www.npmjs.com/package/just-compact)
[source](https://github.com/angus-c/just/tree/master/packages/array-compact/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-compact)

```shell
npm install just-compact
```
```shell
yarn add just-compact
```

Returns a copy of an array with falsey values removed

```js
import compact from 'just-compact';

compact([1, null, 2, undefined, null, NaN, 3, 4, false, 5]); // [1, 2, 3, 4, 5]
compact([1, 2, [], 4, {}]); // [1, 2, [], 4, {}]
compact([]); // []
compact({}); // throws
```

### [just-last](https://www.npmjs.com/package/just-last)
[source](https://github.com/angus-c/just/tree/master/packages/array-last/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-last)

```shell
npm install just-last
```
```shell
yarn add just-last
```

Return the last member of an array

```js
import last from 'just-last';

last([1, 2, 3, 4, 5]); // 5
last([{a: 1}, {b: 1}, {c: 1}]); // {c: 1}
last([true, false, [true, false]]); // [true, false]
last(); // undefined
last([]); // undefined
last(null); // undefined
last(undefined); // undefined
```  
```

### [just-tail](https://www.npmjs.com/package/just-tail)
[source](https://github.com/angus-c/just/tree/master/packages/array-tail/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-tail)

```shell
npm install just-tail
```
```shell
yarn add just-tail
```

Return all but the first element of an array

```js
import tail from 'just-tail';

tail([1, 2, 3, 4, 5]); // [2, 3, 4, 5]
tail([{a: 1}, {b: 1}, {c: 1}]); // [{b: 1}, {c: 1}]
tail([true, false, [true, false]]); // [false, [true, false]]
tail([]); // []
tail(); // undefined
tail(null); // undefined
tail(undefined); // undefined
```

### [just-random](https://www.npmjs.com/package/just-random)
[source](https://github.com/angus-c/just/tree/master/packages/array-random/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-random)

```shell
npm install just-random
```
```shell
yarn add just-random
```

Return a randomly selected element in an array

```js
import random from 'just-random';

random([1, 2, 3]);
// one of [1, 2, 3], at random
```

### [just-shuffle](https://www.npmjs.com/package/just-shuffle)
[source](https://github.com/angus-c/just/tree/master/packages/array-shuffle/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-shuffle)

```shell
npm install just-shuffle
```
```shell
yarn add just-shuffle
```

Return the elements of an array in random order

```js
import shuffle from 'just-shuffle';

shuffle([1, 2, 3]); 
// array with original elements randomly sorted
shuffle([1, 2, 3], {shuffleAll: true}); 
// array with original elements randomly sorted and all in new postions
shuffle([]); // []
shuffle([1]); // [1]
shuffle(); // throws
shuffle(undefined); // throws
shuffle(null); // throws
shuffle({}); // throws
```

### [just-split](https://www.npmjs.com/package/just-split)
[source](https://github.com/angus-c/just/tree/master/packages/array-split/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-split)

```shell
npm install just-split
```
```shell
yarn add just-split
```

Splits array into groups of n items each

```js
import split from 'just-split';

split([]); // []
split([1, 2, 3, 4, 5]); // [[1, 2, 3, 4, 5]]
split([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
split([1, 2, 3, 4, 5, 6, 7, 8, 9], '3'); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
split(['a', 'b', 'c', 'd', 'e'], 2); // [['a', 'b'], ['c', 'd'], ['e']]
split([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
```

### [just-split-at](https://www.npmjs.com/package/just-split-at)
[source](https://github.com/angus-c/just/tree/master/packages/array-split-at/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-split-at)

```shell
npm install just-split-at
```
```shell
yarn add just-split-at
```

Splits an array into two at a given position

```js
import splitAt from 'just-split-at';

splitAt([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4, 5]]
splitAt([{a: 1}, {b: 1}, {c: 1}], -1); // [[{a: 1}, {b: 1}], [{c: 1}]]
splitAt([], 2); // [[], []]
splitAt(null, 1); // throws
splitAt(undefined, 1); // throws
```

### [just-sort-by](https://www.npmjs.com/package/just-sort-by)
[source](https://github.com/angus-c/just/tree/master/packages/array-sort-by/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-sort-by)

```shell
npm install just-sort-by
```
```shell
yarn add just-sort-by
```

Produces a new array, sorted in ascending order

```js
import sortBy from 'just-array-sort-by';

sortBy([10, 1, 5, 20, 15, 35, 30, 6, 8]); // [1, 5, 6, 8, 10, 15, 20, 30, 35]

sortBy([
  {user: 'fabio', details: {city: "Milan", age: 34}},
  {user: 'max', details: {city: "Munich", age: 29}},
  {user: 'zacarias', details: {city: "Sao Paulo", age: 44}},
  {user: 'robert', details: {city: "Manchester", age: 28}},
  {user: 'klaus', details: {city: "Zurich", age: 38}},
], function(o) {
  return o.details.age;
});

/*
[
  {user: 'robert', age: 28},
  {user: 'max', age: 29},
  {user: 'fabio', age: 34},
  {user: 'klaus', age: 38},
  {user: 'zacarias', age: 44},
]
*/

sortBy([
  {user: 'fabio', age: 34},
  {user: 'max', age: 29},
  {user: 'zacarias', age: 44},
  {user: 'robert', age: 28},
  {user: 'klaus', age: 38},
], 'user');
/*
[
  {user: 'fabio', age: 34},
  {user: 'klaus', age: 38},
  {user: 'max', age: 29},
  {user: 'robert', age: 28},
  {user: 'zacarias', age: 44},
]
*/
```

### [just-partition](https://www.npmjs.com/package/just-partition)
[source](https://github.com/angus-c/just/tree/master/packages/array-partition/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-partition)

```shell
npm install just-partition
```
```shell
yarn add just-partition
```

Elements satisfying predicate added to first array, remainder added to second

```js
import partition from 'just-partition';

partition([1, 5, 2, 4, 3], n => n > 3); // [[5, 4],[1, 2, 3]]
partition(['a', 2, 3, '3'], x => typeof x == 'string'); // [['a', '3'],[2, 3]]
partition([1, 2, 3, 4], x => typeof x == 'number'); // [[1, 2, 3, 4],[]]
partition([1, 2, 3, 4], x => typeof x == 'string'); // [[], [1, 2, 3, 4]]
partition([], n => n > 3); // [[], []]
partition({a: 1, b: 2}, n => n > 1); // throws
partition(null, n => n > 1); // throws
partition(undefined, n => n > 1); // throws
```

### [just-permutations](https://www.npmjs.com/package/just-permutations)
[source](https://github.com/angus-c/just/tree/master/packages/array-permutations/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-permutations)

```shell
npm install just-permutations
```
```shell
yarn add just-permutations
```

Returns all permutations of the length N of the elements of the given Array

```js
import permutations from 'just-array-permutations;

permutations([1, 2, 3]); // [[1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2], [3, 1, 2], [3, 2, 1]]
permutations([]); // []
permutations(); // throws
```

### [just-range](https://www.npmjs.com/package/just-range)
[source](https://github.com/angus-c/just/tree/master/packages/array-range/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-range)

```shell
npm install just-range
```
```shell
yarn add just-range
```

Generate a range array for numbers

```js
import range from 'just-range';

range(1, 5); // [1, 2, 3, 4]
range(5); // [0, 1, 2, 3, 4]
range(-5); // [0, -1, -2, -3, -4]
range(0, 20, 5) // [0, 5, 10, 15]
```

### [just-remove](https://www.npmjs.com/package/just-remove)
[source](https://github.com/angus-c/just/tree/master/packages/array-remove/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-remove)

```shell
npm install just-remove
```
```shell
yarn add just-remove
```

Removes one array from another

```js
import remove from 'just-remove';

remove([1, 2, 3, 4, 5, 6], [1, 3, 6]); // [2, 4, 5]
```

### [just-union](https://www.npmjs.com/package/just-union)
[source](https://github.com/angus-c/just/tree/master/packages/array-union/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-union)

```shell
npm install just-union
```
```shell
yarn add just-union
```

Returns the union of two arrays

```js
import union from 'just-union';

union([1, 2, 5, 6], [2, 3, 4, 6]); // [1, 2, 3, 4, 5, 6]
```

### [just-zip-it](https://www.npmjs.com/package/just-zip-it)
[source](https://github.com/angus-c/just/tree/master/packages/array-zip/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-zip-it)

```shell
npm install just-zip-it
```
```shell
yarn add just-zip-it
```

Returns an array of grouped elements, taking n-th element from every given array

```js
import zip from 'just-zip-it';

zip([1, 2, 3]); // [[1], [2], [3]]
zip([1, 2, 3], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b'], [3, 'c']]
zip([1, 2], ['a', 'b'], [true, false]); //[[1, 'a', true], [2, 'b', false]]

zip(undefined, {}, false, 1, 'foo'); // []
zip([1, 2], ['a', 'b'], undefined, {}, false, 1, 'foo'); // [[1, 'a'], [2, 'b']]

zip([1, 2, 3], ['a', 'b'], [true]); // [[1, 'a', true], [2, 'b', undefined], [3, undefined, undefined]]
```

### [just-group-by](https://www.npmjs.com/package/just-group-by)
[source](https://github.com/angus-c/just/tree/master/packages/array-group-by/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-group-by)

```shell
npm install just-group-by
```
```shell
yarn add just-group-by
```

Return a grouped object from array

```js
import groupBy from 'just-group-by';

groupBy([6.1, 4.2, 6.3], Math.floor); // { '4': [4.2], '6': [6.1, 6.3] }
groupBy([1,2,3,4,5,6,7,8], function(i) { return i % 2}); // { '0': [2, 4, 6, 8], '1': [1, 3, 5, 7] }
```

### Statistics

### [just-mean](https://www.npmjs.com/package/just-mean)
[source](https://github.com/angus-c/just/tree/master/packages/array-mean/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-mean)

```shell
npm install just-mean
```
```shell
yarn add just-mean
```

The mean (average) value in an array

```js
import mean from 'just-mean';

mean([1, 2, 3, 2, 4, 1]); // 2.1666666667
mean(3, 2, 1); // 2
mean([4]); // 4
mean(['3', 2]); // throws
mean(); // throws
```

### [just-median](https://www.npmjs.com/package/just-median)
[source](https://github.com/angus-c/just/tree/master/packages/array-median/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-median)

```shell
npm install just-median
```
```shell
yarn add just-median
```

Return the median value of an array of numbers

```js
import median from 'just-median';

median([1, 2, 3, 4, 5]); // 3
median([3, -1, 2]); // 2
median([9, 14, 14, 200, 15]); // 14
median(1, 2, 4, 3); // 2.5
median(['3', 2, 1]); // throws
median(); // throws
```

### [just-mode](https://www.npmjs.com/package/just-mode)
[source](https://github.com/angus-c/just/tree/master/packages/array-mode/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-mode)

```shell
npm install just-mode
```
```shell
yarn add just-mode
```

Return the most frequently occuring number(s)

```js
import mode from 'just-mode';

mode([1, 2, 3, 2]); // 2
mode(4, 4, 1, 4); // 4
mode(100, 100, 101, 101); // [100, 101]
mode(4, 3, 2, 1); // [1, 2, 3, 4]
mode(['1', 2, 2, 1, 2]); // throws
mode(null); // throws
```

### [just-percentile](https://www.npmjs.com/package/just-percentile)
[source](https://github.com/angus-c/just/tree/master/packages/array-percentile/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-percentile)

```shell
npm install just-percentile
```
```shell
yarn add just-percentile
```

Return the value at the given percentile (using linear interpolation)

```js
import percentile from 'just-percentile';

percentile([1, 2, 3], 0); // 1
percentile([1, 2, 3], 50); // 2
percentile([1, 2, 3], 100); // 3

// See https://en.wikipedia.org/wiki/Percentile (linear interpolation method)
percentile([15, 20, 35, 40, 50], 5); // 15
percentile([15, 20, 35, 40, 50], 30); // 20
percentile([15, 20, 35, 40, 50], 40); // 27.5
percentile([15, 20, 35, 40, 50], 95); // 50

percentile(1, 2, 3, 50); // throws
percentile(['1', 2, 3], 50); // throws
percentile([], 50); // throws
```

### [just-variance](https://www.npmjs.com/package/just-variance)
[source](https://github.com/angus-c/just/tree/master/packages/array-variance/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-variance)

```shell
npm install just-variance
```
```shell
yarn add just-variance
```

Return the standard deviation of an array or numeric argument list

```js
import variance from 'just-variance';

variance([1, 2, 3, 2, 4, 1]); // 1.3666666667
variance(3, 2, 1); // 1
variance([100, 100, 100.1, 100]); // 0.0025
variance(1, 2, 3, 4, 5, -6); // 15.5
variance([4]); // throws
variance(['3', 2]); // throws
variance(NaN, NaN); // throws
variance(); // throws
```

### [just-standard-deviation](https://www.npmjs.com/package/just-standard-deviation)
[source](https://github.com/angus-c/just/tree/master/packages/array-standard-deviation/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-standard-deviation)

```shell
npm install just-standard-deviation
```
```shell
yarn add just-standard-deviation
```

Return the standard deviation of an array or numeric argument list

```js
import standardDeviation from "just-standard-deviation";

standardDeviation([1, 2, 3, 2, 4, 1]); // 1.16904519
standardDeviation(3, 2, 1); // 1
standardDeviation([100, 100, 100.1, 100]); // 0.05
standardDeviation(1, 2, 3, 4, 5, -6); // 3.9370039
standardDeviation([4]); // throws
standardDeviation(["3", 2]); // throws
standardDeviation(NaN, NaN); // throws
standardDeviation(); // throws
```

### [just-skewness](https://www.npmjs.com/package/just-skewness)
[source](https://github.com/angus-c/just/tree/master/packages/array-skewness/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-skewness)

```shell
npm install just-skewness
```
```shell
yarn add just-skewness
```

Return the skewness of an array or numeric argument list using Pearson's second skewness coefficient

```js
import skewness from "just-skewness";

// Using Pearson's second skewness coefficient
skewness(3, 2, 1); // 0
skewness([1, 2, 3, 2, 4, 1]); // 0.4276994613841504
skewness(1, 2, 3, 4, 5, -6); // -0.762000762001143
skewness([1, 2, 3, 4, 9]); // 0.7705935588815224
skewness([4]); // throws
skewness(["3", 2]); // throws
skewness(NaN, NaN); // throws
skewness(); // throws
```

### Strings

### [just-template](https://www.npmjs.com/package/just-template)
[source](https://github.com/angus-c/just/tree/master/packages/string-template/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-template)

```shell
npm install just-template
```
```shell
yarn add just-template
```

Interpolate a string with variables

```js
import template from 'just-template';

var data = {
  a: {
    aa: {
      aaa: 'apple',
      bbb: 'pear'
    },
    bb: 'orange'
  },
  b: 'plum'
};
template('2 {{a.aa.aaa}}s, a {{a.aa.bbb}}, 3 {{a.bb}}s and a {{b}}. Yes 1 {{a.aa.bbb}}.', data);
// '2 apples, a pear, 3 oranges and a plum. Yes 1 pear.'
```

### [just-truncate](https://www.npmjs.com/package/just-truncate)
[source](https://github.com/angus-c/just/tree/master/packages/string-truncate/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-truncate)

```shell
npm install just-truncate
```
```shell
yarn add just-truncate
```

Truncate a string with a custom suffix

```js
  truncate('when shall we three meet again', 9); // 'when s...'
  truncate('when shall we three meet again', 10, ' (etc)'); // 'when (etc)'
  truncate('when shall we', 15,); // 'when shall we'
  truncate('when shall we', 15, '(more)'); // 'when shall we'
  truncate('when shall we', 10, ' (etc etc etc)'); // ' (etc etc etc)'
```

### [just-prune](https://www.npmjs.com/package/just-prune)
[source](https://github.com/angus-c/just/tree/master/packages/string-prune/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-prune)

```shell
npm install just-prune
```
```shell
yarn add just-prune
```

Prune a string with whole words and a custom suffix

```js
  prune('when shall we three meet again', 7); // 'when...'
  prune('when shall we three meet again', 7, ' (more)'; // 'when (more)'
  prune('when shall we', 15,); // 'when shall we'
  prune('when shall we', 15, ' (etc)'); // 'when shall we'
  prune('when shall we', 7, ' (more)'); // ' (more)'
```

### [just-squash](https://www.npmjs.com/package/just-squash)
[source](https://github.com/angus-c/just/tree/master/packages/string-squash/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-squash)

```shell
npm install just-squash
```
```shell
yarn add just-squash
```

Remove all spaces from a string, optionally remove escape sequences too

```js
  squash('the cat sat on the mat'); // 'thecatsatonthemat'
  squash(' the cat sat on the mat '); // 'thecatsatonthemat'
  squash('\tthe cat\n sat \fon \vthe \rmat '); // '\tthecat\nsat\fon\vthe\rmat'
  squash('\tthe cat\n sat \fon \vthe \rmat ', true); // 'thecatsatonthemat'
  squash(`the cat
sat on the mat`, true); // thecatsatonthemat
```

### [just-left-pad](https://www.npmjs.com/package/just-left-pad)
[source](https://github.com/angus-c/just/tree/master/packages/string-left-pad/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-left-pad)

```shell
npm install just-left-pad
```
```shell
yarn add just-left-pad
```

Add characters to the left of a string such that its total length is n

```js
import leftPad from 'just-left-pad';

leftPad('hello', 9); // '    hello'
leftPad('hello', 3); // 'hello'
leftPad('hello', 9, '.'); // '....hello'
leftPad('hello', 9, '..'); // '....hello'
leftPad('hello', 10, 'ab'); // 'bababhello'
leftPad('hello', 9, '\uD83D\uDC04'); // '🐄🐄🐄🐄hello'
leftPad('hello', 10, '\uD83D\uDC11\uD83D\uDC04'), // '🐄🐑🐄🐑🐄hello'
leftPad('hello', 7, '🐄'), // '🐄🐄hello'
leftPad(null, 7); // throws
leftPad([], 4, '*'); // throws
leftPad('hello', 4, true); // throws
leftPad('hello', -4, true); // throws  
leftPad('hello', 2.3, true); // throws    
```

### [just-right-pad](https://www.npmjs.com/package/just-right-pad)
[source](https://github.com/angus-c/just/tree/master/packages/string-right-pad/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-right-pad)

```shell
npm install just-right-pad
```
```shell
yarn add just-right-pad
```

Add characters to the right of a string such that its total length is n

```js
import rightPad from 'just-right-pad';

rightPad('hello', 9); // 'hello    '
rightPad('hello', 3); // 'hello'
rightPad('hello', 9, '.'); // 'hello....'
rightPad('hello', 9, '..'); // 'hello....'
rightPad('hello', 10, 'ab'); // 'helloababa'
rightPad('hello', 9, '\uD83D\uDC04'); // 'hello🐄🐄🐄🐄'
rightPad('hello', 10, '\uD83D\uDC11\uD83D\uDC04'), // 'hello🐑🐄🐑🐄🐑'
rightPad('hello', 7, '🐄'), // 'hello🐄🐄'
rightPad(null, 7); // throws
rightPad([], 4, '*'); // throws
rightPad('hello', 4, true); // throws
rightPad('hello', -4, true); // throws  
rightPad('hello', 2.3, true); // throws    
```

### [just-camel-case](https://www.npmjs.com/package/just-camel-case)
[source](https://github.com/angus-c/just/tree/master/packages/string-camel-case/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-camel-case)

```shell
npm install just-camel-case
```
```shell
yarn add just-camel-case
```

Convert a string to camel case

```js
  import camelCase from 'just-camel-case';

  camelCase('the quick brown fox'); // 'theQuickBrownFox'
  camelCase('the_quick_brown_fox'); // 'theQuickBrownFox'
  camelCase('the-quick-brown-fox'); // 'theQuickBrownFox'
  camelCase('theQuickBrownFox'); // 'theQuickBrownFox'
  camelCase('thequickbrownfox'); // 'thequickbrownfox'
  camelCase('the - quick * brown# fox'); // 'theQuickBrownFox'
  camelCase('behold theQuickBrownFox'); // 'beholdTheQuickBrownFox'
  camelCase('Behold theQuickBrownFox'); // 'beholdTheQuickBrownFox'
  // all caps words are camel-cased
  camelCase('The quick brown FOX'), 'theQuickBrownFox');
  // all caps substrings >= 4 chars are camel-cased
  camelCase('theQUickBrownFox'); // 'theQUickBrownFox'
  camelCase('theQUIckBrownFox'); // 'theQUIckBrownFox'
  camelCase('theQUICKBrownFox'); // 'theQuickBrownFox'
```

### [just-kebab-case](https://www.npmjs.com/package/just-kebab-case)
[source](https://github.com/angus-c/just/tree/master/packages/string-kebab-case/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-kebab-case)

```shell
npm install just-kebab-case
```
```shell
yarn add just-kebab-case
```

Convert a string to kebab case

```js
  import kebabCase from 'just-kebab-case';

  kebabCase('the quick brown fox'); // 'the-quick-brown-fox'
  kebabCase('the-quick-brown-fox'); // 'the-quick-brown-fox'
  kebabCase('the_quick_brown_fox'); // 'the-quick-brown-fox'
  kebabCase('theQuickBrownFox'); // 'the-quick-brown-fox'
  kebabCase('theQuickBrown Fox'); // 'the-quick-brown-fox'
  kebabCase('thequickbrownfox'); // 'thequickbrownfox'
  kebabCase('the - quick * brown# fox'); // 'the-quick-brown-fox'
  kebabCase('theQUICKBrownFox'); // 'the-q-u-i-c-k-brown-fox'
```

### [just-snake-case](https://www.npmjs.com/package/just-snake-case)
[source](https://github.com/angus-c/just/tree/master/packages/string-snake-case/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-snake-case)

```shell
npm install just-snake-case
```
```shell
yarn add just-snake-case
```

Convert a string to snake case

```js
  import snakeCase from 'just-snake-case';

  snakeCase('the quick brown fox'); // 'the_quick_brown_fox'
  snakeCase('the-quick-brown-fox'); // 'the_quick_brown_fox'
  snakeCase('the_quick_brown_fox'); // 'the_quick_brown_fox'
  snakeCase('theQuickBrownFox'); // 'the_quick_brown_fox'
  snakeCase('thequickbrownfox'); // 'thequickbrownfox'
  snakeCase('the - quick * brown# fox'); // 'the_quick_brown_fox'
  snakeCase('theQUICKBrownFox'); // 'the_q_u_i_c_k_brown_fox'
```

### [just-pascal-case](https://www.npmjs.com/package/just-pascal-case)
[source](https://github.com/angus-c/just/tree/master/packages/string-pascal-case/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-pascal-case)

```shell
npm install just-pascal-case
```
```shell
yarn add just-pascal-case
```

Convert a string to pascal case

```js
  import pascalCase from 'just-pascal-case';

  pascalCase('the quick brown fox'); // 'TheQuickBrownFox'
  pascalCase('the_quick_brown_fox'); // 'TheQuickBrownFox'
  pascalCase('the-quick-brown-fox'); // 'TheQuickBrownFox'
  pascalCase('theQuickBrownFox'); // 'TheQuickBrownFox'
  pascalCase('thequickbrownfox'); // 'Thequickbrownfox'
  pascalCase('the - quick * brown# fox'); // 'TheQuickBrownFox'
  pascalCase('theQUICKBrownFox'); // 'TheQUICKBrownFox'
```

### [just-capitalize](https://www.npmjs.com/package/just-capitalize)
[source](https://github.com/angus-c/just/tree/master/packages/string-capitalize/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-capitalize)

```shell
npm install just-capitalize
```
```shell
yarn add just-capitalize
```

Capitalize the first character of a string

```js
  import capitalize from 'just-capitalize';

/*
  capitalize('capitals'); // 'Capitals'
  capitalize('Capitals'); // 'Capitals'
  capitalize('many words'); // 'Many words'
  capitalize('!exclaim'); // '!exclaim'
*/
```

### [just-replace-all](https://www.npmjs.com/package/just-replace-all)
[source](https://github.com/angus-c/just/tree/master/packages/string-replace-all/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-replace-all)

```shell
npm install just-replace-all
```
```shell
yarn add just-replace-all
```

Replace all occurrences of a string within a string with another string

```js
  import replaceAll from 'just-replace-all';

/*
  replaceAll('hello, world', 'l', 'q'); // 'heqqo, worqd'
  replaceAll('hello, world', 'l', 'qq'); // 'heqqqqo, worqqd'
  replaceAll('hello, world', 'll', 'q'); // 'heqo, world'
  replaceAll('hello, world', '', 'q'); // 'hello, world'
  replaceAll('hello, world', 'l', ''); // 'heo, word'
  replaceAll('hello, world', null, 'q'); // 'hello, world'
  replaceAll('hello, world', 'l'); // throw
  replaceAll('hello, world'); // throw
  replaceAll(); // throw
  replaceAll(null, 'l', 'q'); // throw
  replaceAll('hello, world', null, 'q'); // throw
  replaceAll('hello, world', 'l', null); // throw
*/
```

### Numbers

### [just-clamp](https://www.npmjs.com/package/just-clamp)
[source](https://github.com/angus-c/just/tree/master/packages/number-clamp/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-clamp)

```shell
npm install just-clamp
```
```shell
yarn add just-clamp
```

Restrict a number within a range

```js
import clamp from 'just-clamp';

var n = 5;
clamp(1, n, 12); // 5
clamp(3, n, 1); // 3
clamp(8, n, 9); // 8
clamp(0, n, 0); // 0

var n = -5;
clamp(1, n, 12); // 1
clamp(-7, n, -8); // -7

clamp(NaN, n, 8); // NaN
clamp(3, n, NaN); // NaN  
clamp(3, NaN, 8); // NaN    

clamp(undefined, n, 8); // throws
clamp(3, n, 'h'); // throws  
clamp(3, false, 8); // throws 
```

### [just-is-prime](https://www.npmjs.com/package/just-is-prime)
[source](https://github.com/angus-c/just/tree/master/packages/number-is-prime/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-is-prime)

```shell
npm install just-is-prime
```
```shell
yarn add just-is-prime
```

Check if number is prime

```js
  import isPrime from 'just-is-prime;

/*
  isPrime(1); // false
  isPrime(2); // true
  isPrime(17); // true
  isPrime(10); // false
  isPrime(); // throws
  isPrime(null); // throws
  isPrime("js"); // throws
  isPrime({}); // throws
  isPrime(function() {}); // throws
  isPrime([]); // throws
*/
```

### [just-modulo](https://www.npmjs.com/package/just-modulo)
[source](https://github.com/angus-c/just/tree/master/packages/number-modulo/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-modulo)

```shell
npm install just-modulo
```
```shell
yarn add just-modulo
```

Modulo of a number and a divisor

```js
import modulo from 'just-modulo';

modulo(7, 5); // 2
modulo(17, 23); // 17
modulo(16.2, 3.8); // 1
modulo(5.8, 3.4); //2.4
modulo(4, 0); // 4
modulo(-7, 5); // 3
modulo(-2, 15); // 13
modulo(-5.8, 3.4); // 1
modulo(12, -1); // NaN
modulo(-3, -8); // NaN
modulo(12, 'apple'); // NaN
modulo('bee', 9); // NaN
modulo(null, undefined); // NaN
```

### Functions

### [just-compose](https://www.npmjs.com/package/just-compose)
[source](https://github.com/angus-c/just/tree/master/packages/function-compose/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-compose)

```shell
npm install just-compose
```
```shell
yarn add just-compose
```

Return a function composed of 2 or more functions

```js
import compose from 'just-compose';

const sqRootBiggest = compose(Math.max, Math.sqrt, Math.trunc);
sqRootBiggest(10, 5); // 3
sqRootBiggest(7, 0, 16); // 4
```

### [just-curry-it](https://www.npmjs.com/package/just-curry-it)
[source](https://github.com/angus-c/just/tree/master/packages/function-curry/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-curry-it)

```shell
npm install just-curry-it
```
```shell
yarn add just-curry-it
```

Return a curried function

```js
import curry from 'just-curry-it';

function add(a, b, c) {
  return a + b + c;
}
curry(add)(1)(2)(3); // 6
curry(add)(1)(2)(2); // 5
curry(add)(2)(4, 3); // 9

function add(...args) {
  return args.reduce((sum, n) => sum + n, 0)
}
var curryAdd4 = curry(add, 4)
curryAdd4(1)(2, 3)(4); // 10

function converter(ratio, input) {
  return (input*ratio).toFixed(1);
}
const curriedConverter = curry(converter)
const milesToKm = curriedConverter(1.62);
milesToKm(35); // 56.7
milesToKm(10); // 16.2
```

### [just-demethodize](https://www.npmjs.com/package/just-demethodize)
[source](https://github.com/angus-c/just/tree/master/packages/function-demethodize/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-demethodize)

```shell
npm install just-demethodize
```
```shell
yarn add just-demethodize
```

Turn a method into a standalone function; the first arg becomes `this`

```js
import demethodize from 'just-demethodize';

const trimFn = demethodize(''.trim);
['hello ', ' goodbye', 'hello again'].map(trimFn); // ['hello', 'goodbye', 'hello again']
```

### [just-flip](https://www.npmjs.com/package/just-flip)
[source](https://github.com/angus-c/just/tree/master/packages/function-flip/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-flip)

```shell
npm install just-flip
```
```shell
yarn add just-flip
```

Flip first two arguments of a function

```js
import flip from 'just-flip';

flip(console.log)(1, 2, 3) // 2, 1, 3

import map from 'just-map-object';
import partial from 'just-partial';

const numbers = {x: 5, y: 10};
const flippedMap = flip(map);
const double = partial(flippedMap, (undefined, number) => number * 2);
double(numbers) // {x: 10, y: 20];
```

### [just-partial-it](https://www.npmjs.com/package/just-partial-it)
[source](https://github.com/angus-c/just/tree/master/packages/function-partial/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-partial-it)

```shell
npm install just-partial-it
```
```shell
yarn add just-partial-it
```

Return a partial function

```js
import partial from 'just-partial-it';

const cubedRoot = partial(Math.pow, _, 1/3);
cubedRoot(64); // 4

const getRoot = partial(Math.pow, 64);
getRoot(1/2); // 8
```  
```

### [just-debounce-it](https://www.npmjs.com/package/just-debounce-it)
[source](https://github.com/angus-c/just/tree/master/packages/function-debounce/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-debounce-it)

```shell
npm install just-debounce-it
```
```shell
yarn add just-debounce-it
```

Return a debounced function

```js
import debounce from "just-debounce-it";

const fn1 = debounce(() => console.log("Hello"), 500);
fn1();
fn1();
fn1();
// 500ms later logs 'hello' once

const fn2 = debounce(() => console.log("Hello"), 500, true);
fn2(); // logs hello immediately
fn2();
fn2();
// 500ms later logs 'hello' once

const fn3 = debounce(() => console.log("Hello"), 500);
fn3();
fn3();
fn3();
fn3.cancel();
// function cancelled before 'hello' is logged

const fn4 = debounce(() => console.log("Hello"), 500);
fn4();
fn4();
fn4();
fn4.flush();
// immediately invoke the debounced function
```

### [just-memoize](https://www.npmjs.com/package/just-memoize)
[source](https://github.com/angus-c/just/tree/master/packages/function-memoize/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-memoize)

```shell
npm install just-memoize
```
```shell
yarn add just-memoize
```

An implementation of the memoize technique

```js
import memoize from 'just-memoize';

const sumByOne = memoize(function(value) {
  return value + 1;
});

sumByOne(10); // Returns value returned by the function
sumByOne(10); // Cache hit!

sumByOne(20); // Returns value returned by the function
sumByOne(20); // Cache hit!

// Custom cache key (key defaults to JSON stringified arguments)
var sum = memoize(function(a, b) {
  return a + b;
}, function(a, b) {
  return `${a}-${b}`;
});

sum(10, 10); // Returns value returned by the function
sum(10, 20); // Returns value returned by the function
sum(10, 20); // Cache hit!
```

### [just-memoize-last](https://www.npmjs.com/package/just-memoize-last)
[source](https://github.com/angus-c/just/tree/master/packages/function-memoize-last/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-memoize-last)

```shell
npm install just-memoize-last
```
```shell
yarn add just-memoize-last
```

A memoize implementation that only caches the most recent evaluation

```js
const memoizeLast = require('just-memoize-last')
const compare = require('just-compare')

const maxValue = memoizeLast(function(arr) {
  return Math.max(...arr)
}, function(a, b) {
  return compare(a, b)
});

maxValue([1,2,3]) // 3
maxValue([1,2,3]) // cache hit!
maxValue([1,3,4]) // 4
maxValue([1,2,3]) // 3
```

### [just-random](https://www.npmjs.com/package/just-random)
[source](https://github.com/angus-c/just/tree/master/packages/array-random/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-random)

```shell
npm install just-random
```
```shell
yarn add just-random
```

Return a randomly selected element in an array

```js
import random from 'just-random';

random([1, 2, 3]);
// one of [1, 2, 3], at random
```

### [just-throttle](https://www.npmjs.com/package/just-throttle)
[source](https://github.com/angus-c/just/tree/master/packages/function-throttle/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-throttle)

```shell
npm install just-throttle
```
```shell
yarn add just-throttle
```

Return a throttled function

```js
import throttle from 'just-throttle';

// no matter how many times the function is called, only invoke once within the given interval
// options: 
// `leading`: invoke  before interval
// `trailing`: invoke afer interval

const fn1 = throttle(() => console.log('hello'), 500, {leading: true});
setInterval(fn1, 400);
// logs 'hello' immediately and then every 500ms

const fn2 = throttle(() => console.log('hello'), 500, {trailing: true});
setInterval(fn2, 400);
// logs 'hello' after 500ms and then every 500ms

const fn3 = throttle(() => console.log('hello'), 500, {leading: true, trailing: true});
// forces trailing to false

const fn4 = throttle(() => console.log('hello'), 500, { leading: false });
fn4();
fn4();
fn4();
fn4.cancel();
// function cancelled before 'hello' is logged

const fn5 = throttle(() => console.log("Hello"), 500);
fn5();
fn5();
fn5();
fn5.flush();
// immediately invoke the throttled function
```

### [just-once](https://www.npmjs.com/package/just-once)
[source](https://github.com/angus-c/just/tree/master/packages/function-once/index.js)

[`🍦 Try it`](https://anguscroll.com/just/just-once)

```shell
npm install just-once
```
```shell
yarn add just-once
```

Create a function that can only be invoked once

```js
import once from 'just-once';

const fn = once(() => console.log('hello'));

fn();
// logs 'hello'
fn();
// does nothing
```

## Testing

Run all tests as a single test suite with

`npm run test`

Cross browser tests (via saucelabs) are in the [`sauce` branch](https://github.com/angus-c/just/tree/sauce)

## Contribute!

https://github.com/angus-c/just/blob/master/CONTRIBUTING.md
