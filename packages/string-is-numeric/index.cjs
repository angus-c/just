module.exports = isNumeric;

/*
 isNumeric(""); // false
 isNumeric("123"); // true
 isNumeric("123.123"); // true
 isNumeric("123.123.123"); // false
 isNumeric("abc"); // false
 isNumeric("1e8"); // true
 isNumeric("1e-8"); // true
 isNumeric("1e-8.1"); // false
 isNumeric("1aa"); // false
*/

function isNumeric(str) {
  var type = typeof str;

  return (
    (type === 'string' || type === 'number') &&
    !isNaN(parseFloat(str)) &&
    isFinite(str)
  );
}
