# object-assign-sorted

`Object.assign` with sorted keys.

```js
var objectAssignSorted = require('object-assign-sorted');

objectAssignSorted({ b: 1, a: 1 }, { c: 2, b: 2 });
// >> { a: 1, b: 2, c: 2 }
```
