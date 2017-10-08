var types = module.exports = {
  result: require('./result'),
  assert: require('./assert'),
  test: require('./test'),
  version: require('./version'),
  plan: require('./plan'),
  is: function (type, line) {
    
    var type = types[type];
    
    if (!type) {
      return false;
    }
    
    return type.equals(line);
  }
};