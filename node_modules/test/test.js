"use strict";

var Assert = require("./assert").Assert
var Logger = require("./logger").Logger


var ERR_COMPLETED_ASSERT = "Assert in completed test"
var ERR_COMPLETED_COMPLETE = "Attemt to complete test more then one times"
var ERR_EXPECT = "AssertionError"


/**
 * Creates a test function.
 */
function Test(name, unit, logger, Assert) {
  var isSync = unit.length <= 1
  var isFailFast = !unit.length
  var isDone = false
  return function test(next) {
    logger = logger.section(name)
    var assert = Assert(logger)
    assert.end = function end() {
      if (isDone) return logger.error(Error(ERR_COMPLETED_COMPLETE))
      isDone = true
      next()
    }

    try {
      var result = unit(assert, assert.end)
      // If it"s async test that returns a promise.
      if (result && typeof(result.then) === "function") {
        result.then(function passed() {
          logger.pass("passed")
          assert.end()
        }, function failed(reason) {
          logger.fail(reason)
          assert.end()
        })
      } else {
        if (isFailFast) logger.pass("passed")
        if (isSync) assert.end()
      }
    } catch (exception) {
      if (ERR_EXPECT === exception.name) assert.fail(exception)
      else logger.error(exception)
      assert.end()
    }
  }
}

function isTest(name) { return name.indexOf("test") === 0 }

/**
 * Creates a test suite / group. Calling returned function will execute
 * all test in the given suite.
 */
function Suite(name, units, logger, Assert) {
  // Collecting properties that represent test functions or suits.
  var names = Object.keys(units).filter(isTest)
  Assert = units.Assert || Assert
  // Returning a function that executes all test in this suite and all it"s
  // sub-suits.
  return function suite(end) {
    // Chaining test / suits so that each is executed after last is done.
    function next() {
      if (!names.length) return end()
      var name = names.shift()
      var unit = Unit(name, units[name], logger, units.Assert || Assert)
      unit(next)
    }
    next((logger = logger.section(name)))
  }
}
function Unit(name, units, logger, Assert) {
  return typeof(units) === "function" ? Test(name, units, logger, Assert)
                                      : Suite(name, units, logger, Assert)
}


/**
 * Test runner function.
 */
exports.run = function run(units, logger) {
  var exit = logger ? false : true
  logger = logger || new Logger()
  var unit = Unit("Running all tests:", units, logger, Assert)
  unit(function done() {
    logger.report()
    var failed = logger.errors.length !== 0 || logger.fails.length !== 0
    // Exit only if `process.exit` exist and if no logger was provided.
    if (exit && process.exit) process.exit(failed ? 1 : 0)
  })
}
