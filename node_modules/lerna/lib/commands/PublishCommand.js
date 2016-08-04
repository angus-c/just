"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UpdatedPackagesCollector = require("../UpdatedPackagesCollector");

var _UpdatedPackagesCollector2 = _interopRequireDefault(_UpdatedPackagesCollector);

var _FileSystemUtilities = require("../FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _PromptUtilities = require("../PromptUtilities");

var _PromptUtilities2 = _interopRequireDefault(_PromptUtilities);

var _GitUtilities = require("../GitUtilities");

var _GitUtilities2 = _interopRequireDefault(_GitUtilities);

var _NpmUtilities = require("../NpmUtilities");

var _NpmUtilities2 = _interopRequireDefault(_NpmUtilities);

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishCommand = function (_Command) {
  _inherits(PublishCommand, _Command);

  function PublishCommand() {
    _classCallCheck(this, PublishCommand);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PublishCommand).apply(this, arguments));
  }

  _createClass(PublishCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      var _this2 = this;

      if (this.flags.canary) {
        this.logger.info("Publishing canary build");
      }

      if (!this.repository.isIndependent()) {
        this.globalVersion = this.repository.version;
        this.logger.info("Current version: " + this.globalVersion);
      }

      var updatedPackagesCollector = new _UpdatedPackagesCollector2.default(this.packages, this.packageGraph, this.flags, this.repository.publishConfig);

      try {
        this.updates = updatedPackagesCollector.getUpdates();
      } catch (err) {
        throw err;
      }

      if (!this.updates.length) {
        callback(new Error("No updated packages to publish."));
        return;
      }

      this.getVersionsForUpdates(function (err, results) {
        if (err) {
          callback(err);
          return;
        }

        var version = results.version;
        var versions = results.versions;


        if (!versions) {
          versions = {};
          _this2.updates.forEach(function (update) {
            versions[update.package.name] = version;
          });
        }

        _this2.masterVersion = version;
        _this2.updatesVersions = versions;

        _this2.confirmVersions(function (err, confirmed) {
          if (err) {
            callback(err);
            return;
          }

          if (!confirmed) {
            _this2.logger.info("Okay bye!");
            callback(null, false);
            return;
          }

          callback(null, true);
        });
      });
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      try {
        if (!this.repository.isIndependent() && !this.flags.canary) {
          this.updateVersionInLernaJson();
        }

        this.updateUpdatedPackages();
        if (!this.flags.skipGit) {
          this.commitAndTagUpdates();
        }
      } catch (err) {
        callback(err);
        return;
      }

      if (this.flags.skipNpm) {
        callback(null, true);
      } else {
        this.publishPackagesToNpm(callback);
      }
    }
  }, {
    key: "publishPackagesToNpm",
    value: function publishPackagesToNpm(callback) {
      var _this3 = this;

      this.logger.newLine();
      this.logger.info("Publishing packages to npm...");

      this.npmPublishAsPrerelease(function (err) {
        if (err) {
          callback(err);
          return;
        }

        if (_this3.flags.canary) {
          _this3.logger.info("Resetting git state");
          // reset since the package.json files are changed
          _GitUtilities2.default.checkoutChanges("packages/*/package.json");
        }

        _this3.npmUpdateAsLatest(function (err) {
          if (err) {
            callback(err);
            return;
          }

          if (!(_this3.flags.canary || _this3.flags.skipGit)) {
            _this3.logger.info("Pushing tags to git...");
            _this3.logger.newLine();
            _GitUtilities2.default.pushWithTags(_this3.tags);
          }

          var message = "Successfully published:";

          _this3.updates.forEach(function (update) {
            message += "\n - " + update.package.name + "@" + update.package.version;
          });

          _this3.logger.success(message);
          callback(null, true);
        });
      });
    }
  }, {
    key: "getVersionsForUpdates",
    value: function getVersionsForUpdates(callback) {
      var _this4 = this;

      if (this.flags.repoVersion) {
        return callback(null, {
          version: this.flags.repoVersion
        });
      }

      // Non-Independent Canary Mode
      if (!this.repository.isIndependent() && this.flags.canary) {
        var version = this.globalVersion + this.getCanaryVersionSuffix();
        callback(null, { version: version });

        // Non-Independent Non-Canary Mode
      } else if (!this.repository.isIndependent()) {
          this.promptVersion(null, this.globalVersion, function (err, version) {
            if (err) {
              callback(err);
            } else {
              callback(null, { version: version });
            }
          });

          // Independent Canary Mode
        } else if (this.flags.canary) {
            (function () {
              var versions = {};
              var canaryVersionSuffix = _this4.getCanaryVersionSuffix();

              _this4.updates.forEach(function (update) {
                versions[update.package.name] = update.package.version + canaryVersionSuffix;
              });

              callback(null, { versions: versions });

              // Independent Non-Canary Mode
            })();
          } else {
              _async2.default.mapLimit(this.updates, 1, function (update, cb) {
                _this4.promptVersion(update.package.name, update.package.version, cb);
              }, function (err, versions) {
                if (err) {
                  return callback(err);
                }

                _this4.updates.forEach(function (update, index) {
                  versions[update.package.name] = versions[index];
                });

                callback(null, { versions: versions });
              });
            }
    }
  }, {
    key: "getCanaryVersionSuffix",
    value: function getCanaryVersionSuffix() {
      return "-alpha." + _GitUtilities2.default.getCurrentSHA().slice(0, 8);
    }
  }, {
    key: "promptVersion",
    value: function promptVersion(packageName, currentVersion, callback) {
      var patch = _semver2.default.inc(currentVersion, "patch");
      var minor = _semver2.default.inc(currentVersion, "minor");
      var major = _semver2.default.inc(currentVersion, "major");

      var message = "Select a new version";
      if (packageName) message += " for " + packageName;
      message += " (currently " + currentVersion + ")";

      _PromptUtilities2.default.select(message, {
        choices: [{ value: patch, name: "Patch (" + patch + ")" }, { value: minor, name: "Minor (" + minor + ")" }, { value: major, name: "Major (" + major + ")" }, { value: false, name: "Custom" }]
      }, function (choice) {
        if (choice) {
          callback(null, choice);
          return;
        }

        _PromptUtilities2.default.input("Enter a custom version", {
          filter: _semver2.default.valid,
          validate: function validate(v) {
            return _semver2.default.valid(v) ? true : "Must be a valid semver version";
          }
        }, function (input) {
          callback(null, input);
        });
      });
    }
  }, {
    key: "confirmVersions",
    value: function confirmVersions(callback) {
      var _this5 = this;

      this.logger.newLine();
      this.logger.info("Changes:");
      this.logger.info(this.updates.map(function (update) {
        return "- " + update.package.name + ": " + update.package.version + " => " + _this5.updatesVersions[update.package.name];
      }).join("\n"));
      this.logger.newLine();

      if (!this.flags.yes) {
        _PromptUtilities2.default.confirm("Are you sure you want to publish the above changes?", function (confirm) {
          callback(null, confirm);
        });
      } else {
        this.logger.info("Assuming confirmation.");
        callback(null, true);
      }
    }
  }, {
    key: "updateVersionInLernaJson",
    value: function updateVersionInLernaJson() {
      this.repository.lernaJson.version = this.masterVersion;
      _FileSystemUtilities2.default.writeFileSync(this.repository.lernaJsonLocation, JSON.stringify(this.repository.lernaJson, null, "  "));
      if (!this.flags.skipGit) {
        _GitUtilities2.default.addFile(this.repository.lernaJsonLocation);
      }
    }
  }, {
    key: "updateUpdatedPackages",
    value: function updateUpdatedPackages() {
      var _this6 = this;

      var changedFiles = [];

      this.updates.forEach(function (update) {
        var pkg = update.package;
        var packageLocation = pkg.location;
        var packageJsonLocation = _path2.default.join(packageLocation, "package.json");

        // set new version
        pkg.version = _this6.updatesVersions[pkg.name] || pkg.version;

        // update pkg dependencies
        _this6.updatePackageDepsObject(pkg, "dependencies");
        _this6.updatePackageDepsObject(pkg, "devDependencies");
        _this6.updatePackageDepsObject(pkg, "peerDependencies");

        // write new package
        _FileSystemUtilities2.default.writeFileSync(packageJsonLocation, pkg.toJsonString());

        // push to be git committed
        changedFiles.push(packageJsonLocation);
      });

      if (!(this.flags.canary || this.flags.skipGit)) {
        changedFiles.forEach(_GitUtilities2.default.addFile);
      }
    }
  }, {
    key: "updatePackageDepsObject",
    value: function updatePackageDepsObject(pkg, depsKey) {
      var _this7 = this;

      var deps = pkg[depsKey];

      if (!deps) {
        return;
      }

      this.packageGraph.get(pkg.name).dependencies.forEach(function (depName) {
        var version = _this7.updatesVersions[depName];

        if (deps[depName] && version) {
          deps[depName] = "^" + version;
        }
      });
    }
  }, {
    key: "commitAndTagUpdates",
    value: function commitAndTagUpdates() {
      if (!this.flags.canary) {
        if (this.repository.isIndependent()) {
          this.tags = this.gitCommitAndTagVersionForUpdates();
        } else {
          this.tags = [this.gitCommitAndTagVersion(this.masterVersion)];
        }
      }
    }
  }, {
    key: "gitCommitAndTagVersionForUpdates",
    value: function gitCommitAndTagVersionForUpdates() {
      var _this8 = this;

      var message = "Publish\n";

      var tags = this.updates.map(function (update) {
        var tag = update.package.name + "@" + _this8.updatesVersions[update.package.name];
        message += "\n - " + tag;
        return tag;
      });

      _GitUtilities2.default.commit(message);
      tags.forEach(_GitUtilities2.default.addTag);
      return tags;
    }
  }, {
    key: "gitCommitAndTagVersion",
    value: function gitCommitAndTagVersion(version) {
      var tag = "v" + version;
      _GitUtilities2.default.commit(tag);
      _GitUtilities2.default.addTag(tag);
      return tag;
    }
  }, {
    key: "execScript",
    value: function execScript(pkg, script) {
      var scriptLocation = _path2.default.join(pkg.location, "scripts", script + ".js");

      if (_FileSystemUtilities2.default.existsSync(scriptLocation)) {
        require(scriptLocation);
      } else {
        this.logger.debug("No " + script + " script found at " + scriptLocation);
      }
    }
  }, {
    key: "npmPublishAsPrerelease",
    value: function npmPublishAsPrerelease(callback) {
      var _this9 = this;

      this.updates.forEach(function (update) {
        _this9.execScript(update.package, "prepublish");
      });

      this.progressBar.init(this.updates.length);

      _async2.default.parallelLimit(this.updates.map(function (update) {
        var pkg = update.package;

        var attempts = 0;

        var run = function run(cb) {
          _this9.logger.debug("Publishing " + pkg.name + "...");

          _NpmUtilities2.default.publishTaggedInDir("lerna-temp", pkg.location, function (err) {
            err = err && err.stack || err;

            if (!err ||
            // publishing over an existing package which is likely due to a timeout or something
            err.indexOf("You cannot publish over the previously published version") > -1) {
              _this9.progressBar.tick(pkg.name);
              _this9.execScript(pkg, "postpublish");
              cb();
              return;
            }

            attempts++;

            if (attempts < 5) {
              _this9.logger.error("Attempting to retry publishing " + pkg.name + "...", err);
              run(cb);
            } else {
              _this9.logger.error("Ran out of retries while publishing " + pkg.name, err);
              cb(err);
            }
          });
        };

        return run;
      }), this.concurrency, function (err) {
        _this9.progressBar.terminate();
        callback(err);
      });
    }
  }, {
    key: "npmUpdateAsLatest",
    value: function npmUpdateAsLatest(callback) {
      var _this10 = this;

      this.progressBar.init(this.updates.length);

      _async2.default.parallelLimit(this.updates.map(function (update) {
        return function (cb) {
          var pkg = update.package;

          var attempts = 0;

          while (true) {
            attempts++;

            try {
              if (_NpmUtilities2.default.checkDistTag(pkg.name, "lerna-temp")) {
                _NpmUtilities2.default.removeDistTag(pkg.name, "lerna-temp");
              }

              if (_this10.flags.npmTag) {
                _NpmUtilities2.default.addDistTag(pkg.name, _this10.updatesVersions[pkg.name], _this10.flags.npmTag);
              } else if (_this10.flags.canary) {
                _NpmUtilities2.default.addDistTag(pkg.name, pkg.version, "canary");
              } else {
                _NpmUtilities2.default.addDistTag(pkg.name, _this10.updatesVersions[pkg.name], "latest");
              }

              _this10.progressBar.tick(pkg.name);
              cb();
              break;
            } catch (err) {
              if (attempts < 5) {
                _this10.logger.error("Error updating version as latest", err);
                continue;
              } else {
                cb(err);
                return;
              }
            }
          }
        };
      }), 4, function (err) {
        _this10.progressBar.terminate();
        callback(err);
      });
    }
  }]);

  return PublishCommand;
}(_Command3.default);

exports.default = PublishCommand;
module.exports = exports["default"];