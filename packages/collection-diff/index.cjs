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
    { "op": "replace", "path": ['b', 2], "value": 4 }
  ]

  diff(obj5, obj6);
  [
    { "op": "add", "path": ['b', 3], "value": 5 }
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

  pathConverter ||
    (pathConverter = function(arr) {
      return arr;
    });

  var permutations = [{basePath: [], diffs: {remove: [], replace: [], add: []}}];

  function getDiff(obj1, obj2, permutation) {
    console.log('%%% at getDiff');
    console.log(`obj1 ${JSON.stringify(obj1)}`);
    console.log(`obj2 ${JSON.stringify(obj2)}`);
    console.log(`permutation ${JSON.stringify(permutation)}`);

    var obj1Keys = Object.keys(obj1);
    var obj1KeysLength = obj1Keys.length;
    var obj2Keys = Object.keys(obj2);
    var obj2KeysLength = obj2Keys.length;
    var path;

    var basePath = permutation.basePath;
    var diffs = permutation.diffs;
    var newPermutation;

    // if both objects are arrays and obj1 length > obj2 length
    // we will also try trimming obj1 from left, to see if it leads to a shorter path
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
      path = basePath.concat(key);
      pushReplaces(key, obj1, obj2, path, permutation);
    }

    // if both objects are arrays and obj1 length > obj2 length
    // try trimming obj1 from left in case this creates a more efficient diff array.
    if (newPermutation) {
      // console.log('### newPermutation', JSON.stringify(newPermutation, null, 2));
      for (var i = 0; i < lengthDelta; i++) {
        // console.log('^^^^ lengthDelta', lengthDelta);
        path = newPermutation.basePath.concat(i);
        newPermutation.diffs.remove.push({
          op: 'remove',
          path: pathConverter(path),
        });
      }

      // now make a copy of obj1 with excess elements left trimmed and see if any replaces
      var obj1Trimmed = obj1.slice(lengthDelta);;
      for (var i = 0; i < obj2KeysLength; i++) {
        var basePath2 = newPermutation.basePath;
        var key = Number(obj2Keys[i]) + lengthDelta;
        path = basePath2.concat(key);

        // console.log('&&& at pushReplaces');
        // console.log(`obj1 ${JSON.stringify(obj1)}`);
        // console.log(`obj2 ${JSON.stringify(obj2)}`);

        pushReplaces(key, obj1Trimmed, obj2, path, newPermutation);
      }
    }
  }

  getDiff(obj1, obj2, permutations[0]);
  // console.log('^^^^ permutations', JSON.stringify(permutations, null, 2));

  // BUG is that not all permutations are from root (`base: []`)
  var finalDiffs = permutations.sort(
    (a, b) => diffStepCount(a) > diffStepCount(b) ? 1 : -1
  )[0].diffs;
  return finalDiffs.remove
    .reverse()
    .concat(finalDiffs.replace)
    .concat(finalDiffs.add);

  function pushReplaces(key, obj1, obj2, path, permutation) {
    var obj1AtKey = obj1[key];
    var obj2AtKey = obj2[key];
    var diffs = permutation.diffs;

    if(!(key in obj1) && obj2AtKey) {
      var obj2Value = obj2AtKey;
      diffs.add.push({
        op: 'add',
        path: pathConverter(path),
        value: obj2Value,
      });
    } else if(obj1AtKey !== obj2AtKey) {
      if(Object(obj1AtKey) !== obj1AtKey ||
        Object(obj2AtKey) !== obj2AtKey) {
        pushReplace(path, diffs, obj2AtKey);
      } else {
        if(!Object.keys(obj1AtKey).length &&
          !Object.keys(obj2AtKey).length &&
          String(obj1AtKey) != String(obj2AtKey)) {
          pushReplace(path, diffs, obj2AtKey);
        } else {
          permutation.basePath = path;
          getDiff(obj1AtKey, obj2AtKey, permutation);
        }
      }
    }
  }

  function pushReplace(path, diffs, newValue) {
    diffs.replace.push({
      op: 'replace',
      path: pathConverter(path),
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
  var diffs = permutation.diffs;
  return diffs.remove.length + diffs.replace.length + diffs.add.length;
}

function jsonPatchPathConverter(arrayPath) {
  return [''].concat(arrayPath).join('/');
}
