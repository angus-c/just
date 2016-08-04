"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PackageGraphNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageGraphNode = exports.PackageGraphNode = function PackageGraphNode(pkg) {
  _classCallCheck(this, PackageGraphNode);

  this.package = pkg;
  this.dependencies = [];
};

var PackageGraph = function () {
  function PackageGraph(packages) {
    _classCallCheck(this, PackageGraph);

    this.nodes = [];
    this.nodesByName = {};

    for (var p = 0; p < packages.length; p++) {
      var pkg = packages[p];
      var node = new PackageGraphNode(pkg);
      this.nodes.push(node);
      this.nodesByName[pkg.name] = node;
    }

    for (var n = 0; n < this.nodes.length; n++) {
      var _node = this.nodes[n];
      var dependencies = _node.package.allDependencies;
      var depNames = Object.keys(dependencies);

      for (var d = 0; d < depNames.length; d++) {
        var depName = depNames[d];
        var depVersion = dependencies[depName];
        var packageNode = this.nodesByName[depName];

        if (packageNode && _semver2.default.satisfies(packageNode.package.version, depVersion)) {
          _node.dependencies.push(depName);
        }
      }
    }
  }

  _createClass(PackageGraph, [{
    key: "get",
    value: function get(packageName) {
      return this.nodesByName[packageName];
    }
  }]);

  return PackageGraph;
}();

exports.default = PackageGraph;