module.exports = mode;

function mode(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  var map = {};
  var ArrLen = arr.length;
  for (var i = 0; i < ArrLen; i++) {
    var n = arr[i];
    if (!Number.isFinite(n)) {
      throw new Error('all values passed to `mode` must be numeric');
    }
    n in map ? map[n]++ : (map[n] = 1);
  }

  var mapKeys = Object.keys(map);
  var mapKeysLen = mapKeys.length;
  if (!mapKeysLen) {
    throw new Error('no values were passed to `mode`');
  }
  var maxOccurences = -1;
  var result;
  for (var i = 0; i < mapKeysLen; i++) {
    var thisKey = mapKeys[i];
    if (map[thisKey] > maxOccurences) {
      result = [Number(thisKey)];
      maxOccurences = map[thisKey];
    } else if (map[thisKey] == maxOccurences) {
      result.push(Number(thisKey));
    }
  }
  return result.length > 1
    ? result.sort(function(a, b) {
      return a >= b ? 1 : -1;
    })
    : result[0];
}
