module.exports = diff;

/*
  Diffs represented as objects (not JSON) in JSON Patch format
  See http://jsonpatch.com

  const obj1 = {a: 4, b: 5};
  const obj2 = {a: 3, b: 5};
  const obj3 = {a: 4, c: 5};

  diff(obj1, obj2);
  [
    { "op": "replace", "path": "/a", "value": 3 }
  ]

  diff(obj1, obj3);
  [
    { "op": "remove", "path": "/b" },
    { "op": "add", "path": "/c", "value": 5 }
  ]

  diff(obj2, obj3);
  [
    { "op": "remove", "path": "/b" },
    { "op": "replace", "path": "/a", "value": 4 }
    { "op": "add", "path": "/c", "value": 5 }
  ]

  const obj4 = {a: 4, b: [1, 2, 3]};
  const obj5 = {a: 3, b: [1, 2, 4]};
  const obj6 = {a: 3, b: [1, 2, 4, 5]};

  diff(obj4, obj5);
  [
    { "op": "replace", "path": "/a", "value": 3 }
    { "op": "replace", "path": "/b/2", "value": 4 }
  ]

  diff(obj5, obj6);
  [
    { "op": "add", "path": "/b/3", "value": 5 }
  ]

  const obj7 = {a: 4, b: {c: 3}};
  const obj8 = {a: 4, b: {c: 4}};
  const obj9 = {a: 5, b: {d: 4}};

  diff(obj7, obj8);
  [
    { "op": "replace", "path": "/b/c", "value": 4 }
  ]

  diff(obj8, obj9);
  [
    { "op": "replace", "path": "/a", "value": 5 }
    { "op": "remove", "path": "/b/c" }
    { "op": "add", "path": "/b/d", "value": 4 }
  ]

  const obj10 = {a: 4};
  const obj11 = {a: 4, b: {c: 4}};

  diff(obj10, obj11);
  [
    { "op": "add", "path": "/b", "value": {c: 4} }
  ]

  diff(obj11, obj10);
  [
    { "op": "remove", "path": "/b" }
  ]
*/

function diff(obj1, obj2, path, diffs) {
  if (!obj1 || typeof obj1 != 'object' || !obj2 || typeof obj2 != 'object') {
    throw new Error('both arguments must be objects or arrays');
  }

  !path && (path = '');
  !diffs && (diffs = {remove: [], replace: [], add: []});
  var obj1Keys = Object.keys(obj1);
  var obj1KeysLength = obj1Keys.length;
  var obj2Keys = Object.keys(obj2);
  var obj2KeysLength = obj2Keys.length;

  for (var i = 0; i < obj1KeysLength; i++) {
    var key = obj1Keys[i];
    var removePath = path + '/' + key;
    if (!obj2[key]) {
      diffs.remove.push({
        op: 'remove',
        path: removePath
      });
    }
  }

  for (var i = 0; i < obj2KeysLength; i++) {
    var key = obj2Keys[i];
    var updatePath = path + '/' + key;
    if (!obj1[key]) {
      var obj2Value = obj2[key];
      diffs.add.push({
        op: 'add',
        path: updatePath,
        value: obj2Value
      });
    } else if (obj1[key] != obj2[key]) {
      if (Object(obj2[key]) !== obj2[key]) {
        diffs.replace.push({
          op: 'replace',
          path: updatePath,
          value: obj2[key]
        });
      } else {
        diff(obj1[key], obj2[key], updatePath, diffs);
      }
    }
  }

  return diffs.remove.concat(diffs.replace).concat(diffs.add);
}
