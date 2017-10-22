module.exports = extend;

/*
  var obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 4, b: 5, c: 8}

  var obj = {a: 3, b: 5};
  extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 3, b: 5}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3]}

  extend({a: 4, b: 5}); // {a: 4, b: 5}
  extend(3, {a: 4, b: 5}); // throws
  extend({a: 4, b: 5}, 3); // throws
  extend({a: 4, b: 5}, true); // throws
*/

function extend(/* [deep], obj1, obj2, [objn] */) {
  var args = [].slice.call(arguments);
  var deep = false;
  if (typeof args[0] == 'boolean') {
    deep = args.shift();
  }
  var arg;
  var i = args.length;
  while (((arg = args[i - 1]), i--)) {
    if (!arg || (typeof arg != 'object' && typeof arg != 'function')) {
      throw new Error('expected object, got ' + arg);
    }
  }
  var result = args[0];
  var extenders = args.slice(1);
  var len = extenders.length;
  for (var i = 0; i < len; i++) {
    var extender = extenders[i];
    for (var key in extender) {
      // include prototype properties
      var value = extender[key];
      if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
        var base = Array.isArray(value) ? [] : {};
        result[key] = extend(true, result[key] || base, value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}
