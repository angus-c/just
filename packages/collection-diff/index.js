module.exports = {
  diff: diff,
  jsonPatchPathConverter: jsonPatchPathConverter,
};

/*
  const obj1 = {a: 4, b: 5};
  const obj2 = {a: 3, b: 5};
  const obj3 = {a: 4, c: 5};

  diff(obj1, obj2);
  [
    { "op": "replace", "path": ['a'], "value": 3 }
  ]

  diff(obj2, obj3);
  [
    { "op": "remove", "path": ['b'] },
    { "op": "replace", "path": ['a'], "value": 4 }
    { "op": "add", "path": ['c'], "value": 5 }
  ]

  // using converter to generate jsPatch standard paths
  // see http://jsonpatch.com
  import {diff, jsonPatchPathConverter} from 'just-diff'
  diff(obj1, obj2, jsonPatchPathConverter);
  [
    { "op": "replace", "path": '/a', "value": 3 }
  ]

  diff(obj2, obj3, jsonPatchPathConverter);
  [
    { "op": "remove", "path": '/b' },
    { "op": "replace", "path": '/a', "value": 4 }
    { "op": "add", "path": '/c', "value": 5 }
  ]

  // arrays
  const obj4 = {a: 4, b: [1, 2, 3]};
  const obj5 = {a: 3, b: [1, 2, 4]};
  const obj6 = {a: 3, b: [1, 2, 4, 5]};

  diff(obj4, obj5);
  [
    { "op": "replace", "path": ['a'], "value": 3 }
    { "op": "replace", "path": ['b', '2'], "value": 4 }
  ]

  diff(obj5, obj6);
  [
    { "op": "add", "path": ['b', '3'], "value": 5 }
  ]

  // nested paths
  const obj7 = {a: 4, b: {c: 3}};
  const obj8 = {a: 4, b: {c: 4}};
  const obj9 = {a: 5, b: {d: 4}};

  diff(obj7, obj8);
  [
    { "op": "replace", "path": ['b', 'c'], "value": 4 }
  ]

  diff(obj8, obj9);
  [
    { "op": "replace", "path": ['a'], "value": 5 }
    { "op": "remove", "path": ['b', 'c']}
    { "op": "add", "path": ['b', 'd'], "value": 4 }
  ]
*/

function diff(obj1, obj2, pathConverter) {
  if (!obj1 || typeof obj1 != 'object' || !obj2 || typeof obj2 != 'object') {
    throw new Error('both arguments must be objects or arrays');
  }

  function getDiff(obj1, obj2, basePath, diffs) {
    var obj1Keys = Object.keys(obj1);
    var obj1KeysLength = obj1Keys.length;
    var obj2Keys = Object.keys(obj2);
    var obj2KeysLength = obj2Keys.length;
    var path;

    for (var i = 0; i < obj1KeysLength; i++) {
      var key = obj1Keys[i];
      if (!(key in obj2)) {
        path = basePath.concat(key);
        diffs.remove.push({
          op: 'remove',
          path: pathConverter ? pathConverter(path) : path,
        });
      }
    }

    for (var i = 0; i < obj2KeysLength; i++) {
      var key = obj2Keys[i];
      if (!(key in obj1)) {
        path = basePath.concat(key);
        var obj2Value = obj2[key];
        diffs.add.push({
          op: 'add',
          path: pathConverter ? pathConverter(path) : path,
          value: obj2Value,
        });
      } else if (obj1[key] == null) {
        if (obj1[key] !== obj2[key]) {
          path = basePath.concat(key);
          diffs.replace.push({
            op: 'replace',
            path: pathConverter ? pathConverter(path) : path,
            value: obj2[key],
          });
        }
      } else if (obj1[key] != obj2[key]) {
        if (Object(obj2[key]) !== obj2[key]) {
          path = basePath.concat(key);
          diffs.replace.push({
            op: 'replace',
            path: pathConverter ? pathConverter(path) : path,
            value: obj2[key],
          });
        } else {
          getDiff(obj1[key], obj2[key], basePath.concat(key), diffs);
        }
      }
    }

    return diffs.remove.concat(diffs.replace).concat(diffs.add);
  }

  return getDiff(obj1, obj2, [], {remove: [], replace: [], add: []});
}

function jsonPatchPathConverter(arrayPath) {
  return [''].concat(arrayPath).join('/');
}
