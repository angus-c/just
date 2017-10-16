"use strict";

var font = require("ansi-font/index")
var toSource = require("./utils").source

var INDENT = "  "

var report = console.log.bind(console)

function passed(message) {
  return font.green("\u2713 " + message)
}
function failed(message) {
  return font.red("\u2717 " + message)
}
function errored(message) {
  return font.magenta("\u26A1 " + message)
}

function indent(message, indentation) {
  indentation = undefined === indentation ? INDENT : indentation
  message = message || ""
  return message.replace(/^/gm, indentation)
}

function Logger(options) {
  if (!(this instanceof Logger)) return new Logger(options)

  options = options || {}
  var print = options.print || report
  var indentation = options.indentation || ""
  var results = options.results || { passes: [], fails: [], errors: [] }
  this.passes = results.passes
  this.fails = results.fails
  this.errors = results.errors
  results = this


  this.pass = function pass(message) {
    results.passes.push(message)
    print(indent(passed(message), indentation))
  }

  this.fail = function fail(error) {
    results.fails.push(error)
    var message = error.message
    if ("expected" in error)
      message += "\n  Expected: \n" + toSource(error.expected, INDENT)
    if ("actual" in error)
      message += "\n  Actual: \n" + toSource(error.actual, INDENT)
    if ("operator" in error)
      message += "\n  Operator: " + toSource(error.operator, INDENT)
    print(indent(failed(message), indentation))
  }

  this.error = function error(exception) {
    results.errors.push(exception)
    print(indent(errored(exception.stack || exception), indentation))
  }

  this.section = function section(title) {
    print(indent(title, indentation))
    return new Logger({
      print: print,
      indentation: indent(indentation),
      results: results
    })
  }

  this.report = function report() {
    print("Passed:" + results.passes.length +
          " Failed:" + results.fails.length +
          " Errors:" + results.errors.length)
  }
}

Logger.Logger = Logger
module.exports = Logger
