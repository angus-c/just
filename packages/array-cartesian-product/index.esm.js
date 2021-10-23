var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// index.js
var require_array_cartesian_product = __commonJS({
  "index.js"(exports, module) {
    module.exports = cartesianProduct;
    function isArray(item) {
      if (Object.prototype.toString.call(item) === "[object Array]") {
        return true;
      }
      return false;
    }
    function baseProduct(prevProduct, arr2) {
      var newProduct = new Array(prevProduct.length * arr2.length);
      for (var i = 0; i < prevProduct.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
          newProduct[i * arr2.length + j] = prevProduct[i].concat([arr2[j]]);
        }
      }
      return newProduct;
    }
    function cartesianProduct(arr) {
      if (!isArray(arr)) {
        throw new Error("just-cartesian-product expects an array");
      }
      if (!arr.length) {
        return [];
      }
      if (!isArray(arr[0])) {
        throw new Error("set at index 0 must be an array");
      }
      var product = arr[0].map(function(v) {
        return [v];
      });
      for (var i = 1; i < arr.length; i++) {
        if (!isArray(product)) {
          throw new Error("set at index " + i + " must be an array");
        }
        product = baseProduct(product, arr[i]);
      }
      return product;
    }
  }
});
export default require_array_cartesian_product();
