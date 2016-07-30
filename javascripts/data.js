export default {
  "object": {
    "just-extend": {
      "code": [
        `var extend = require('just-extend')\n
  let obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8});`
      ],
    },
    "just-filter-object": {
      "code": [
        `var filter = require('just-filter-object')\n
  filter({a: 3, b: 5, c: 9}, (key, value) => value < 6);`
      ],
    },
    "just-flip-object": {
      "code": [],
    },
    "just-map-object": {
      "code": [],
    },
    "just-pick": {
      "code": [],
    },
    "just-reduce-object": {
      "code": [],
    },
    "just-typeof": {
      "code": [],
    }
  }
};
