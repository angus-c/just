"use strict";

exports["test fail fast"] = require("./fail-fast")
exports["test async"] = require("./async")
exports["test assertions"] = require("./assert")
exports["test custom `Assert`'s"] = require("./custom-asserts")

require("../test").run(exports)
