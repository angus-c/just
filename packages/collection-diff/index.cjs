//var clone = require('../collection-clone/index.cjs');

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

  // using converter to generate jsPatch standard basePaths
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
    { "op": "replace", "path": ['b', 2], "value": 4 }
  ]

  diff(obj5, obj6);
  [
    { "op": "add", "path": ['b', 3], "value": 5 }
  ]

  // nested basePaths
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

  pathConverter ||
    (pathConverter = function(arr) {
      return arr;
    });

  const initialPermutation = {basePath: [], diffs: {remove: [], replace: [], add: []}};
  var permutations = [initialPermutation];

  function getDiff(obj1, obj2, permutation) {
    var obj1Keys = Object.keys(obj1);
    var obj1KeysLength = obj1Keys.length;
    var obj2Keys = Object.keys(obj2);
    var obj2KeysLength = obj2Keys.length;
    var path;

    var basePath = permutation.basePath;
    var diffs = permutation.diffs;
    var newPermutation;

    // if both objects are arrays and obj1 length > obj2 length
    // we will also run recursion in reverse direction, to get shortest path
    var lengthDelta = obj1.length - obj2.length;
    if (Array.isArray(obj1) && Array.isArray(obj2) && lengthDelta > 0) {
      newPermutation = clonePermutation(permutation);
      permutations.push(newPermutation);
    }

    for (var i = 0; i < obj1KeysLength; i++) {
      var key = Array.isArray(obj1) ? Number(obj1Keys[i]) : obj1Keys[i];
      if (!(key in obj2)) {
        path = basePath.concat(key);
        diffs.remove.push({
          op: 'remove',
          path: pathConverter(path),
        });
      }
    }

    for (var i = 0; i < obj2KeysLength; i++) {
      var key = Array.isArray(obj2) ? Number(obj2Keys[i]) : obj2Keys[i];
      var obj1AtKey = obj1[key];
      var obj2AtKey = obj2[key];
      path = basePath.concat(key);
      if (!(key in obj1)) {
        var obj2Value = obj2[key];
        diffs.add.push({
          op: 'add',
          path: pathConverter(path),
          value: obj2Value,
        });
      } else if (obj1AtKey !== obj2AtKey) {
        if (
          Object(obj1AtKey) !== obj1AtKey ||
              Object(obj2AtKey) !== obj2AtKey
        ) {
          pushReplace(path, diffs, obj2[key]);
        } else {
          if (
            !Object.keys(obj1AtKey).length &&
                !Object.keys(obj2AtKey).length &&
                String(obj1AtKey) != String(obj2AtKey)
          ) {
            pushReplace(path, diffs, obj2[key]);
          } else {
            permutation.basePath = path;
            getDiff(obj1[key], obj2[key], permutation);
          }
        }
      }
    }

    // if both objects are arrays and obj1 length > obj2 length
    // run recursion in reverse direction, to get shortest path
    if (newPermutation) {
      // trim obj1 from left
      for (var i = 0; i < lengthDelta; i++) {
        path = newPermutation.basePath.concat(i);
        newPermutation.diffs.remove.push({
          op: 'remove',
          path: pathConverter(path),
        });
      }

      // now make a copy of obj1 with excess removed and see if any replaces
      var obj1Trimmed = obj1.slice(lengthDelta);;
      for (var i = 0; i < obj2KeysLength; i++) {
        var basePath2 = newPermutation.basePath;
        var diffs2 = newPermutation.diffs;
        var key = Number(obj2Keys[i]);
        path = basePath2.concat(key);

        var obj1AtKey = obj1Trimmed[key];
        var obj2AtKey = obj2[key];
        if (obj1AtKey !== obj2AtKey) {
          if (
            Object(obj1AtKey) !== obj1AtKey ||
                Object(obj2AtKey) !== obj2AtKey
          ) {
            pushReplace(path, diffs2, obj2[key]);
          } else {
            if (
              !Object.keys(obj1AtKey).length &&
                  !Object.keys(obj2AtKey).length &&
                  String(obj1AtKey) != String(obj2AtKey)
            ) {
              pushReplace(path, diffs2, obj2[key]);
            } else {
              newPermutation.basePath = path;
              getDiff(obj1Trimmed[key], obj2[key], newPermutation);
            }
          }
        }
      }
    }
  }

  getDiff(obj1, obj2, permutations[0]);
  const finalDiffs = permutations.sort(
    (a, b) => diffStepCount(a) > diffStepCount(b) ? 1 : -1
  )[0].diffs;
  return finalDiffs.remove
    .reverse()
    .concat(finalDiffs.replace)
    .concat(finalDiffs.add);

  function pushReplace(path, diffs, newValue) {
    // path = basePath.concat(key);
    diffs.replace.push({
      op: 'replace',
      path: pathConverter(path),
      // value: obj2[key],
      value: newValue,
    });
  }
}

function clonePermutation(permutation) {
  return {
    basePath: permutation.basePath.slice(0),
    diffs: {
      remove: permutation.diffs.remove.slice(0),
      replace: permutation.diffs.remove.slice(0),
      add: permutation.diffs.remove.slice(0),
    },
  };
}

function diffStepCount(permutation) {
  const diffs = permutation.diffs;
  return diffs.remove.length + diffs.replace.length + diffs.add.length;
}

function jsonPatchPathConverter(arrayPath) {
  return [''].concat(arrayPath).join('/');
}
