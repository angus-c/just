"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _progress = require("progress");

var _progress2 = _interopRequireDefault(_progress);

var _pad = require("pad");

var _pad2 = _interopRequireDefault(_pad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressBarController = function () {
  function ProgressBarController() {
    _classCallCheck(this, ProgressBarController);

    this.bar = null;
  }

  _createClass(ProgressBarController, [{
    key: "init",
    value: function init(total) {
      if (this.bar) {
        this.terminate();
      }

      // Intentionally a noop because node-progress doesn't work well in non-TTY
      // environments
      if (!process.stdout.isTTY) {
        return;
      }

      // Don't do any of this while testing
      if (process.env.NODE_ENV === "test") {
        return;
      }

      this.bar = new _progress2.default(":packagename ╢:bar╟", {
        total: total,
        complete: "█",
        incomplete: "░",
        clear: true,

        // terminal columns - package name length - additional characters length
        width: (process.stdout.columns || 100) - 50 - 3
      });
    }
  }, {
    key: "tick",
    value: function tick(name) {
      if (this.bar) {
        this.bar.tick({
          packagename: (0, _pad2.default)(name.slice(0, 50), 50)
        });
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.bar) {
        this.bar.terminate();
      }
    }
  }, {
    key: "restore",
    value: function restore() {
      if (this.bar) {
        // This is a hack to get the bar to redraw it's last state.
        // See: https://github.com/tj/node-progress/blob/d47913502ba5b551fcaad9e94fe7b2f5876a7939/lib/node-progress.js#L154-L159
        this.bar.stream.write(this.bar.lastDraw);
      }
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this.clear();
      this.bar = null;
    }
  }]);

  return ProgressBarController;
}();

exports.default = new ProgressBarController();
module.exports = exports["default"];