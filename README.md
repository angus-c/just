## Just

A library of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for the bloat conscious developer.

[just-extend](https://www.npmjs.com/package/just-extend)

```js
var obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 4, b: 5, c: 8}

var obj = {a: 3, b: 5};
extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 3, b: 5}

var arr = [1, 2, 3];
var obj = {a: 3, b: 5};
extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push[4];
obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

var arr = [1, 2, 3];
var obj = {a: 3, b: 5};
extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push[4];
obj; // {a: 3, b: 5, c: [1, 2, 3]}
```
  
[just-filter](https://www.npmjs.com/package/just-filter)

```js
var obj = {a: 3, b: 5, c: 9};
filter(obj, function(key, value) {
  return value < 6;
}); // {a: 3, b: 5}

var obj = {a1: 3, b1: 5, a2: 9};
filter(obj, function(key, value) {
  return key[0] == 'a';
}); // {a1: 3, a2: 9}

var obj = {a: 3, b: 5, c: null};
filter(obj, function(key, value) {
  return value;
}); // {a: 3, b: 5}
```
 
[just-compare](https://www.npmjs.com/package/just-compare)

```js
primitives: value1 === value2
functions: value1.toString == value2.toString
arrays: if length, sequence and values of properties are identical
objects: if length, names and values of properties are identical
compare([[1, [2, 3]], [[1, [2, 3]]); // true
compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
compare({a: 2, b: 3}, {a: 2, b: 3}); // true
compare({a: 2, b: 3}, {b: 3, a: 2}); // true
compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
```
  
[just-pluck-it](https://www.npmjs.com/package/just-pluck-it)

```js
var arr = [{a:1, b:2}, {a:4, b:3}, {a:2, b:5}];
pluck(arr, 'a'); // [1, 4, 2]
var obj = {x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}];
pluck(obj, 'a'); // {x: 1, y: 4, z: 2}
```
 
[just-array-flatten](https://www.npmjs.com/package/just-array-flatten)

```js
flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
  
[just-array-intersect](https://www.npmjs.com/package/just-array-intersect)

```js
  intersect([1, 2, 5, 6], [2, 3, 5, 6]); // [2, 5, 6]
```
   
[just-array-last](https://www.npmjs.com/package/just-array-last)  

```js
last([1, 2, 3, 4, 5]); // 5
last([{a: 1}, {b: 1}, {c: 1}]); // {c: 1}
last([true, false, [true, false]]); // [true, false]
```  
[just-array-remove](https://www.npmjs.com/package/just-array-remove)

```js
  remove([1, 2, 3, 4, 5, 6], [1, 3, 6]); // [2, 4, 5]
```  

[just-array-union](https://www.npmjs.com/package/just-array-remove)  

```js
  union([1, 2, 5, 6], [2, 3, 4, 6]); // [1, 2, 3, 4, 5, 6]
```
  
[just-array-unique](https://www.npmjs.com/package/just-array-unique)  

```js
unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]); // [1, 2, 3, 4]
var a = {a: 3};
var b = {b: 4};
var c = {c: 5};
unique([a, a, b, c, b]); // [a, b, c]
unique([1, '1', 2, '2', 3, 2]); // [1, 2, 3]
unique([1, '1', 2, '2', 3, 2], fuction(a, b) {return a === b}; // [1, '1', 2, '2', 3]
```

[just-function-curry](https://www.npmjs.com/package/just-function-curry)

```js
function converter(ratio, input) {
  return (input*ratio).toFixed(1);
}
var milesToKm = curry(converter, 1.62);
milesToKm(35); // 56.7
milesToKm(10); // 16.2
```
  
[just-function-partial](https://www.npmjs.com/package/just-function-partial)

```js
var cubedRoot = partial(Math.pow, _, 1/3);
cubedRoot(10).toFixed(1); // 56.7
cubedRoot(35).toFixed(1); // 16.2
```  
