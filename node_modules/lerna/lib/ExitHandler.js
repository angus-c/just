"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FileSystemUtilities = require("./FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _pad = require("pad");

var _pad2 = _interopRequireDefault(_pad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExitHandler = function () {
  function ExitHandler() {
    _classCallCheck(this, ExitHandler);

    this.errorsSeen = {};
  }

  _createClass(ExitHandler, [{
    key: "writeLogs",
    value: function writeLogs() {
      var filePath = _path2.default.join(process.cwd(), "lerna-debug.log");
      var fileContent = this._formatLogs(_logger2.default.logs);

      _FileSystemUtilities2.default.writeFileSync(filePath, fileContent);
    }
  }, {
    key: "_formatLogs",
    value: function _formatLogs(logs) {
      var _this = this;

      return logs.map(function (log) {
        return _this._formatLog(log);
      }).join("\n");
    }
  }, {
    key: "_formatLog",
    value: function _formatLog(log) {
      return this._formatType(log.type) + log.message + this._formatError(log.error);
    }
  }, {
    key: "_formatType",
    value: function _formatType(type) {
      return (0, _pad2.default)("lerna(" + type + ")", 15, " ");
    }
  }, {
    key: "_formatError",
    value: function _formatError(error) {
      if (!error || this.errorsSeen[error.toString()]) {
        return "";
      }

      var message = [];

      this.errorsSeen[error.toString()] = true;

      if (error) {
        message += error.stack || error;
      }

      message = message.split("\n").map(function (line) {
        return "    " + line;
      }).join("\n");

      return "\n" + message;
    }
  }]);

  return ExitHandler;
}();

exports.default = ExitHandler;
module.exports = exports["default"];