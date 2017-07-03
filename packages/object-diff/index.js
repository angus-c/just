/* eslint-disable */

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
  
  diff(obj4, obj5);
  [
    { "op": "replace", "path": "/a", "value": 3 }
    { "op": "replace", "path": "/b/2", "value": 4 }
  ]
  
*/

function map(obj, predicate) {
  var result = {};
  var keys = Object.keys(obj);
  var len = keys.length;
  for (var i = 0; i < len; i++) {
    var key = keys[i];
    result[key] = predicate(key, obj[key]);
  }
  return result;
}
