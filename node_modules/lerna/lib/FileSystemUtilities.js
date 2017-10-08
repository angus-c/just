"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _desc, _value, _class;

var _pathExists = require("path-exists");

var _pathExists2 = _interopRequireDefault(_pathExists);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

var _mkdirp2 = require("mkdirp");

var _mkdirp3 = _interopRequireDefault(_mkdirp2);

var _rimraf2 = require("rimraf");

var _rimraf3 = _interopRequireDefault(_rimraf2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

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

var ENDS_WITH_NEW_LINE = /\n$/;

function ensureEndsWithNewLine(string) {
  return ENDS_WITH_NEW_LINE.test(string) ? string : string + "\n";
}

var FileSystemUtilities = (_dec = _logger2.default.logifySync, _dec2 = _logger2.default.logifyAsync, _dec3 = _logger2.default.logifyAsync, _dec4 = _logger2.default.logifySync, _dec5 = _logger2.default.logifyAsync, _dec6 = _logger2.default.logifySync, _dec7 = _logger2.default.logifySync, _dec8 = _logger2.default.logifyAsync, _dec9 = _logger2.default.logifySync, (_class = function () {
  function FileSystemUtilities() {
    _classCallCheck(this, FileSystemUtilities);
  }

  _createClass(FileSystemUtilities, null, [{
    key: "mkdirSync",
    value: function mkdirSync(filePath) {
      _fs2.default.mkdirSync(filePath);
    }
  }, {
    key: "mkdirp",
    value: function mkdirp(filePath, callback) {
      (0, _mkdirp3.default)(filePath, callback);
    }
  }, {
    key: "readdirSync",
    value: function readdirSync(filePath) {
      return _fs2.default.readdirSync(filePath);
    }
  }, {
    key: "existsSync",
    value: function existsSync(filePath) {
      return _pathExists2.default.sync(filePath);
    }
  }, {
    key: "writeFile",
    value: function writeFile(filePath, fileContents, callback) {
      _fs2.default.writeFile(filePath, ensureEndsWithNewLine(fileContents), callback);
    }
  }, {
    key: "writeFileSync",
    value: function writeFileSync(filePath, fileContents) {
      _fs2.default.writeFileSync(filePath, ensureEndsWithNewLine(fileContents));
    }
  }, {
    key: "readFileSync",
    value: function readFileSync(filePath) {
      return _fs2.default.readFileSync(filePath).toString().trim();
    }
  }, {
    key: "rimraf",
    value: function rimraf(filePath, callback) {
      (0, _rimraf3.default)(filePath, callback);
    }
  }, {
    key: "unlinkSync",
    value: function unlinkSync(filePath) {
      _fs2.default.unlink(filePath);
    }
  }]);

  return FileSystemUtilities;
}(), (_applyDecoratedDescriptor(_class, "mkdirSync", [_dec], Object.getOwnPropertyDescriptor(_class, "mkdirSync"), _class), _applyDecoratedDescriptor(_class, "mkdirp", [_dec2], Object.getOwnPropertyDescriptor(_class, "mkdirp"), _class), _applyDecoratedDescriptor(_class, "readdirSync", [_dec3], Object.getOwnPropertyDescriptor(_class, "readdirSync"), _class), _applyDecoratedDescriptor(_class, "existsSync", [_dec4], Object.getOwnPropertyDescriptor(_class, "existsSync"), _class), _applyDecoratedDescriptor(_class, "writeFile", [_dec5], Object.getOwnPropertyDescriptor(_class, "writeFile"), _class), _applyDecoratedDescriptor(_class, "writeFileSync", [_dec6], Object.getOwnPropertyDescriptor(_class, "writeFileSync"), _class), _applyDecoratedDescriptor(_class, "readFileSync", [_dec7], Object.getOwnPropertyDescriptor(_class, "readFileSync"), _class), _applyDecoratedDescriptor(_class, "rimraf", [_dec8], Object.getOwnPropertyDescriptor(_class, "rimraf"), _class), _applyDecoratedDescriptor(_class, "unlinkSync", [_dec9], Object.getOwnPropertyDescriptor(_class, "unlinkSync"), _class)), _class));
exports.default = FileSystemUtilities;
module.exports = exports["default"];