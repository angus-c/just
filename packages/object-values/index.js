module.exports = values;

/*
  values({a: 4, c: 8}); // [4, 8]
  values({a: {aa: 2}, b: {bb: 4}}); // [{aa: 2}, {bb: 4}]
  values({}); // []
  values([1, 2, 3]); // [1, 2, 3]
  values(function(a, b) {return a + b;}); // []
  values(new String('hello')); // ['h', 'e', 'l', 'l', 'o']
  values(1); // throw exception
  values(true); // throw exception
  values(undefined); // throw exception
  values(null); // throw exception
*/

function values(obj) {
  var result = [];
  if (Array.isArray(obj)) {
    return obj.slice(0);
  }
  if (typeof obj == 'object' || typeof obj == 'function') {
    var keys = Object.keys(obj);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      result.push(obj[keys[i]]);
    }
    return result;
  }
  throw new Error('argument to `values` must be an object');
}
