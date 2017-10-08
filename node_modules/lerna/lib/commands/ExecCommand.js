"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ChildProcessUtilities = require("../ChildProcessUtilities");

var _ChildProcessUtilities2 = _interopRequireDefault(_ChildProcessUtilities);

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

var _PackageUtilities = require("../PackageUtilities");

var _PackageUtilities2 = _interopRequireDefault(_PackageUtilities);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExecCommand = function (_Command) {
  _inherits(ExecCommand, _Command);

  function ExecCommand() {
    _classCallCheck(this, ExecCommand);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ExecCommand).apply(this, arguments));
  }

  _createClass(ExecCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      this.command = this.input[0];
      this.args = this.input.slice(1);

      if (!this.command) {
        callback(new Error("You must specify which command to run."));
        return;
      }

      if (this.flags.scope) {
        this.logger.info("Scoping to packages that match '" + this.flags.scope + "'");
        try {
          this.packages = _PackageUtilities2.default.filterPackages(this.packages, this.flags.scope);
        } catch (err) {
          callback(err);
          return;
        }
      }

      callback(null, true);
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      var _this2 = this;

      _async2.default.parallelLimit(this.packages.map(function (pkg) {
        return function (cb) {
          _this2.runCommandInPackage(pkg, cb);
        };
      }), this.concurrency, callback);
    }
  }, {
    key: "runCommandInPackage",
    value: function runCommandInPackage(pkg, callback) {
      var _this3 = this;

      _ChildProcessUtilities2.default.spawn(this.command, this.args, { cwd: pkg.location }, function (code) {
        if (code) {
          _this3.logger.error("Errored while running command '" + _this3.command + "' " + ("with arguments '" + _this3.args.join(" ") + "' in '" + pkg.name + "'"));
        }
        callback(code);
      });
    }
  }]);

  return ExecCommand;
}(_Command3.default);

exports.default = ExecCommand;
module.exports = exports["default"];