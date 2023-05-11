var objectDeepOmit = deepOmit;

/*
let obj = {a:3, b:{c:5, d:7}, e:[1,2,3]};
omit(obj, 'b.c'); // {a:3, b:{d:7}, e:[1,2,3]};
omit(obj, ['a','b','c']); // {a:3, b:{d:7}, e:[1,2,3]};
omit(obj, 'e.1'); // {a: 3, b:{c:5, d:7}, e:[1,3]};
*/

function deepOmit(obj, propsArg) {
  var props, lastProp;
  if (Array.isArray(propsArg)) {
    props = propsArg.slice(0);
  }
  if (typeof propsArg == 'string') {
    props = propsArg.split('.');
  }
  if (typeof propsArg == 'symbol') {
    props = [propsArg];
  }
  if (!Array.isArray(props)) {
    throw new Error('props arg must be an array, a string or a symbol');
  }
  lastProp = props.pop();
  if (!lastProp) {
    return false;
  }
  var thisProp;
  while ((thisProp = props.shift())) {
    if (typeof obj[thisProp] == 'undefined') {
      return false;
    }
    obj = obj[thisProp];
    if (!obj || typeof obj != 'object') {
      return false;
    }
  }
  if (Array.isArray(obj)) {
    obj.splice(parseInt(lastProp), 1);
  } else {
    delete obj[lastProp];
  }
  return true;
}

export {objectDeepOmit as default};
