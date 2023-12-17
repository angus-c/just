var arrayOrderBy = orderBy;

function getValueFromParam(param, item) {
  if (typeof param.property === 'function') {
    return param.property(item);
  }

  if (typeof param.property === 'string') {
    return item[param.property];
  }

  throw new TypeError('Type of `property` property should be a string or a function');
}

function createSortFn(params) {
  return function(a, b) {
    for (var i = 0; i < params.length; i++) {
      var param = params[i];

      if (param == null || typeof param !== 'object' || !('property' in param)) {
        throw new TypeError('Element in params array should be an object with `property` property');
      }

      var valueA = getValueFromParam(param, a);

      var valueB = getValueFromParam(param, b);

      var isDesc = param.order === 'desc';

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
    throw new TypeError('arr should be an array');
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

export {arrayOrderBy as default};
