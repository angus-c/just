module.exports = reduce;

function reduce(obj, predicate /*, initialValue*/) {
  var args = [callback];
  // `initialValue` is optional
  var hasInitialValue = 2 in arguments;
  hasInitialValue && args.push(arguments[2]);

  function callback(previousValue, currentKey, currentIndex, array) {
    // when `initialValue` is not provided then
    // `previousValue` is the value associated to the first key
    if (!hasInitialValue) {
      previousValue = obj[array[0]];
      hasInitialValue = true;
    }
    return predicate(
      previousValue,
      currentKey,
      obj[currentKey],
      currentIndex,
      array
    );
  }

  return Array.prototype.reduce.apply(Object.keys(obj), args);
}
