"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _progressBar = require("./progressBar");

var _progressBar2 = _interopRequireDefault(_progressBar);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _pad = require("pad");

var _pad2 = _interopRequireDefault(_pad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cwd = process.cwd();

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this.logs = [];
  }

  _createClass(Logger, [{
    key: "_log",
    value: function _log(type, verbose, style, message, error) {
      this.logs.push({
        type: type,
        message: message,
        error: error
      });

      if (verbose) {
        return;
      }

      if (error) {
        message += "\n" + (error.stack || error);
      }

      if (style) {
        message = style(message);
      }

      _progressBar2.default.clear();
      if (process.env.NODE_ENV !== "test") {
        console.log(message);
      }
      _progressBar2.default.restore();
    }
  }, {
    key: "debug",
    value: function debug(message) {
      var verbose = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      this._log("debug", verbose, _chalk2.default.blue, message);
    }
  }, {
    key: "info",
    value: function info(message) {
      var verbose = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      this._log("info", verbose, _chalk2.default.white, message);
    }
  }, {
    key: "success",
    value: function success(message) {
      var verbose = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      this._log("success", verbose, _chalk2.default.green, message);
    }
  }, {
    key: "warning",
    value: function warning(message) {
      var verbose = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      this._log("warning", verbose, _chalk2.default.yellow, message);
    }
  }, {
    key: "error",
    value: function error(message, _error) {
      var verbose = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      this._log("error", verbose, _chalk2.default.red, message, _error);
    }
  }, {
    key: "newLine",
    value: function newLine() {
      this.info("");
    }
  }, {
    key: "logifyAsync",
    value: function logifyAsync(target, property, descriptor) {
      var _this = this;

      var message = target.name + "." + property;
      var method = descriptor.value;

      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var callback = args.pop();
        var msg = _this._formatMethod(message, args);

        _this.info(msg, true);

        // wrap final callback
        args.push(function (error, value) {
          if (error) {
            _this.error(msg, true);
          } else {
            _this.success(msg + " => " + _this._formatValue(value), true);
          }

          callback(error, value);
        });

        method.apply(undefined, args);
      };
    }
  }, {
    key: "logifySync",
    value: function logifySync(target, property, descriptor) {
      var _this2 = this;

      var message = target.name + "." + property;
      var method = descriptor.value;

      return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var msg = _this2._formatMethod(message, args);

        _this2.info(msg, true);

        try {
          var result = method.apply(undefined, args);
          _this2.success(msg + " => " + _this2._formatValue(result), true);
          return result;
        } catch (error) {
          _this2.error(msg, error, true);
          throw error;
        }
      };
    }
  }, {
    key: "_formatMethod",
    value: function _formatMethod(method, args) {
      return (0, _pad2.default)(method, 30, " ") + "(" + this._formatArguments(args) + ")";
    }
  }, {
    key: "_formatArguments",
    value: function _formatArguments(args) {
      return args.map(this._formatValue).join(", ");
    }
  }, {
    key: "_formatValue",
    value: function _formatValue(arg) {
      if (typeof arg === "function") {
        return "function " + arg.name + "() {...}";
      }

      return (JSON.stringify(arg) || "").replace(cwd, ".");
    }
  }]);

  return Logger;
}();

exports.default = new Logger();
module.exports = exports["default"];