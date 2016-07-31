export default {
  "Collections": {
    "just-compare": {
      "code": [
        `var compare = require('just-compare')\n
compare([1, [2, {a: 4}], 4], [1, [2, {a: 4}], 4]);`
      ]
    },
    "just-pluck-it": {
      "code": [
        `var pluck = require('just-pluck-it')\n
pluck({x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}}, 'a')`
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
      "code": [
        `var flip = require('just-flip-object')\n
flip({a: 'x', b: 'y', c: 'z'}); // {x: 'a', y: 'b', z: 'c'}`
      ]
    },
    "just-map-object": {
      "code": [
        `var map = require('just-map-object')\n
map({a: 3, b: 5, c: 9}, (key, value) => key + value);`
      ]
    },
    "just-pick": {
      "code": [
        `var pick = require('just-pick')\n
var obj = {a: 3, b: 5, c: 9};
pick(obj, ['a', 'c']);`
      ]
    },
    "just-reduce-object": {
      "code": [
        `var reduce = require('just-reduce-object')\n
reduce({a: 3, b: 5, c: 9}, (acc, key, value, index, keys) => {
  acc[value] = key;
  return acc;
}, {});`
      ]
    },
    "just-typeof": {
      "code": [
        `var typeOf = require('just-typeof')\n
typeOf({});
typeOf([]);
typeOf(function() {});
typeOf(/a/);
typeOf(new Date());
typeOf(null);
typeOf(undefined);
typeOf('a');
typeOf(1);
typeOf(true);`
      ]
    }
  },
  "Array": {
    "just-unique": {
      "code": [
        `var unique = require('just-unique')\n
unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]);`
      ]
    },
    "just-flatten-it": {
      "code": [
        `var flatten = require('just-flatten-it')\n
flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);`
      ]
    },
    "just-intersect": {
      "code": [
        `var intersect = require('just-intersect')\n
intersect([1, 2, 5, 6], [2, 3, 5, 6]);`
      ]
    },
    "just-last": {
      "code": [
        `var last = require('just-last')\n
last([true, false, [true, false]]);`
      ]
    },
    "just-remove": {
      "code": [
        `var remove = require('just-remove')\n
remove([1, 2, 3, 4, 5, 6], [1, 3, 6]);`
      ]
    },
    "just-union": {
      "code": [
        `var union = require('just-union')\n
union([1, 2, 5, 6], [2, 3, 4, 6]);`
      ]
    }
  },
  "Strings": {
    "just-template": {
      "code": [
        `var template = require('just-template')\n
const data = {
  a: {
    aa: {
      aaa: 'apple',
      bbb: 'pear'
    },
    bb: 'orange'
  },
  b: 'plum'
};
template('2 \${a.aa.aaa}s, a \${a.aa.bbb}, 3 \${a.bb}s and a \${b}. Yes 1 \${a.aa.bbb}.', data);`
      ]
    }
  },
  "Functions": {
    "just-compose": {
      "code": [
        `var compose = require('just-compose')\n
const sqRootBiggest = compose(Math.max, Math.sqrt, Math.trunc);
sqRootBiggest(7, 0, 16);`
      ]
    },
    "just-curry-it": {
      "code": [
        `var curry = require('just-curry-it')\n
function converter(ratio, input) {
  return (input*ratio).toFixed(1);
}
const milesToKm = curry(converter, 1.62);
milesToKm(35);`
      ]
    },
    "just-partial-it": {
      "code": [
        `var partial = require('just-partial')\n
const cubedRoot = partial(Math.pow, undefined, 1/3);
cubedRoot(35).toFixed(1);`
      ]
    }
  }
};
