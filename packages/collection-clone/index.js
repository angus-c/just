module.exports = clone;

/*
  Identical to `just-extend(true, {}, obj1)`

  var arr = [1, 2, 3];
  var subObj = {aa: 1};
  var obj = {a: 3, b: 5, c: arr, d: subObj};
  var objClone = clone(obj);
  arr.push(4);
  subObj.bb = 2;
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}
  objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}
*/

function clone(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    // include prototype properties
    var value = obj[key];
    if (isCloneable(value)) {
      result[key] = clone(value);
    } else {
      // manually clone dates and regexps
      var objToString = {}.toString;
      if (objToString.call(value) == '[object Date]') {
        result[key] = new Date(value.getTime());
      } else if (objToString.call(value) == '[object RegExp]') {
        result[key] = RegExp(value.source, value.flags);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

function isCloneable(obj) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}
