var types = require('./types');

module.exports = function (line) {
  
  if (types.is('version', line)) {
    return types.version(line);
  }
  
  if (types.is('result', line)) {
    return types.result(line);
  }
  
  if (types.is('assert', line)) {
    return types.assert(line);
  }
  
  if (types.is('test', line)) {
    return types.test(line);
  }

  if (types.is('plan', line)) {
    return types.plan(line);
  }
};