var expr = require('./utils/regexes');

var exports = module.exports = function (line) {
  
  var  m = expr.comment.exec(line);
  
  return {
    type: 'test',
    name: m[1],
    raw: line
  };
};

exports.equals = function (line) {
  
  // TODO: need a more thorough test for this???
  return line.indexOf('# ') === 0;
};