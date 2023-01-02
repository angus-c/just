var functionPipe = pipe;
/*
pipe("hello", (a) => a.concat(" world")); // "hello world"
pipe(5, a => a * 2, b => b + 1); // 11
*/

function pipe(value, ...fns) {
  if (!arguments.length) {
    throw new Error('expected one value argument and least one function argument');
  }
  if (!fns.length) {
    throw new Error(
      'expected at least one (and probably more) function arguments'
    );
  }

  var result = fns[0](value);
  var len = fns.length;
  for (var i = 1; i < len; i++) {
    result = fns[i](result);
  }
  return result;
}

export {functionPipe as default};
