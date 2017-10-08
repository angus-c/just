"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _desc, _value, _class;

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

var GitUtilities = (_dec = _logger2.default.logifySync, _dec2 = _logger2.default.logifySync, _dec3 = _logger2.default.logifySync, _dec4 = _logger2.default.logifySync, _dec5 = _logger2.default.logifySync, _dec6 = _logger2.default.logifySync, _dec7 = _logger2.default.logifySync, _dec8 = _logger2.default.logifySync, _dec9 = _logger2.default.logifySync, _dec10 = _logger2.default.logifySync, _dec11 = _logger2.default.logifySync, _dec12 = _logger2.default.logifySync, _dec13 = _logger2.default.logifySync, _dec14 = _logger2.default.logifySync, _dec15 = _logger2.default.logifySync, _dec16 = _logger2.default.logifySync, _dec17 = _logger2.default.logifySync, (_class = function () {
  function GitUtilities() {
    _classCallCheck(this, GitUtilities);
  }

  _createClass(GitUtilities, null, [{
    key: "isInitialized",
    value: function isInitialized() {
      try {
        _ChildProcessUtilities2.default.execSync("git rev-parse");
        return true;
      } catch (err) {
        return false;
      }
    }
  }, {
    key: "addFile",
    value: function addFile(file) {
      _ChildProcessUtilities2.default.execSync("git add " + file);
    }
  }, {
    key: "commit",
    value: function commit(message) {
      // Use echo to allow multi\nline strings.
      _ChildProcessUtilities2.default.execSync("git commit -m \"$(echo \"" + message + "\")\"");
    }
  }, {
    key: "addTag",
    value: function addTag(tag) {
      _ChildProcessUtilities2.default.execSync("git tag " + tag);
    }
  }, {
    key: "removeTag",
    value: function removeTag(tag) {
      _ChildProcessUtilities2.default.execSync("git tag -d " + tag);
    }
  }, {
    key: "hasTags",
    value: function hasTags() {
      return !!_ChildProcessUtilities2.default.execSync("git tag");
    }
  }, {
    key: "getLastTaggedCommit",
    value: function getLastTaggedCommit() {
      return _ChildProcessUtilities2.default.execSync("git rev-list --tags --max-count=1");
    }
  }, {
    key: "getFirstCommit",
    value: function getFirstCommit() {
      return _ChildProcessUtilities2.default.execSync("git rev-list --max-parents=0 HEAD");
    }
  }, {
    key: "pushWithTags",
    value: function pushWithTags(tags) {
      _ChildProcessUtilities2.default.execSync("git push origin " + GitUtilities.getCurrentBranch());
      _ChildProcessUtilities2.default.execSync("git push origin " + tags.join(" "));
    }
  }, {
    key: "describeTag",
    value: function describeTag(commit) {
      return _ChildProcessUtilities2.default.execSync("git describe --tags " + commit);
    }
  }, {
    key: "diffSinceIn",
    value: function diffSinceIn(since, location) {
      return _ChildProcessUtilities2.default.execSync("git diff --name-only " + since + " -- " + location);
    }
  }, {
    key: "getCurrentSHA",
    value: function getCurrentSHA() {
      return _ChildProcessUtilities2.default.execSync("git rev-parse HEAD");
    }
  }, {
    key: "getTopLevelDirectory",
    value: function getTopLevelDirectory() {
      return _ChildProcessUtilities2.default.execSync("git rev-parse --show-toplevel");
    }
  }, {
    key: "checkoutChanges",
    value: function checkoutChanges(changes) {
      _ChildProcessUtilities2.default.execSync("git checkout -- " + changes);
    }
  }, {
    key: "getCurrentBranch",
    value: function getCurrentBranch() {
      return _ChildProcessUtilities2.default.execSync("git symbolic-ref --short HEAD");
    }
  }, {
    key: "init",
    value: function init() {
      return _ChildProcessUtilities2.default.execSync("git init");
    }
  }, {
    key: "hasCommit",
    value: function hasCommit() {
      try {
        _ChildProcessUtilities2.default.execSync("git log");
        return true;
      } catch (e) {
        return false;
      }
    }
  }]);

  return GitUtilities;
}(), (_applyDecoratedDescriptor(_class, "isInitialized", [_dec], Object.getOwnPropertyDescriptor(_class, "isInitialized"), _class), _applyDecoratedDescriptor(_class, "addFile", [_dec2], Object.getOwnPropertyDescriptor(_class, "addFile"), _class), _applyDecoratedDescriptor(_class, "commit", [_dec3], Object.getOwnPropertyDescriptor(_class, "commit"), _class), _applyDecoratedDescriptor(_class, "addTag", [_dec4], Object.getOwnPropertyDescriptor(_class, "addTag"), _class), _applyDecoratedDescriptor(_class, "removeTag", [_dec5], Object.getOwnPropertyDescriptor(_class, "removeTag"), _class), _applyDecoratedDescriptor(_class, "hasTags", [_dec6], Object.getOwnPropertyDescriptor(_class, "hasTags"), _class), _applyDecoratedDescriptor(_class, "getLastTaggedCommit", [_dec7], Object.getOwnPropertyDescriptor(_class, "getLastTaggedCommit"), _class), _applyDecoratedDescriptor(_class, "getFirstCommit", [_dec8], Object.getOwnPropertyDescriptor(_class, "getFirstCommit"), _class), _applyDecoratedDescriptor(_class, "pushWithTags", [_dec9], Object.getOwnPropertyDescriptor(_class, "pushWithTags"), _class), _applyDecoratedDescriptor(_class, "describeTag", [_dec10], Object.getOwnPropertyDescriptor(_class, "describeTag"), _class), _applyDecoratedDescriptor(_class, "diffSinceIn", [_dec11], Object.getOwnPropertyDescriptor(_class, "diffSinceIn"), _class), _applyDecoratedDescriptor(_class, "getCurrentSHA", [_dec12], Object.getOwnPropertyDescriptor(_class, "getCurrentSHA"), _class), _applyDecoratedDescriptor(_class, "getTopLevelDirectory", [_dec13], Object.getOwnPropertyDescriptor(_class, "getTopLevelDirectory"), _class), _applyDecoratedDescriptor(_class, "checkoutChanges", [_dec14], Object.getOwnPropertyDescriptor(_class, "checkoutChanges"), _class), _applyDecoratedDescriptor(_class, "getCurrentBranch", [_dec15], Object.getOwnPropertyDescriptor(_class, "getCurrentBranch"), _class), _applyDecoratedDescriptor(_class, "init", [_dec16], Object.getOwnPropertyDescriptor(_class, "init"), _class), _applyDecoratedDescriptor(_class, "hasCommit", [_dec17], Object.getOwnPropertyDescriptor(_class, "hasCommit"), _class)), _class));
exports.default = GitUtilities;
module.exports = exports["default"];