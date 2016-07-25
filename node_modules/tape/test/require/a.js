var tape = require('../..');

tape.test('module-a', function(t) {
  t.pass('loaded module a')
  t.end()
})

global.module_a = true