"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FileSystemUtilities = require("../FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

var _objectAssignSorted = require("object-assign-sorted");

var _objectAssignSorted2 = _interopRequireDefault(_objectAssignSorted);

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InitCommand = function (_Command) {
  _inherits(InitCommand, _Command);

  function InitCommand() {
    _classCallCheck(this, InitCommand);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(InitCommand).apply(this, arguments));
  }

  _createClass(InitCommand, [{
    key: "runValidations",

    // don't do any of this.
    value: function runValidations() {}
  }, {
    key: "runPreparations",
    value: function runPreparations() {}
  }, {
    key: "initialize",
    value: function initialize(callback) {
      // Nothing to do...
      callback(null, true);
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      this.ensurePackagesDirectory();
      this.ensurePackageJSON();
      this.ensureLernaJson();
      this.ensureNoVersionFile();
      this.logger.success("Successfully created Lerna files");
      callback(null, true);
    }
  }, {
    key: "ensurePackagesDirectory",
    value: function ensurePackagesDirectory() {
      var packagesLocation = this.repository.packagesLocation;
      if (!_FileSystemUtilities2.default.existsSync(packagesLocation)) {
        this.logger.info("Creating packages folder.");
        _FileSystemUtilities2.default.mkdirSync(packagesLocation);
      }
    }
  }, {
    key: "ensurePackageJSON",
    value: function ensurePackageJSON() {
      var _repository = this.repository;
      var packageJsonLocation = _repository.packageJsonLocation;
      var packageJson = _repository.packageJson;


      if (!packageJson) packageJson = {};
      // if (!packageJson.private) packageJson.private = true;
      if (!packageJson.devDependencies) packageJson.devDependencies = {};

      (0, _objectAssignSorted2.default)(packageJson.devDependencies, {
        lerna: this.lernaVersion
      });

      if (!packageJson) {
        this.logger.info("Creating package.json.");
      } else {
        this.logger.info("Updating package.json.");
      }

      _FileSystemUtilities2.default.writeFileSync(packageJsonLocation, JSON.stringify(packageJson, null, "  "));
    }
  }, {
    key: "ensureLernaJson",
    value: function ensureLernaJson() {
      var _repository2 = this.repository;
      var versionLocation = _repository2.versionLocation;
      var lernaJsonLocation = _repository2.lernaJsonLocation;
      var lernaJson = _repository2.lernaJson;


      var version = void 0;

      if (this.flags.independent) {
        version = "independent";
      } else if (_FileSystemUtilities2.default.existsSync(versionLocation)) {
        version = _FileSystemUtilities2.default.readFileSync(versionLocation);
      } else if (lernaJson && lernaJson.version) {
        version = lernaJson.version;
      } else {
        version = "0.0.0";
      }

      if (!lernaJson) {
        this.logger.info("Creating lerna.json.");
        lernaJson = {};
      } else {
        this.logger.info("Updating lerna.json.");
      }

      (0, _objectAssign2.default)(lernaJson, {
        lerna: this.lernaVersion,
        version: version
      });

      _FileSystemUtilities2.default.writeFileSync(lernaJsonLocation, JSON.stringify(lernaJson, null, "  "));
    }
  }, {
    key: "ensureNoVersionFile",
    value: function ensureNoVersionFile() {
      var versionLocation = this.repository.versionLocation;
      if (_FileSystemUtilities2.default.existsSync(versionLocation)) {
        this.logger.info("Removing old VERSION file.");
        _FileSystemUtilities2.default.unlinkSync(versionLocation, "0.0.0");
      }
    }
  }]);

  return InitCommand;
}(_Command3.default);

exports.default = InitCommand;
module.exports = exports["default"];