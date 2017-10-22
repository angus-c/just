module.exports = merge;

/*
  var obj = {a: 3, b: 5};
  merge(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 4, b: 5, c: 8}

  var obj = {a: 3, b: 5};
  merge({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 3, b: 5}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  merge(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

  merge({a: 4, b: 5}); // {a: 4, b: 5}
  merge(3, {a: 4, b: 5}); // throws
  merge({a: 4, b: 5}, 3); // throws
  merge({a: 4, b: 5}, {b: 4, c: 5}, 'c'); // throws
*/

function merge(/* obj1, obj2, [objn] */) {
  var args = [].slice.call(arguments);
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
      result[key] = extender[key];
    }
  }
  return result;
}
