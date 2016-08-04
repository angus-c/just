"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FileSystemUtilities = require("./FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _PackageUtilities = require("./PackageUtilities");

var _PackageUtilities2 = _interopRequireDefault(_PackageUtilities);

var _ExitHandler = require("./ExitHandler");

var _ExitHandler2 = _interopRequireDefault(_ExitHandler);

var _progressBar = require("./progressBar");

var _progressBar2 = _interopRequireDefault(_progressBar);

var _Repository = require("./Repository");

var _Repository2 = _interopRequireDefault(_Repository);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CONCURRENCY = 4;

var Command = function () {
  function Command(input, flags) {
    _classCallCheck(this, Command);

    this.input = input;
    this.flags = flags;

    this.lernaVersion = require("../package.json").version;
    this.logger = _logger2.default;
    this.repository = new _Repository2.default();
    this.progressBar = _progressBar2.default;
    this.concurrency = !flags || flags.concurrency === undefined ? DEFAULT_CONCURRENCY : Math.max(1, +flags.concurrency || DEFAULT_CONCURRENCY);
  }

  _createClass(Command, [{
    key: "run",
    value: function run() {
      this.logger.info("Lerna v" + this.lernaVersion);

      if (this.repository.isIndependent()) {
        this.logger.info("Independent Versioning Mode");
      }

      this.runValidations();
      this.runPreparations();
      this.runCommand();
    }
  }, {
    key: "runValidations",
    value: function runValidations() {
      if (this.concurrency < 1) {
        this.logger.warning("command must be run with at least one thread.");
        this._complete(null, 1);
        return;
      }

      if (!_FileSystemUtilities2.default.existsSync(this.repository.packagesLocation)) {
        this.logger.warning("`packages/` directory does not exist, have you run `lerna init`?");
        this._complete(null, 1);
        return;
      }

      if (!_FileSystemUtilities2.default.existsSync(this.repository.packageJsonLocation)) {
        this.logger.warning("`package.json` does not exist, have you run `lerna init`?");
        this._complete(null, 1);
        return;
      }

      if (!_FileSystemUtilities2.default.existsSync(this.repository.lernaJsonLocation)) {
        this.logger.warning("`lerna.json` does not exist, have you run `lerna init`?");
        this._complete(null, 1);
        return;
      }

      if (this.flags.independent && !this.repository.isIndependent()) {
        this.logger.warning("You ran lerna with `--independent` or `-i`, but the repository is not set to independent mode. " + "To use independent mode you need to set your `lerna.json` \"version\" to \"independent\". " + "Then you won't need to pass the `--independent` or `-i` flags.");
        this._complete(null, 1);
        return;
      }

      if (process.env.NODE_ENV !== "test" && this.lernaVersion !== this.repository.lernaVersion) {
        this.logger.warning("Lerna version mismatch: The current version of lerna is " + this.lernaVersion + ", " + ("but the Lerna version in `lerna.json` is " + this.repository.lernaVersion + ". ") + ("You can either run `lerna init` again or install `lerna@" + this.repository.lernaVersion + "`."));
        this._complete(null, 1);
        return;
      }

      if (_FileSystemUtilities2.default.existsSync(this.repository.versionLocation)) {
        this.logger.warning("You have a `VERSION` file in your repository, this is leftover from a previous ");
        this._complete(null, 1);
        return;
      }

      if (process.env.NPM_DIST_TAG !== undefined) {
        this.logger.warning("`NPM_DIST_TAG=[tagname] lerna publish` is deprecated, please use `lerna publish --tag [tagname]` instead.");
        this._complete(null, 1);
        return;
      }

      if (process.env.FORCE_VERSION !== undefined) {
        this.logger.warning("`FORCE_VERSION=[package/*] lerna updated/publish` is deprecated, please use `lerna updated/publish --force-publish [package/*]` instead.");
        this._complete(null, 1);
        return;
      }
    }
  }, {
    key: "runPreparations",
    value: function runPreparations() {
      try {
        this.packages = _PackageUtilities2.default.getPackages(this.repository.packagesLocation);
        this.packageGraph = _PackageUtilities2.default.getPackageGraph(this.packages);
      } catch (err) {
        this.logger.error("Errored while collecting packages and package graph", err);
        this._complete(null, 1);
        throw err;
      }
    }
  }, {
    key: "runCommand",
    value: function runCommand(callback) {
      var _this = this;

      this._attempt("initialize", function () {
        _this._attempt("execute", function () {
          _this._complete(null, 0, callback);
        }, callback);
      }, callback);
    }
  }, {
    key: "_attempt",
    value: function _attempt(method, next, callback) {
      var _this2 = this;

      var methodName = this.constructor.name + "." + method;

      try {
        this.logger.debug("Attempting running " + methodName);

        this[method](function (err, completed) {
          if (err) {
            _this2.logger.error("Errored while running " + methodName, err);
            _this2._complete(err, 1, callback);
          } else if (!completed) {
            _this2.logger.debug("Exited early while running " + methodName);
            _this2._complete(null, 1, callback);
          } else {
            _this2.logger.debug("Successfully ran " + methodName);
            next();
          }
        });
      } catch (err) {
        this.logger.error("Errored while running " + methodName, err);
        this._complete(err, 1, callback);
      }
    }
  }, {
    key: "_complete",
    value: function _complete(err, code, callback) {
      if (code !== 0) {
        var exitHandler = new _ExitHandler2.default();
        exitHandler.writeLogs();
      }

      if (callback) {
        callback(err, code);
      }

      if (process.env.NODE_ENV !== "test") {
        process.exit(code);
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      throw new Error("command.initialize() needs to be implemented.");
    }
  }, {
    key: "execute",
    value: function execute() {
      throw new Error("command.execute() needs to be implemented.");
    }
  }]);

  return Command;
}();

exports.default = Command;
module.exports = exports["default"];