"use strict";

var run = require("../test").run
var Logger = require("./utils/logger").Logger

exports["test existence of all assert methods on assert"] = function (assert) {
  var functionType, methods;
  functionType = "function"
  methods = ["ok", "equal", "notEqual", "deepEqual", "notDeepEqual", "throws"]
  run({
    "test fixture": function (assert) {
      methods.forEach(function (name) {
        assert.equal(typeof assert[name], functionType,
                     "`" + name + "` must be method of `assert`")
      })
    }
  }, new Logger(function(passes) {
    assert.equal(passes.length, methods.length, "all methdos were found")
  }))
}

exports["test correctness of `assert.ok`"] = function (assert) {
  var valid, invalid, report
  valid = [1, -9, true, ",.", {}, function () {}, ["1"], Infinity]
  invalid = [null, undefined, false, "", 0, NaN]
  report = null

  run({
    "test fixture": function (assert) {
      valid.forEach(function (value, index) {
        assert.ok(value, value + " is valid")
      })

      invalid.forEach(function (value, index) {
        assert.ok(value, value + " is invalid")
      })
    }
  }, Logger(function(passes, fails, errors) {
    assert.equal(passes.length, valid.length,
                 "Amount of passed test must match amount of valid inputs")
    assert.equal(fails.length, invalid.length,
                 "Amount of failed test must match amount of invalid inputs")
    assert.equal(errors.length, 0, "Must be no errors")
  }))
}

exports["test correctness of `assert.equal`"] = function (assert) {
  var valid, invalid

  valid = [
    [1, 1],
    [450, 450],
    ["string", "" + "s" + "tring"],
    [undefined,
    {}.oops],
    [null, null],
    [String("test"), "test"],
    [String("test"), String("test")],
    [null, undefined],
    [1, true],
    [2 / 0, Infinity],
    [JSON.stringify({
      bla: 3
    }), JSON.stringify({
      bla: 3
    })]
  ]
  invalid = [
    [0, 4],
    [0, null],
    [undefined, 0],
    [{}, {}],
    [NaN, NaN], // wtfjs
    [JSON.parse('{ "bla": 3 }'), JSON.parse('{ "bla": 3 }')]
  ]

  run({
    "test fixture": function (assert) {
      valid.forEach(function (value, index) {
        var message = "`" + value[0] + "` is equal to `" + value[1] + "`"
        assert.equal(value[0], value[1], message)
      })

      invalid.forEach(function (value, index) {
        var message = "`" + value[0] + "` is not equal to `" + value[1] + "`"
        assert.equal(value[0], value[1], message)
      })
    }
  }, Logger(function(passes, fails, errors) {
    assert.equal(passes.length, valid.length,
                 "Amount of passed test must match amount of valid inputs")
    assert.equal(fails.length, invalid.length,
                 "Amount of failed test must match amount of invalid inputs")
    assert.equal(errors.length, 0, "Must be no errors")
  }))
}

exports["test correctness of `assert.deepEqual`"] = function (assert) {
  var valid, invalid, report
  valid = [
    [ [], [] ],
    [ {}, {} ],
  ]
  invalid = [
    [ [], undefined ],
    [ [], [1] ]
  ]
  report = null

  run({
    "test fixture": function (assert) {
      valid.forEach(function (value, index) {
        var message = "`" + value[0] + "` is deepEqual of `" + value[1] + "`"
        assert.deepEqual(value[0], value[1], message)
      })

      invalid.forEach(function (value, index) {
        var message = "`" + value[0] + "` is not deepEqual of `" + value[1] + "`"
        assert.deepEqual(value[0], value[1], message)
      })
    }
  }, Logger(function(passes, fails, errors) {
    assert.equal(passes.length, valid.length,
                 "Amount of passed test must match amount of valid inputs")
    assert.equal(fails.length, invalid.length,
                 "Amount of failed test must match amount of invalid inputs")
    assert.equal(errors.length, 0, "Must be no errors")
  }))
}

if (require.main === module)
  require("../test").run(exports)
