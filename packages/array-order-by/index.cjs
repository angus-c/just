module.exports = orderBy;

function getValueFromParam(param, item) {
  if (typeof param === 'object') {
    if (typeof param.field === 'function') {
      return param.field(item);
    }
    return item[param.field];
  }
  if (typeof param === 'function') {
    return param(item);
  }
  return item[param];
}

function createSortFn(params) {
  return function(a, b) {
    for (var i = 0; i < params.length; i++) {
      var param = params[i];
      var valueA = getValueFromParam(param, a);
      var valueB = getValueFromParam(param, b);
      var isDesc = typeof param === 'object' && param.order === 'desc';
      if (valueA < valueB) {
        return isDesc ? 1 : -1;
      }
      if (valueA > valueB) {
        return isDesc ? -1 : 1;
      }
    }
    return 0;
  };
}

function orderBy(arr, params) {
  if (!Array.isArray(arr)) {
    throw new Error('arr should be an array');
  }

  if (
    params !== undefined &&
    (!Array.isArray(params) || (Array.isArray(params) && params.length < 1))
  ) {
    throw new Error('params should be an array containing at least one element');
  }

  var copied = arr.slice();

  if (!params) {
    return copied.sort(function(a, b) {
      return a - b;
    });
  }

  return copied.sort(createSortFn(params));
}
