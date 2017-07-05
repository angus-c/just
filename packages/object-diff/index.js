module.exports = diff;

/*
  Diffs are in JSON Patch format (RFC 6902)

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
    { "op": "replace", "path": "/a", "value": 3 }
    { "op": "remove", "path": "/b" },
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
*/

function diff(obj1, obj2, path, diffs) {
  // var typeOfObj1 = ({}).toString.call(obj1).slice(8, -1).toLowerCase();
  // if (typeOfObj1 != 'object') {
  //   throw new Error('obj1 must be a non-array object ');
  // }
  // var typeOfObj2 = ({}).toString.call(obj2).slice(8, -1).toLowerCase();
  // if (typeOfObj2 != 'object') {
  //   throw new Error('obj2 must be a non-array object ');
  // }

  !path && (path = '');
  !diffs && (diffs = []);
  var obj1Keys = Object.keys(obj1);
  var obj1KeysLength = obj1Keys.length;
  var obj2Keys = Object.keys(obj2);
  var obj2KeysLength = obj2Keys.length;

  for (var i = 0; i < obj1KeysLength; i++) {
    var key = obj1Keys[i];
    var removePath = path + '/' + key;
    if (!obj2[key]) {
      diffs.push({
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
      diffs.push({
        op: 'add',
        path: updatePath,
        value: Object(obj2Value) !== obj2Value ? obj2Value : JSON.stringify(obj2Value)
      });
    } else if (obj1[key] != obj2[key]) {
      if (Object(obj2[key]) !== obj2[key]) {
        diffs.push({
          op: 'replace',
          path: updatePath,
          value: obj2[key]
        });
      } else {
        diff(obj1[key], obj2[key], updatePath, diffs);
      }
    }
  }

  return diffs;
}
