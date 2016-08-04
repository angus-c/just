"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

var _progressBar = require("../progressBar");

var _progressBar2 = _interopRequireDefault(_progressBar);

var _PromptUtilities = require("../PromptUtilities");

var _PromptUtilities2 = _interopRequireDefault(_PromptUtilities);

var _ChildProcessUtilities = require("../ChildProcessUtilities");

var _ChildProcessUtilities2 = _interopRequireDefault(_ChildProcessUtilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImportCommand = function (_Command) {
  _inherits(ImportCommand, _Command);

  function ImportCommand() {
    _classCallCheck(this, ImportCommand);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ImportCommand).apply(this, arguments));
  }

  _createClass(ImportCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      var _this2 = this;

      var inputPath = this.input[0];

      if (!inputPath) {
        return callback(new Error("Missing argument: Path to external repository"));
      }

      var externalRepoPath = _path2.default.resolve(inputPath);
      var externalRepoBase = _path2.default.basename(externalRepoPath);

      try {
        var stats = _fs2.default.statSync(externalRepoPath);
        if (!stats.isDirectory()) {
          throw new Error("Input path \"" + inputPath + "\" is not a directory");
        }
        var packageJson = _path2.default.join(externalRepoPath, "package.json");
        var packageName = require(packageJson).name;
        if (!packageName) {
          throw new Error("No package name specified in \"" + packageJson + "\"");
        }
      } catch (e) {
        if (e.code === "ENOENT") {
          return callback(new Error("No repository found at \"" + inputPath + "\""));
        }
        return callback(e);
      }

      this.targetDir = "packages/" + externalRepoBase;

      try {
        if (_fs2.default.statSync(this.targetDir)) {
          return callback(new Error("Target directory already exists \"" + this.targetDir + "\""));
        }
      } catch (e) {/* Pass */}

      this.externalExecOpts = {
        encoding: "utf8",
        cwd: externalRepoPath
      };

      this.commits = this.externalExecSync("git log --format=\"%h\"").split("\n").reverse();

      if (!this.commits.length) {
        callback(new Error("No git commits to import at \"" + inputPath + "\""));
      }

      this.logger.info("About to import " + this.commits.length + " commits into from " + inputPath + " into " + this.targetDir);

      if (this.flags.yes) {
        callback(null, true);
      } else {
        _PromptUtilities2.default.confirm("Are you sure you want to import these commits onto the current branch?", function (confirmed) {
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
    key: "externalExecSync",
    value: function externalExecSync(command) {
      return _ChildProcessUtilities2.default.execSync(command, this.externalExecOpts).trim();
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      var _this3 = this;

      var replacement = "$1/" + this.targetDir;

      _progressBar2.default.init(this.commits.length);

      _async2.default.series(this.commits.map(function (sha) {
        return function (done) {
          _progressBar2.default.tick(sha);

          // Create a patch file for this commit and prepend the target directory
          // to all affected files.  This moves the git history for the entire
          // external repository into the package subdirectory, commit by commit.
          var patch = _this3.externalExecSync("git format-patch -1 " + sha + " --stdout").replace(/^([-+]{3} [ab])/mg, replacement).replace(/^(diff --git a)/mg, replacement).replace(/^(diff --git \S+ b)/mg, replacement);

          // Apply the modified patch to the current lerna repository, preserving
          // original commit date, author and message.
          _ChildProcessUtilities2.default.exec("git am", {}, done).stdin.end(patch);
        };
      }), function (err) {
        _progressBar2.default.terminate();
        _this3.logger.info("Import complete!");
        callback(err, !err);
      });
    }
  }]);

  return ImportCommand;
}(_Command3.default);

exports.default = ImportCommand;
module.exports = exports["default"];