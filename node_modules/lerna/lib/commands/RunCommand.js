"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NpmUtilities = require("../NpmUtilities");

var _NpmUtilities2 = _interopRequireDefault(_NpmUtilities);

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

var RunCommand = function (_Command) {
  _inherits(RunCommand, _Command);

  function RunCommand() {
    _classCallCheck(this, RunCommand);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RunCommand).apply(this, arguments));
  }

  _createClass(RunCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      var _this2 = this;

      this.script = this.input[0];
      this.args = this.input.slice(1);

      if (!this.script) {
        callback(new Error("You must specify which npm script to run."));
        return;
      }

      this.packagesWithScript = this.packages.filter(function (pkg) {
        return pkg.scripts && pkg.scripts[_this2.script];
      });

      if (!this.packagesWithScript.length) {
        callback(new Error("No packages found with the npm script '" + this.script + "'"));
        return;
      }

      if (this.flags.scope) {
        this.logger.info("Scoping to packages that match '" + this.flags.scope + "'");
        try {
          this.packagesWithScript = _PackageUtilities2.default.filterPackages(this.packagesWithScript, this.flags.scope);
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
      var _this3 = this;

      this.runScriptInPackages(function (err) {
        if (err) {
          callback(err);
        } else {
          _this3.logger.success("Successfully ran npm script '" + _this3.script + "' in packages:");
          _this3.logger.success(_this3.packagesWithScript.map(function (pkg) {
            return "- " + pkg.name;
          }).join("\n"));
          callback(null, true);
        }
      });
    }
  }, {
    key: "runScriptInPackages",
    value: function runScriptInPackages(callback) {
      var _this4 = this;

      _async2.default.parallelLimit(this.packagesWithScript.map(function (pkg) {
        return function (cb) {
          _this4.runScriptInPackage(pkg, cb);
        };
      }), this.concurrency, callback);
    }
  }, {
    key: "runScriptInPackage",
    value: function runScriptInPackage(pkg, callback) {
      var _this5 = this;

      _NpmUtilities2.default.runScriptInDir(this.script, this.args, pkg.location, function (err, stdout) {
        if (err) {
          _this5.logger.error("Errored while running npm script '" + _this5.script + "' in '" + pkg.name + "'", err);
        } else {
          _this5.logger.info(stdout);
        }
        callback(err);
      });
    }
  }]);

  return RunCommand;
}(_Command3.default);

exports.default = RunCommand;
module.exports = exports["default"];