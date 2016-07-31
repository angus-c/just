export default {
  "Collections": {
    "just-compare": {
      "code": [
        `var extend = require('just-extend')\n
let obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8});`
      ]
    },
    "just-pluck-it": {
      "code": [
        `var filter = require('just-filter-object')\n
filter({a: 3, b: 5, c: 9}, (key, value) => value < 6);`
      ]
    }
  },
  "Object": {
    "just-extend": {
      "code": [
        `var extend = require('just-extend')\n
let obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8});`
      ]
    },
    "just-filter-object": {
      "code": [
        `var filter = require('just-filter-object')\n
filter({a: 3, b: 5, c: 9}, (key, value) => value < 6);`
      ],
    },
    "just-flip-object": {
      "code": []
    },
    "just-map-object": {
      "code": []
    },
    "just-pick": {
      "code": []
    },
    "just-reduce-object": {
      "code": []
    },
    "just-typeof": {
      "code": []
    }
  },
  "Array": {
    "just-unique": {
      "code": [
        `var extend = require('just-extend')\n
let obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8});`
      ]
    },
    "just-flatten-it": {
      "code": [
        `var filter = require('just-filter-object')\n
filter({a: 3, b: 5, c: 9}, (key, value) => value < 6);`
      ]
    },
    "just-intersect": {
      "code": []
    },
    "just-last": {
      "code": []
    },
    "just-remove": {
      "code": []
    },
    "just-union": {
      "code": []
    }
  },
  "Strings": {
    "just-template": {
      "code": [
        `var extend = require('just-extend')\n
let obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8});`
      ]
    }
  },
  "Functions": {
    "just-compose": {
      "code": [
        `var extend = require('just-extend')\n
let obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8});`
      ]
    },
    "just-curry-it": {
      "code": [
        `var extend = require('just-extend')\n
  let obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8});`
      ]
    },
    "just-partial-it": {
      "code": [
        `var extend = require('just-extend')\n
  let obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8});`
      ]
    }
  }
};
