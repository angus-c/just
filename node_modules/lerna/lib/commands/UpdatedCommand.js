"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UpdatedPackagesCollector = require("../UpdatedPackagesCollector");

var _UpdatedPackagesCollector2 = _interopRequireDefault(_UpdatedPackagesCollector);

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdatedCommand = function (_Command) {
  _inherits(UpdatedCommand, _Command);

  function UpdatedCommand() {
    _classCallCheck(this, UpdatedCommand);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UpdatedCommand).apply(this, arguments));
  }

  _createClass(UpdatedCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      var updatedPackagesCollector = new _UpdatedPackagesCollector2.default(this.packages, this.packageGraph, this.flags, this.repository.publishConfig);

      this.updates = updatedPackagesCollector.getUpdates();
      callback(null, true);
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      var formattedUpdates = this.updates.map(function (update) {
        return "- " + update.package.name;
      }).join("\n");

      this.logger.newLine();
      this.logger.info(formattedUpdates);
      this.logger.newLine();
      callback(null, true);
    }
  }]);

  return UpdatedCommand;
}(_Command3.default);

exports.default = UpdatedCommand;
module.exports = exports["default"];