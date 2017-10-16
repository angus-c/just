"use strict";

var run = require("../test").run
var Logger = require("./utils/logger").Logger

exports["test must call callback to complete it"] = function (assert, done) {

    var isDone, isTimerCalled, report, completeInnerTest

    isDone = isTimerCalled = false
    report = null

    run({
      "test:must throw": function (assert, done) {
        completeInnerTest = done
        assert.equal(1, 1, "Must be equal")
      }
    }, Logger(function (passes, fails, errors) {
      isDone = true
      assert.equal(isTimerCalled, true, "timer should be called already")
      assert.equal(passes.length, 1, "Must contain one pass")
      assert.equal(fails.length, 0, "No fails")
      assert.equal(errors.length, 0, "No errors")
      done()
    }))

    setTimeout(function () {
      assert.equal(isDone, false, "callback must not be called")
      isTimerCalled = true
      completeInnerTest()
    }, 0)
}

exports["test multiple tests with timeout"] = function (assert, done) {
  var tests = 0

  run({
    "test async": function (assert, done) {
      tests ++
      setTimeout(function () {
        assert.ok(true)
        assert.ok(false)
        done()
      }, 100)
    },
    "test throws": function (assert) {
      tests ++
      throw new Error("boom")
    },
    "test fail fast": function (assert) {
      tests ++
      // TODO: Find a better solution for browser.
      //require("assert").ok(0)
      assert.ok(0)
    },
    "ignore if does not starts with test": function () {
      tests ++
    },
    "test sync pass": function (assert) {
      tests ++
      assert.equal(1, 2)
      assert.equal(2, 2)
    }
  }, Logger(function (passes, fails, errors) {
    assert.equal(tests, 4, "All test were executed")
    assert.equal(passes.length, 2, "Must pass two tests")
    assert.equal(fails.length, 3, "Must fail tree tests")
    assert.equal(errors.length, 1, "Must report one error")
    done()
  }))
}

if (require.main === module)
  require("../test").run(exports)
