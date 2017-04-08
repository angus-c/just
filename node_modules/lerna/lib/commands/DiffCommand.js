"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GitUtilities = require("../GitUtilities");

var _GitUtilities2 = _interopRequireDefault(_GitUtilities);

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

var _ChildProcessUtilities = require("../ChildProcessUtilities");

var _ChildProcessUtilities2 = _interopRequireDefault(_ChildProcessUtilities);

var _lodash = require("lodash.find");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DiffCommand = function (_Command) {
  _inherits(DiffCommand, _Command);

  function DiffCommand() {
    _classCallCheck(this, DiffCommand);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DiffCommand).apply(this, arguments));
  }

  _createClass(DiffCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      var _this2 = this;

      this.packageName = this.input[0];

      if (this.packageName) {
        this.package = (0, _lodash2.default)(this.packages, function (pkg) {
          return pkg.name === _this2.packageName;
        });

        if (!this.package) {
          callback(new Error("Package '" + this.packageName + "' does not exist."));
          return;
        }
      }

      if (!_GitUtilities2.default.hasCommit()) {
        callback(new Error("Can't diff. There are no commits in this repository, yet."));
        return;
      }

      this.filePath = this.package ? this.package.location : this.repository.packagesLocation;

      this.lastCommit = _GitUtilities2.default.hasTags() ? _GitUtilities2.default.getLastTaggedCommit() : _GitUtilities2.default.getFirstCommit();

      callback(null, true);
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      _ChildProcessUtilities2.default.spawn("git", ["diff", this.lastCommit, "--color=auto", this.filePath], {}, function (code) {
        if (code !== 0) {
          callback(new Error("Errored while spawning `git diff`."));
        } else {
          callback(null, true);
        }
      });
    }
  }]);

  return DiffCommand;
}(_Command3.default);

exports.default = DiffCommand;
module.exports = exports["default"];