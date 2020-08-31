module.exports = has;

/*
  const obj = {a: {aa: {aaa: 2}}, b: 4};

  has(obj, 'a.aa.aaa'); // true
  has(obj, ['a', 'aa', 'aaa']); // true

  has(obj, 'b.bb.bbb'); // false
  has(obj, ['b', 'bb', 'bbb']); // false

  has(obj.a, 'aa.aaa'); // true
  has(obj.a, ['aa', 'aaa']); // true

  has(obj.b, 'bb.bbb'); // false
  has(obj.b, ['bb', 'bbb']); // false

  has(null, 'a'); // false
  has(undefined, ['a']); // false

  const obj = {a: {}};
  const sym = Symbol();
  obj.a[sym] = 4;
  has(obj.a, sym); // true
*/

function has(obj, propsArg) {
  if (!obj) {
    return false;
  }
  var props, prop;
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

  while (props.length) {
    prop = props.shift();

    // if we are recursing, but met a nullish value, we cannot
    // access it via .hasOwnProperty and should return negatively
    if (obj == null) {
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
    if (props.length === 0) {
      return true;
    }

    obj = obj[prop];
  }

  return false;
}
