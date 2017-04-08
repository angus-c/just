"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PackageUtilities = require("./PackageUtilities");

var _PackageUtilities2 = _interopRequireDefault(_PackageUtilities);

var _GitUtilities = require("./GitUtilities");

var _GitUtilities2 = _interopRequireDefault(_GitUtilities);

var _progressBar = require("./progressBar");

var _progressBar2 = _interopRequireDefault(_progressBar);

var _minimatch = require("minimatch");

var _minimatch2 = _interopRequireDefault(_minimatch);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require("lodash.find");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Update = function Update(pkg) {
  _classCallCheck(this, Update);

  this.package = pkg;
};

var UpdatedPackagesCollector = function () {
  function UpdatedPackagesCollector(packages, packageGraph, flags, publishConfig) {
    _classCallCheck(this, UpdatedPackagesCollector);

    this.packages = packages;
    this.packageGraph = packageGraph;
    this.flags = flags;
    this.publishConfig = publishConfig;
  }

  _createClass(UpdatedPackagesCollector, [{
    key: "getUpdates",
    value: function getUpdates() {
      this.updatedPackages = this.collectUpdatedPackages();
      this.dependents = this.collectDependents();
      return this.collectUpdates();
    }
  }, {
    key: "collectUpdatedPackages",
    value: function collectUpdatedPackages() {
      var _this = this;

      _logger2.default.info("Checking for updated packages...");
      _progressBar2.default.init(this.packages.length);

      var hasTags = _GitUtilities2.default.hasTags();
      var commits = void 0;

      if (this.flags.canary) {
        var currentSHA = void 0;

        if (this.flags.canary !== true) {
          currentSHA = this.flags.canary;
        } else {
          currentSHA = _GitUtilities2.default.getCurrentSHA();
        }

        commits = this.getAssociatedCommits(currentSHA);
      } else if (hasTags) {
        commits = _GitUtilities2.default.describeTag(_GitUtilities2.default.getLastTaggedCommit());
      }

      var updatedPackages = {};

      this.packages.filter(function (pkg) {
        _progressBar2.default.tick(pkg.name);

        if (pkg.isPrivate()) {
          return false;
        }

        if (!hasTags) {
          return true;
        }

        var forcePublish = (_this.flags.forcePublish || "").split(",");

        if (forcePublish.indexOf("*") > -1) {
          return true;
        } else if (forcePublish.indexOf(pkg.name) > -1) {
          return true;
        } else {
          return _this.hasDiffSinceThatIsntIgnored(pkg, commits);
        }
      }).forEach(function (pkg) {
        updatedPackages[pkg.name] = pkg;
      });

      _progressBar2.default.terminate();

      return updatedPackages;
    }
  }, {
    key: "isPackageDependentOf",
    value: function isPackageDependentOf(packageName, dependency) {
      var _this2 = this;

      if (!this.cache[packageName]) {
        this.cache[packageName] = {};
      }

      if (this.cache[packageName][dependency] === "dependent") {
        return true;
      } else if (this.cache[packageName][dependency] === "visited") {
        return false;
      }

      var dependencies = this.packageGraph.get(packageName).dependencies;

      if (dependencies.indexOf(dependency) > -1) {
        this.cache[packageName][dependency] = "dependent";
        return true;
      }

      this.cache[packageName][dependency] = "visited";

      var hasSubDependents = false;

      dependencies.forEach(function (dep) {
        if (_this2.isPackageDependentOf(dep, dependency)) {
          _this2.cache[packageName][dependency] = "dependent";
          hasSubDependents = true;
        }
      });

      return hasSubDependents;
    }
  }, {
    key: "collectDependents",
    value: function collectDependents() {
      var _this3 = this;

      var dependents = {};
      this.cache = {};

      this.packages.forEach(function (pkg) {
        Object.keys(_this3.updatedPackages).forEach(function (dependency) {
          if (_this3.isPackageDependentOf(pkg.name, dependency)) {
            dependents[pkg.name] = pkg;
          }
        });
      });

      return dependents;
    }
  }, {
    key: "collectUpdates",
    value: function collectUpdates() {
      var _this4 = this;

      return this.packages.filter(function (pkg) {
        return _this4.updatedPackages[pkg.name] || (_this4.flags.onlyExplicitUpdates ? false : _this4.dependents[pkg.name]) || _this4.flags.canary;
      }).map(function (pkg) {
        return new Update(pkg);
      });
    }
  }, {
    key: "getAssociatedCommits",
    value: function getAssociatedCommits(sha) {
      // if it's a merge commit, it will return all the commits that were part of the merge
      // ex: If `ab7533e` had 2 commits, ab7533e^..ab7533e would contain 2 commits + the merge commit
      return sha.slice(0, 8) + "^.." + sha.slice(0, 8);
    }
  }, {
    key: "hasDiffSinceThatIsntIgnored",
    value: function hasDiffSinceThatIsntIgnored(pkg, commits) {
      var _this5 = this;

      var folder = _PackageUtilities2.default.getPackagePath(_PackageUtilities2.default.getPackagesPath(""), pkg.name);
      var diff = _GitUtilities2.default.diffSinceIn(commits, pkg.location);

      if (diff === "") {
        return false;
      }

      var changedFiles = diff.split("\n").map(function (file) {
        return file.replace(folder + _path2.default.sep, "");
      });

      if (this.publishConfig.ignore) {
        changedFiles = changedFiles.filter(function (file) {
          return !(0, _lodash2.default)(_this5.publishConfig.ignore, function (pattern) {
            return (0, _minimatch2.default)(file, pattern);
          });
        });
      }

      return !!changedFiles.length;
    }
  }]);

  return UpdatedPackagesCollector;
}();

exports.default = UpdatedPackagesCollector;
module.exports = exports["default"];