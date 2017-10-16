# Changes

## 0.6.0 / 2012-11-24

  - Fix assertion for error objects to ignore stack traces on PhantomJS
    & to make node does asserts them properly.

## 0.5.2 / 2012-10-31

  - Exit only when `process.exit` is defined. This enables use of browseryfied
    tests in browser.
  - Start testing with PanthomJS in a browser.

## 0.5.1 / 2012-10-31

  - Fix bug introduced in 0.5.0 that exited process with a wrong code.
  - Add `assert.end` function as an alternative to `done` callback.
  - Change module layout to match better node conventions.

## 0.5.0 / 2012-10-31

  - Switch to logging via `console.log` instead of `process.stdout` for
    better compatibility with browserify.
  - Exit process with error code if test fails, or with `0` if not.

## 0.4.4 / 2012-01-15

  - Improve `assert.throws` API to accept exception as an argument.

## 0.4.3 / 2011-11-15

   - Use newer version of ansi-font library.
    
## 0.4.2 / 2011-11-15

   - Use bug.url to avoid warning form NPM.

## 0.4.1 / 2011-07-18 ##

  - Improved error reporting.

## 0.4.0 / 2011-07-10 ##

  - Support for browser runtime.

## 0.3.0 / 2011-07-10 ##

  - Switching to Uncommonjs spec.
  - Simplifying implementation.

## 0.2.1 / 2011-06-10 ##

  - RegExp support for `assert.throws`.

## 0.2.0 / 2011-06-07 ##

  - Code refactoring & package restructuring.
  - Processing code through jsbeautifier for better readability.

## 0.1.1 / 2011-04-02 ##

  - Bugfix for `assert.throws` regression.

## 0.1.0 / 2011-02-24 ##

  - Package restructuring to support node@0.4.0

## 0.0.11 / 2011-02-16 ##

  - Removing 'use strict' where octal escape sequences were used.

## 0.0.10 / 2010-11-11 ##

  - Improved error reporting.

## 0.0.9 / 2010-11-01 ##

  - Switching to MIT license.
  - Fix for `deepEqual`

## 0.0.8 / 2010-10-23 ##

  - Even more improved fail reports.

## 0.0.7 / 2010-10-23 ##

  - Improved fail reports.

## 0.0.6 / 2010-10-08 ##

  - Improving project documentation.

## 0.0.5 / 2010-10-07 ##

  - Improved fail and error messages.

## 0.0.4 / 2010-10-07 ##

  - Adding more tests for custom asserts.

## 0.0.3 / 2010-10-06 ##

  - Rename `raises` bach to `throws` to follow the spec.

## 0.0.2 / 2010-09-29 ##

  - Bugfix.
  - Adding test.
  - Support for async tests.

## 0.0.1 / 2010-09-25 ##

  - Unit test runner port from narwhal.
