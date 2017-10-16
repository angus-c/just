"use strict";

var AssertBase = require("../assert").Assert
/**
 * Generates custom assertion constructors that may be bundled with a test
 * suite.
 * @params {String}
 *    names of assertion function to be added to the generated Assert.
 */
function Assert() {
  var descriptorMap = {}
  Array.prototype.forEach.call(arguments, function (name) {
    descriptorMap[name] = {
      value: function (message) {
        this.pass(message)
      }
    }
  })
  return function Assert() {
    return Object.create(AssertBase.apply(null, arguments), descriptorMap)
  }
}

exports["test suite"] = {
  Assert: Assert("foo"),
  "test that custom assertor is passed to test function": function (assert) {
    assert.ok("foo" in assert, "custom assertion function `foo` is defined")
    assert.foo("custom assertion function `foo` is called")
  },
  "test sub suite": {
    "test that `Assert` is inherited by sub suits": function (assert) {
      assert.ok("foo" in assert, "assertion function `foo` is defined")
    },
    "test sub sub suite": {
      Assert: Assert("bar"),
      "test that custom assertor is passed to test function": function (assert) {
        assert.ok("bar" in assert, "custom assertion function `bar` is defined")
        assert.bar("custom assertion function `bar` is called")
      },
      "test that `Assert` is not inherited by sub sub suits": function (assert) {
        assert.ok(!("foo" in assert), "assertion function `foo` is not defined")
      }
    }
  }
}

if (require.main === module)
  require("../test").run(exports)
