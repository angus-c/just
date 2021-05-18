## just-array-sort-by

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

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
