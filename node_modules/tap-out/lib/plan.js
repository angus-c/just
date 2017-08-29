var expr = require('./utils/regexes');

var exports = module.exports = function (line) {
  var m = expr.plan.exec(line);
  return {
    type: 'plan',
    raw: line,
    from: m[1] && Number(m[1]),
    to: m[2] && Number(m[2]),
    skip: m[3]
  };
};

exports.equals = function (line) {

  return expr.plan.test(line);
};