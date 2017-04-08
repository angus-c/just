"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _desc, _value, _class;

var _ChildProcessUtilities = require("./ChildProcessUtilities");

var _ChildProcessUtilities2 = _interopRequireDefault(_ChildProcessUtilities);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var NpmUtilities = (_dec = _logger2.default.logifyAsync, _dec2 = _logger2.default.logifySync, _dec3 = _logger2.default.logifySync, _dec4 = _logger2.default.logifySync, _dec5 = _logger2.default.logifySync, _dec6 = _logger2.default.logifyAsync, _dec7 = _logger2.default.logifyAsync, (_class = function () {
  function NpmUtilities() {
    _classCallCheck(this, NpmUtilities);
  }

  _createClass(NpmUtilities, null, [{
    key: "installInDir",
    value: function installInDir(directory, dependencies, callback) {
      var args = ["install"];

      if (dependencies) {
        args = args.concat(dependencies);
      }

      var opts = {
        cwd: directory,
        stdio: "ignore"
      };

      _ChildProcessUtilities2.default.spawn("npm", args, opts, callback);
    }
  }, {
    key: "addDistTag",
    value: function addDistTag(packageName, version, tag) {
      _ChildProcessUtilities2.default.execSync("npm dist-tag add " + packageName + "@" + version + " " + tag);
    }
  }, {
    key: "removeDistTag",
    value: function removeDistTag(packageName, tag) {
      _ChildProcessUtilities2.default.execSync("npm dist-tag rm " + packageName + " " + tag);
    }
  }, {
    key: "checkDistTag",
    value: function checkDistTag(packageName, tag) {
      return _ChildProcessUtilities2.default.execSync("npm dist-tag ls " + packageName).indexOf(tag) >= 0;
    }
  }, {
    key: "execInDir",
    value: function execInDir(command, args, directory, callback) {
      _ChildProcessUtilities2.default.exec("npm " + command + " " + args.join(" "), { cwd: directory }, callback);
    }
  }, {
    key: "runScriptInDir",
    value: function runScriptInDir(script, args, directory, callback) {
      NpmUtilities.execInDir("run " + script, args, directory, callback);
    }
  }, {
    key: "publishTaggedInDir",
    value: function publishTaggedInDir(tag, directory, callback) {
      _ChildProcessUtilities2.default.exec("cd " + directory + " && npm publish --tag " + tag, null, callback);
    }
  }]);

  return NpmUtilities;
}(), (_applyDecoratedDescriptor(_class, "installInDir", [_dec], Object.getOwnPropertyDescriptor(_class, "installInDir"), _class), _applyDecoratedDescriptor(_class, "addDistTag", [_dec2], Object.getOwnPropertyDescriptor(_class, "addDistTag"), _class), _applyDecoratedDescriptor(_class, "removeDistTag", [_dec3], Object.getOwnPropertyDescriptor(_class, "removeDistTag"), _class), _applyDecoratedDescriptor(_class, "checkDistTag", [_dec4], Object.getOwnPropertyDescriptor(_class, "checkDistTag"), _class), _applyDecoratedDescriptor(_class, "execInDir", [_dec5], Object.getOwnPropertyDescriptor(_class, "execInDir"), _class), _applyDecoratedDescriptor(_class, "runScriptInDir", [_dec6], Object.getOwnPropertyDescriptor(_class, "runScriptInDir"), _class), _applyDecoratedDescriptor(_class, "publishTaggedInDir", [_dec7], Object.getOwnPropertyDescriptor(_class, "publishTaggedInDir"), _class)), _class));
exports.default = NpmUtilities;
module.exports = exports["default"];