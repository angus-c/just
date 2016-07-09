## just-filter

Part of a [library]('../../README.md') of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for the bloat conscious developer.

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
