"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FileSystemUtilities = require("./FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _PackageGraph = require("./PackageGraph");

var _PackageGraph2 = _interopRequireDefault(_PackageGraph);

var _Package = require("./Package");

var _Package2 = _interopRequireDefault(_Package);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _minimatch = require("minimatch");

var _minimatch2 = _interopRequireDefault(_minimatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageUtilities = function () {
  function PackageUtilities() {
    _classCallCheck(this, PackageUtilities);
  }

  _createClass(PackageUtilities, null, [{
    key: "getGlobalVersion",
    value: function getGlobalVersion(versionPath) {
      if (_FileSystemUtilities2.default.existsSync(versionPath)) {
        return _FileSystemUtilities2.default.readFileSync(versionPath);
      }
    }
  }, {
    key: "getPackagesPath",
    value: function getPackagesPath(rootPath) {
      return _path2.default.join(rootPath, "packages");
    }
  }, {
    key: "getPackagePath",
    value: function getPackagePath(packagesPath, name) {
      return _path2.default.join(packagesPath, name);
    }
  }, {
    key: "getPackageConfigPath",
    value: function getPackageConfigPath(packagesPath, name) {
      return _path2.default.join(PackageUtilities.getPackagePath(packagesPath, name), "package.json");
    }
  }, {
    key: "getPackageConfig",
    value: function getPackageConfig(packagesPath, name) {
      return require(PackageUtilities.getPackageConfigPath(packagesPath, name));
    }
  }, {
    key: "getPackages",
    value: function getPackages(packagesPath) {
      var packages = [];

      _FileSystemUtilities2.default.readdirSync(packagesPath).forEach(function (packageDirectory) {
        if (packageDirectory[0] === ".") {
          return;
        }

        var packagePath = PackageUtilities.getPackagePath(packagesPath, packageDirectory);
        var packageConfigPath = PackageUtilities.getPackageConfigPath(packagesPath, packageDirectory);

        if (!_FileSystemUtilities2.default.existsSync(packageConfigPath)) {
          return;
        }

        var packageJson = require(packageConfigPath);
        var pkg = new _Package2.default(packageJson, packagePath);

        packages.push(pkg);
      });

      return packages;
    }
  }, {
    key: "getPackageGraph",
    value: function getPackageGraph(packages) {
      return new _PackageGraph2.default(packages);
    }

    /**
    * Filters a given set of packages and returns the one matching the given glob
    *
    * @param {!Array.<Package>} packages The packages to filter
    * @param {String} glob The glob to match the package name against
    * @param {Boolean} negate Negate glob pattern matches
    * @return {Array.<Package>} The packages with a name matching the glob
    * @throws in case a given glob would produce an empty list of packages
    */

  }, {
    key: "filterPackages",
    value: function filterPackages(packages, glob) {
      var negate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (typeof glob !== "undefined") {
        packages = packages.filter(function (pkg) {
          if (negate) {
            return !(0, _minimatch2.default)(pkg.name, glob);
          } else {
            return (0, _minimatch2.default)(pkg.name, glob);
          }
        });

        if (!packages.length) {
          throw new Error("No packages found that match '" + glob + "'");
        }
      }
      return packages;
    }
  }]);

  return PackageUtilities;
}();

exports.default = PackageUtilities;
module.exports = exports["default"];