"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

var _FileSystemUtilities = require("../FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _PromptUtilities = require("../PromptUtilities");

var _PromptUtilities2 = _interopRequireDefault(_PromptUtilities);

var _progressBar = require("../progressBar");

var _progressBar2 = _interopRequireDefault(_progressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CleanCommand = function (_Command) {
  _inherits(CleanCommand, _Command);

  function CleanCommand() {
    _classCallCheck(this, CleanCommand);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CleanCommand).apply(this, arguments));
  }

  _createClass(CleanCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      var _this2 = this;

      if (this.flags.yes) {
        callback(null, true);
      } else {
        this.logger.info("About remove the following directories:\n" + this.packages.map(function (pkg) {
          return "- " + pkg.nodeModulesLocation;
        }).join("\n"));
        _PromptUtilities2.default.confirm("Proceed?", function (confirmed) {
          if (confirmed) {
            callback(null, true);
          } else {
            _this2.logger.info("Okay bye!");
            callback(null, false);
          }
        });
      }
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      var _this3 = this;

      _progressBar2.default.init(this.packages.length);
      this.rimrafNodeModulesInPackages(function (err) {
        _progressBar2.default.terminate();
        if (err) {
          callback(err);
        } else {
          _this3.logger.info("All clean!");
          callback(null, true);
        }
      });
    }
  }, {
    key: "rimrafNodeModulesInPackages",
    value: function rimrafNodeModulesInPackages(callback) {
      _async2.default.parallelLimit(this.packages.map(function (pkg) {
        return function (cb) {
          _FileSystemUtilities2.default.rimraf(pkg.nodeModulesLocation, function (err) {
            _progressBar2.default.tick(pkg.name);
            cb(err);
          });
        };
      }), this.concurrency, callback);
    }
  }]);

  return CleanCommand;
}(_Command3.default);

exports.default = CleanCommand;
module.exports = exports["default"];