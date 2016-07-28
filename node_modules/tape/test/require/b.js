var tape = require('../..');

tape.test('module-b', function(t) {
  t.pass('loaded module b')
  t.end()
})

global.module_b = true