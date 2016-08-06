export default {
  "Collections": {
    "just-compare": {
      "code": [
        `const compare = require('just-compare')\n
compare([1, [2, {a: 4}], 4], [1, [2, {a: 4}], 4]);`
      ]
    },
    "just-pluck-it": {
      "code": [
        `const pluck = require('just-pluck-it')\n
pluck({x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}}, 'a')`
      ]
    }
  }
};
