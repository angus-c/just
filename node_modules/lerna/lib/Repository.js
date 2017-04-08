"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GitUtilities = require("./GitUtilities");

var _GitUtilities2 = _interopRequireDefault(_GitUtilities);

var _FileSystemUtilities = require("./FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = function () {
  function Repository() {
    _classCallCheck(this, Repository);

    if (!_GitUtilities2.default.isInitialized()) {
      _logger2.default.info("Initializing Git repository.");
      _GitUtilities2.default.init();
    }

    this.rootPath = _GitUtilities2.default.getTopLevelDirectory();
    this.lernaJsonLocation = _path2.default.join(this.rootPath, "lerna.json");
    this.packageJsonLocation = _path2.default.join(this.rootPath, "package.json");
    this.packagesLocation = _path2.default.join(this.rootPath, "packages");

    // Legacy
    this.versionLocation = _path2.default.join(this.rootPath, "VERSION");

    if (_FileSystemUtilities2.default.existsSync(this.lernaJsonLocation)) {
      this.lernaJson = JSON.parse(_FileSystemUtilities2.default.readFileSync(this.lernaJsonLocation));
    }

    if (_FileSystemUtilities2.default.existsSync(this.packageJsonLocation)) {
      this.packageJson = JSON.parse(_FileSystemUtilities2.default.readFileSync(this.packageJsonLocation));
    }
  }

  _createClass(Repository, [{
    key: "isIndependent",
    value: function isIndependent() {
      return this.version === "independent";
    }
  }, {
    key: "lernaVersion",
    get: function get() {
      return this.lernaJson && this.lernaJson.lerna;
    }
  }, {
    key: "version",
    get: function get() {
      return this.lernaJson && this.lernaJson.version;
    }
  }, {
    key: "publishConfig",
    get: function get() {
      return this.lernaJson && this.lernaJson.publishConfig || {};
    }
  }, {
    key: "linkedFiles",
    get: function get() {
      return this.lernaJson && this.lernaJson.linkedFiles || {};
    }
  }, {
    key: "bootstrapConfig",
    get: function get() {
      return this.lernaJson && this.lernaJson.bootstrapConfig || {};
    }
  }]);

  return Repository;
}();

exports.default = Repository;
module.exports = exports["default"];