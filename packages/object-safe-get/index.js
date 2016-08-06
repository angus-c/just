module.exports = get;

/*
  var obj = {a: {aa: {aaa: 2}}, b: 4};

  get(obj, 'a.aa.aaa'); // 2
  get(obj, ['a', 'aa', 'aaa']); // 2

  get(obj, 'b.bb.bbb'); // undefined
  get(obj, ['b', 'bb', 'bbb']); // undefined

  get(obj.a, 'aa.aaa'); // 2
  get(obj.a, ['aa', 'aaa']); // 2

  get(obj.b, 'bb.bbb'); // undefined
  get(obj.b, ['bb', 'bbb']); // undefined
*/

function get(obj, props) {
  if (typeof props == 'string') {
    props = props.split('.');
  }
  var prop;
  while (prop = props.shift()) {
    obj = obj[prop];
    if (!obj) {
      return obj;
    }
  }
  return obj;
}
