## just-prune

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```js
  remove spaces, optionally remove escape sequences \b, \t, \n, \f, \r, \", \', and \\

  squash('the cat sat on the mat'); // thecatsatonthemat
  squash(' the cat sat on the mat '); // thecatsatonthemat
  squash(' the \'cat\'\n sat on the mat '); // the\'cat\'\nsatonthemat
  squash(' the \'cat\'\n sat on the mat ', true); // thecatsatonthemat
```
