var objectEntries = entries;

/*
  // Object:
  entries({c: 8, a: 4}); // [['c', 8], ['a', 4]]
  entries({b: {bb: 4}, a: {aa: 2}}); // [['b', {bb: 4}], ['a', {aa: 2}]]
  entries({}); // []

  // Array:
  entries([{c: 8}, {a: 4}]); // [[0, {c: 8}], [1, {a: 4}]]
  entries(['À', 'mauvais', 'ouvrier', 'point', 'de', 'bon', 'outil'])
          // [[0, 'À'], [1, 'mauvais'] ... [6, 'outil']]
  entries([]); // []
*/

function entries(obj) {
  if ((typeof obj != 'object' && typeof obj != 'function') || obj == null) {
    throw new Error('argument to `entries` must be an object');
  }

  var result = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push([key, obj[key]]);
    }
  }
  return result;
}

export {objectEntries as default};
