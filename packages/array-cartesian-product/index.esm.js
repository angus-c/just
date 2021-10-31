var arrayCartesianProduct = cartesianProduct;

/*
  cartesianProduct([[1, 2], ['a', 'b']]); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
  cartesianProduct(); // throws
*/

function isArray(item) {
  if (Object.prototype.toString.call(item) === '[object Array]') {
    return true;
  }

  return false;
}

function baseProduct(prevProduct, arr2) {
  //pre allocate all our memory
  var newProduct = new Array(prevProduct.length * arr2.length);

  for (var i = 0; i < prevProduct.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      //always provide array to array.concat for consistent behavior
      newProduct[i * arr2.length + j] = prevProduct[i].concat([arr2[j]]);
    }
  }
  return newProduct;
}

function cartesianProduct(arr) {
  if (!isArray(arr)) {
    throw new Error('just-cartesian-product expects an array');
  }

  if (!arr.length) {
    return [];
  }

  if(!isArray(arr[0])) {
    throw new Error('set at index 0 must be an array');
  }

  //initialize our product array
  var product = arr[0].map(function(v) { return [v]; });

  for (var i = 1; i < arr.length; i++) {
    if(!isArray(product)) {
      throw new Error('set at index ' + i + ' must be an array');
    }
    product = baseProduct(product, arr[i]);
  }

  return product;
}

export {arrayCartesianProduct as default};
