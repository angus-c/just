var expr = require('./utils/regexes');

var exports = module.exports = function (line) {
  
  return {
    type: 'version',
    raw: line
  };
};

exports.equals = function (line) {
  
  return expr.version.test(line);
};