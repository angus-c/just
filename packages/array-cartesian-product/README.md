## just-cartesian-product

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-cartesian-product)

Takes an input of an array of arrays and returns their Cartesian product.

```
import cartesianProduct from 'just-cartesian-product;

cartesianProduct([[1, 2], ['a', 'b']]); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
cartesianProduct([[1, 2], ['a', 'b', 'c']]); // [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]
cartesianProduct([]); // []
cartesianProduct(); // throws
```
