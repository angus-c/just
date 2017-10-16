"use strict";

var utils = require("./utils")


/**
 * The `AssertionError` is defined in assert.
 * @extends Error
 * @example
 *  new assert.AssertionError({
 *    message: message,
 *    actual: actual,
 *    expected: expected
 *  })
 */
function AssertionError(options) {
  var assertionError = Object.create(AssertionError.prototype);

  if (utils.isString(options))
    options = { message: options };
  if ("actual" in options)
    assertionError.actual = options.actual;
  if ("expected" in options)
    assertionError.expected = options.expected;
  if ("operator" in options)
    assertionError.operator = options.operator;

  assertionError.message = options.message;
  assertionError.stack = new Error().stack;
  return assertionError;
}
AssertionError.prototype = Object.create(Error.prototype, {
  constructor: { value: AssertionError },
  name: { value: "AssertionError", enumerable: true },
  toString: { value: function toString() {
    var value;
    if (this.message) {
      value = this.name + " : " + this.message;
    }
    else {
      value = [
        this.name + " : ",
        utils.source(this.expected),
        this.operator,
        utils.source(this.actual)
      ].join(" ");
    }
    return value;
  }}
});
exports.AssertionError = AssertionError;

function Assert(logger) {
  return Object.create(Assert.prototype, { _log: { value: logger }});
}
Assert.prototype = {
  fail: function fail(e) {
    this._log.fail(e);
  },
  pass: function pass(message) {
    this._log.pass(message);
  },
  error: function error(e) {
    this._log.error(e);
  },
  ok: function ok(value, message) {
    if (!!!value) {
      this.fail({
        actual: value,
        expected: true,
        message: message,
        operator: "=="
      });
    }
    else {
      this.pass(message);
    }
  },

  /**
   * The equality assertion tests shallow, coercive equality with `==`.
   * @example
   *    assert.equal(1, 1, "one is one");
   */
  equal: function equal(actual, expected, message) {
    if (actual == expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "=="
      });
    }
  },

  /**
   * The non-equality assertion tests for whether two objects are not equal
   * with `!=`.
   * @example
   *    assert.notEqual(1, 2, "one is not two");
   */
  notEqual: function notEqual(actual, expected, message) {
    if (actual != expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "!=",
      });
    }
  },

  /**
   * The equivalence assertion tests a deep (with `===`) equality relation.
   * @example
   *    assert.deepEqual({ a: "foo" }, { a: "foo" }, "equivalent objects")
   */
   deepEqual: function deepEqual(actual, expected, message) {
    if (isDeepEqual(actual, expected)) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "deepEqual"
      });
    }
  },

  /**
   * The non-equivalence assertion tests for any deep (with `===`) inequality.
   * @example
   *    assert.notDeepEqual({ a: "foo" }, Object.create({ a: "foo" }),
   *                        "object"s inherit from different prototypes");
   */
  notDeepEqual: function notDeepEqual(actual, expected, message) {
    if (!isDeepEqual(actual, expected)) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "notDeepEqual"
      });
    }
  },

  /**
   * The strict equality assertion tests strict equality, as determined by
   * `===`.
   * @example
   *    assert.strictEqual(null, null, "`null` is `null`")
   */
  strictEqual: function strictEqual(actual, expected, message) {
    if (actual === expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "==="
      });
    }
  },

  /**
   * The strict non-equality assertion tests for strict inequality, as
   * determined by `!==`.
   * @example
   *    assert.notStrictEqual(null, undefined, "`null` is not `undefined`");
   */
  notStrictEqual: function notStrictEqual(actual, expected, message) {
    if (actual !== expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "!=="
      })
    }
  },

  /**
   * The assertion whether or not given `block` throws an exception. If optional
   * `Error` argument is provided and it"s type of function thrown error is
   * asserted to be an instance of it, if type of `Error` is string then message
   * of throw exception is asserted to contain it.
   * @param {Function} block
   *    Function that is expected to throw.
   * @param {Error|RegExp} [Error]
   *    Error constructor that is expected to be thrown or a string that
   *    must be contained by a message of the thrown exception, or a RegExp
   *    matching a message of the thrown exception.
   * @param {String} message
   *    Description message
   *
   * @examples
   *
   *    assert.throws(function block() {
   *      doSomething(4)
   *    }, "Object is expected", "Incorrect argument is passed");
   *
   *    assert.throws(function block() {
   *      Object.create(5)
   *    }, TypeError, "TypeError is thrown");
   */
  throws: function throws(block, Error, message) {
    var threw = false;
    var exception = null;

    // If third argument is not provided and second argument is a string it
    // means that optional `Error` argument was not passed, so we shift
    // arguments.
    if (utils.isString(Error) && utils.isUndefined(message)) {
      message = Error;
      Error = undefined;
    }

    // Executing given `block`.
    try {
      block();
    }
    catch (e) {
      threw = true;
      exception = e;
    }

    // If exception was thrown and `Error` argument was not passed assert is
    // passed.
    if (threw && (utils.isUndefined(Error) ||
                 // If Error is thrown exception
                 (Error == exception) ||
                 // If passed `Error` is RegExp using it"s test method to
                 // assert thrown exception message.
                 (utils.isRegExp(Error) && Error.test(exception.message)) ||
                 // If passed `Error` is a constructor function testing if
                 // thrown exception is an instance of it.
                 (utils.isFunction(Error) && utils.instanceOf(exception, Error))))
    {
      this.pass(message);
    }

    // Otherwise we report assertion failure.
    else {
      var failure = {
        message: message,
        operator: "throws"
      };

      if (exception)
        failure.actual = exception;

      if (Error)
        failure.expected = Error;

      this.fail(failure);
    }
  }
};
exports.Assert = Assert;

function isDeepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  }

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  else if (utils.isDate(actual) && utils.isDate(expected)) {
    return actual.getTime() === expected.getTime();
  }

  // XXX specification bug: this should be specified
  else if (utils.isPrimitive(actual) || utils.isPrimitive(expected)) {
    return expected === actual;
  }

  else if (utils.instanceOf(actual, Error) ||
           utils.instanceOf(expected, Error)) {
    return actual.message === expected.message &&
           actual.type === expected.type &&
           actual.name === expected.name &&
           (actual.constructor && expected.constructor &&
            actual.constructor.name === expected.constructor.name)
  }

  // 7.3. Other pairs that do not both pass typeof value == "object",
  // equivalence is determined by ==.
  else if (!utils.isObject(actual) && !utils.isObject(expected)) {
    return actual == expected;
  }

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical "prototype" property. Note: this
  // accounts for both named and indexed properties on Arrays.
  else {
    return actual.prototype === expected.prototype &&
           isEquivalent(actual, expected);
  }
}

function isEquivalent(a, b, stack) {
  return isArrayEquivalent(Object.keys(a).sort(),
                           Object.keys(b).sort()) &&
          Object.keys(a).every(function(key) {
            return isDeepEqual(a[key], b[key], stack)
          });
}

function isArrayEquivalent(a, b, stack) {
  return utils.isArray(a) && utils.isArray(b) && a.length === b.length &&
         a.every(function(value, index) {
           return isDeepEqual(value, b[index]);
         });
}
