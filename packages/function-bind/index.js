module.exports = bind;

function slice(args, index) {
  return Array.prototype.slice.call(args, index || 0);
}

function bind(func, ctx) {
  var args = slice(arguments, 2);

  if ('bind' in Function && !this.__TEST_JUST__) {
    return func.bind(ctx, args);
  }

  return function() {
    return func.apply(ctx, args.concat(slice(arguments)));
  };
}
