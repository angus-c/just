module.exports = typeOf;

/*
  typeOf({}); // 'object'
  typeOf([]); // 'array'
  typeOf(function() {}); // 'function'
  typeOf(/a/); // 'regexp'
  typeOf(new Date()); // 'date'
  typeOf(null); // 'null'
  typeOf(undefined); // 'undefined'
  typeOf('a'); // 'string'
  typeOf(1); // 'number'
  typeOf(true); // 'boolean'
*/

function typeOf(obj) {
  if (obj === null) {
    return 'null';
  }
  if (obj !== Object(obj)) {
    return typeof obj;
  }
  return ({}).toString.call(obj).slice(8, -1).toLowerCase();
}
