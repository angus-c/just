"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Package = function () {
  function Package(pkg, location) {
    _classCallCheck(this, Package);

    this._package = pkg;
    this._location = location;
  }

  _createClass(Package, [{
    key: "isPrivate",
    value: function isPrivate() {
      return !!this._package.private;
    }
  }, {
    key: "toJsonString",
    value: function toJsonString() {
      return JSON.stringify(this._package, null, 2) + "\n";
    }
  }, {
    key: "name",
    get: function get() {
      return this._package.name;
    }
  }, {
    key: "location",
    get: function get() {
      return this._location;
    }
  }, {
    key: "nodeModulesLocation",
    get: function get() {
      return _path2.default.join(this._location, "node_modules");
    }
  }, {
    key: "version",
    get: function get() {
      return this._package.version;
    },
    set: function set(version) {
      this._package.version = version;
    }
  }, {
    key: "dependencies",
    get: function get() {
      return this._package.dependencies;
    }
  }, {
    key: "devDependencies",
    get: function get() {
      return this._package.devDependencies;
    }
  }, {
    key: "peerDependencies",
    get: function get() {
      return this._package.peerDependencies;
    }
  }, {
    key: "allDependencies",
    get: function get() {
      return (0, _objectAssign2.default)({}, this.peerDependencies, this.devDependencies, this.dependencies);
    }
  }, {
    key: "scripts",
    get: function get() {
      return this._package.scripts;
    }
  }]);

  return Package;
}();

exports.default = Package;
module.exports = exports["default"];