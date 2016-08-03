## Just :cherries:

[![Build Status](https://travis-ci.org/angus-c/just.png?branch=master)](http://travis-ci.org/angus-c/just.js)

A library of **zero-dependency** npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

## Try :icecream:
[Editable, runnable examples](http://anguscroll.com/just) of every utility (powered by [Tonic](https://tonicdev.com/))  
<a href="http://anguscroll.com/just"><img src="images/just-interactive.png" width="500"/></a>   
## Read :blue_book:
[The Zen of Dependency-Free –- Why I wrote Just](https://medium.com/@angustweets/just-a12d54221f65#.ljib0mfr5)

## The Modules :package:

* [Collections](#collections)		
  * [just-compare](#just-compare)		
  * [just-pluck-it](#just-pluck-it)		
* [Objects](#objects)		
  * [just-extend](#just-extend)		
  * [just-values](#just-values)	  	  
  * [just-filter-object](#just-filter-object)		
  * [just-object-empty](#just-object-empty)
  * [just-map-object](#just-map-object)  		
  * [just-reduce-object](#just-reduce-object)		
  * [just-pick](#just-pick)     		
  * [just-typeof](#just-typeof)  		
  * [just-flip-object](#just-flip-object)  		
* [Arrays](#arrays)		
  * [just-unique](#just-unique)		
  * [just-flatten-it](#just-flatten-it)		
  * [just-intersect](#just-intersect)		
  * [just-last](#just-last)
  * [just-tail](#just-tail)	  	
  * [just-remove](#just-remove)		
  * [just-union](#just-union)		
* [Strings](#strings)  		
  * [just-template](#just-template)		
* [Functions](#functions)  		
  * [just-compose](#just-compose)		
  * [just-curry-it](#just-curry-it)		
  * [just-partial-it](#just-partial-it)

### Collections  

### [just-compare](https://www.npmjs.com/package/just-compare)
:icecream:[`Try It`](http://anguscroll.com/just/just-compare)

`npm install just-compare`

```js
import compare from 'just-compare';

// primitives: value1 === value2
// functions: value1.toString == value2.toString
// arrays: if length, sequence and values of properties are identical
// objects: if length, names and values of properties are identical
compare([[1, [2, 3]], [[1, [2, 3]]); // true
compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
compare({a: 2, b: 3}, {a: 2, b: 3}); // true
compare({a: 2, b: 3}, {b: 3, a: 2}); // true
compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
```

### [just-pluck-it](https://www.npmjs.com/package/just-pluck-it)
:icecream:[`Try It`](http://anguscroll.com/just/just-pluck-it)

`npm install just-pluck-it`

```js
import pluck from 'just-pluck-it';

pluck([{a:1, b:2}, {a:4, b:3}, {a:2, b:5}], 'a'); // [1, 4, 2]
pluck({x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}}, 'a'); // {x: 1, y: 4, z: 2}
```

### Objects

### [just-extend](https://www.npmjs.com/package/just-extend)  
:icecream:[`Try It`](http://anguscroll.com/just/just-extend)

`npm install just-extend`

```js
import extend from 'just-extend';

let obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 4, b: 5, c: 8}

let obj = {a: 3, b: 5};
extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 3, b: 5}

let arr = [1, 2, 3];
let obj = {a: 3, b: 5};
extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push[4];
obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

let arr = [1, 2, 3];
let obj = {a: 3, b: 5};
extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push[4];
obj; // {a: 3, b: 5, c: [1, 2, 3]}
```

### [just-object-empty](https://www.npmjs.com/package/just-object-empty)  
:icecream:[`Try It`](http://anguscroll.com/just/just-object-empty)

`npm install just-object-empty`

```js
import objectEmpty from 'just-object-empty';

let obj = {a: 3, b: 5};
objectEmpty(obj} // false

let obj = {};
objectEmpty(obj} // true

let obj = null;
objectEmpty(obj} // true
```

### [just-filter-object](https://www.npmjs.com/package/just-filter-object)
:icecream:[`Try It`](http://anguscroll.com/just/just-filter-object)

`npm install just-filter-object`

```js
import filter from 'just-filter-object';

// returns a new object containing those original properties for which the predicate returns truthy
filter({a: 3, b: 5, c: 9}, (key, value) => value < 6); // {a: 3, b: 5}
filter({a1: 3, b1: 5, a2: 9}, (key, value) => key[0] == 'a'); // {a1: 3, a2: 9}
filter({a: 3, b: 5, c: null}, (key, value) => value); // {a: 3, b: 5}
```

### [just-map-object](https://www.npmjs.com/package/just-map-object)
:icecream:[`Try It`](http://anguscroll.com/just/just-map-object)

`npm install just-map-object`

```js
import map from 'just-map-object';

// returns a new object with the predicate applied to each value
map({a: 3, b: 5, c: 9}, (key, value) => value + 1); // {a: 4, b: 6, c: 10}
map({a: 3, b: 5, c: 9}, (key, value) => key); // {a: 'a', b: 'b', c: 'c'}
map({a: 3, b: 5, c: 9}, (key, value) => key + value); // {a: 'a3', b: 'b5', c: 'c9'}
```

### [just-reduce-object](https://www.npmjs.com/package/just-reduce-object)
:icecream:[`Try It`](http://anguscroll.com/just/just-reduce-object)

`npm install just-reduce-object`

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

### [just-pick](https://www.npmjs.com/package/just-pick)
:icecream:[`Try It`](http://anguscroll.com/just/just-pick)

`npm install just-pick`

```js
import pick from 'just-pick';

var obj = {a: 3, b: 5, c: 9};
pick(obj, ['a', 'c']); // {a: 3, c: 9}
pick(obj, 'a', 'c'); // {a: 3, c: 9}
pick(obj, ['a', 'b', 'd']); // {a: 3, b: 5, d: undefined}
pick(obj, ['a', 'a']); // {a: 3}
```

### [just-typeof](https://www.npmjs.com/package/just-typeof)
:icecream:[`Try It`](http://anguscroll.com/just/just-typeof)

`npm install just-typeof`

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
:icecream:[`Try It`](http://anguscroll.com/just/just-flip-object)

`npm install just-flip-object`

```js
import flip from 'just-flip-object';

// flip the key and value
flip({a: 'x', b: 'y', c: 'z'}); // {x: 'a', y: 'b', z: 'c'}
flip({a: 1, b: 2, c: 3}); // {'1': 'a', '2': 'b', '3': 'c'}
flip({a: false, b: true}); // {false: 'a', true: 'b'}
```

### Arrays

### [just-unique](https://www.npmjs.com/package/just-unique)
:icecream:[`Try It`](http://anguscroll.com/just/just-unique)

`npm install just-unique`

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
:icecream:[`Try It`](http://anguscroll.com/just/just-flatten-it)

`npm install just-flatten-it`

```js
import flatten from 'just-flatten-it';

flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### [just-intersect](https://www.npmjs.com/package/just-intersect)
:icecream:[`Try It`](http://anguscroll.com/just/just-intersect)

`npm install just-intersect`

```js
import intersect from 'just-intersect';

intersect([1, 2, 5, 6], [2, 3, 5, 6]); // [2, 5, 6]
```

### [just-last](https://www.npmjs.com/package/just-last)
:icecream:[`Try It`](http://anguscroll.com/just/just-last)

`npm install just-last`

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

### [just-tail](https://www.npmjs.com/package/just-tail)
:icecream:[`Try It`](http://anguscroll.com/just/just-tail)

`npm install just-tail`

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

### [just-remove](https://www.npmjs.com/package/just-remove)
:icecream:[`Try It`](http://anguscroll.com/just/just-remove)

`npm install just-remove`

```js
import remove from 'just-remove';

remove([1, 2, 3, 4, 5, 6], [1, 3, 6]); // [2, 4, 5]
```

### [just-union](https://www.npmjs.com/package/just-union)
:icecream:[`Try It`](http://anguscroll.com/just/just-union)

`npm install just-union`

```js
import union from 'just-union';

union([1, 2, 5, 6], [2, 3, 4, 6]); // [1, 2, 3, 4, 5, 6]
```

### Strings

### [just-template](https://www.npmjs.com/package/just-template)
:icecream:[`Try It`](http://anguscroll.com/just/just-template)

`npm install just-template`

```js
import template from 'just-template';

const data = {
  a: {
    aa: {
      aaa: 'apple',
      bbb: 'pear'
    },
    bb: 'orange'
  },
  b: 'plum'
};
template('2 ${a.aa.aaa}s, a ${a.aa.bbb}, 3 ${a.bb}s and a ${b}. Yes 1 ${a.aa.bbb}.', data);
// '2 apples, a pear, 3 oranges and a plum. Yes 1 pear.'
```

### Functions

### [just-compose](https://www.npmjs.com/package/just-compose)
:icecream:[`Try It`](http://anguscroll.com/just/just-compose)

`npm install just-compose`

```js
import compose from 'just-compose';

const sqRootBiggest = compose(Math.max, Math.sqrt, Math.trunc);
sqRootBiggest(10, 5); // 3
sqRootBiggest(7, 0, 16); // 4
```

### [just-curry-it](https://www.npmjs.com/package/just-curry-it)
:icecream:[`Try It`](http://anguscroll.com/just/just-curry-it)

`npm install just-curry-it`

```js
import curry from 'just-curry-it';

function converter(ratio, input) {
  return (input*ratio).toFixed(1);
}
const milesToKm = curry(converter, 1.62);
milesToKm(35); // 56.7
milesToKm(10); // 16.2
```

### [just-partial-it](https://www.npmjs.com/package/just-partial-it)
:icecream:[`Try It`](http://anguscroll.com/just/just-partial-it)

`npm install just-partial-it`

```js
import partial from 'just-partial-it';

const cubedRoot = partial(Math.pow, undefined, 1/3);
cubedRoot(10).toFixed(1); // 56.7
cubedRoot(35).toFixed(1); // 16.2
```

## Testing

Run all tests as a single test suite with

```npm run test```

## Contribute!

I welcome pull requests for additional utilities (and corrections to existing ones).

## New Module Guidelines
* must not depend on any other npm modules
* assume this is hot code and code accordingly
  * favor for loops over high order functions
  * don't repeatedly access the same property, assign to a var
  * write es5
* api
  * keep the api it simple and intuitive
  * avoid edge case arguments whenever possible
* README
  * limit README to examples of each use case
  * if you must explain the api (see api section) add a comment in the README example code
  * add a section in the general README that matches the README for your module
* tests
  * write a test for each use case
  * include tests for all README examples
* Interactive gh-page (anguscroll.com/just)
  * I can update this afterwards   
