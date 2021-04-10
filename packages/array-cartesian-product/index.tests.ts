import cartesianProduct = require("./index");

// OK
cartesianProduct([]);
cartesianProduct([[]]);
cartesianProduct([['a']]);
cartesianProduct([['a', 'b'], [1, 2]]);

// Not OK
// @ts-expect-error
cartesianProduct();
// @ts-expect-error
cartesianProduct(1);
// @ts-expect-error
cartesianProduct('javascript');
