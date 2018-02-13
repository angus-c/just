module.exports = get;

/*
  const obj = {a: {aa: {aaa: 2}}, b: 4};

  get(obj, 'a.aa.aaa'); // 2
  get(obj, ['a', 'aa', 'aaa']); // 2

  get(obj, 'b.bb.bbb'); // undefined
  get(obj, ['b', 'bb', 'bbb']); // undefined

  get(obj.a, 'aa.aaa'); // 2
  get(obj.a, ['aa', 'aaa']); // 2

  get(obj.b, 'bb.bbb'); // undefined
  get(obj.b, ['bb', 'bbb']); // undefined

  const obj = {a: {}};
  const sym = Symbol();
  obj.a[sym] = 4;
  get(obj.a, sym); // 4
*/

function get(obj, props) {
  if (!obj) {
    return obj;
  }
  if (typeof props == 'string') {
    props = props.split('.');
  }
  if (typeof props == 'symbol') {
    props = [props];
  }
  var prop;
  while (props.length) {
    prop = props.shift();
    obj = obj[prop];
    if (!obj) {
      return obj;
    }
  }
  return obj;
}
