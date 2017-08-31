var tapeTest = require('tape');

module.exports = function (modulePath) {
  var moduleName = modulePath.split('/').slice(-2, -1)[0];

  var test = function (name, fn) {
    tapeTest('[' + moduleName + '] ' + name, fn);
  };
  test.only = function (name, fn) {
    tapeTest.only('[' + moduleName + '] ' + name, fn);
  };
  return test;
};
