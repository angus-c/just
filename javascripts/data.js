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
    },
    "just-flush": {
      "code": [
        `const flush = require('just-flush')\n
flush([1, undefined, 2, null, 3, NaN, 0])
// flush({a: 2, b: null, c: 4, d: undefined})`
      ]
    }
  },
  "Object": {
    "just-extend": {
      "code": [
        `const extend = require('just-extend')\n
let obj = {a: 3, b: 5};
extend(obj, {a: 4, c: 8});`
      ]
    },
    "just-values": {
      "code": [
        `const values = require('just-values')\n
values({a: 4, b: 9, c: 8});`
      ]
    },
    "just-pick": {
      "code": [
        `const pick = require('just-pick')\n
const obj = {a: 3, b: 5, c: 9};
pick(obj, ['a', 'c']);`
      ]
    },
    "just-omit": {
      "code": [
        `const omit = require('just-omit')\n
var obj = {a: 3, b: 5, c: 9};
omit(obj, ['a', 'c']);`
      ]
    },
    "just-filter-object": {
      "code": [
        `const filter = require('just-filter-object')\n
filter({a: 3, b: 5, c: 9}, (key, value) => value < 6);`
      ],
    },
    "just-flip-object": {
      "code": [
        `const flip = require('just-flip-object')\n
flip({a: 'x', b: 'y', c: 'z'}); // {x: 'a', y: 'b', z: 'c'}`
      ]
    },
    "just-map-object": {
      "code": [
        `const map = require('just-map-object')\n
map({a: 3, b: 5, c: 9}, (key, value) => key + value);`
      ]
    },
    "just-reduce-object": {
      "code": [
        `const reduce = require('just-reduce-object')\n
reduce({a: 3, b: 5, c: 9}, (acc, key, value, index, keys) => {
  acc[value] = key;
  return acc;
}, {});`
      ]
    },
    "just-is-empty": {
      "code": [
        `const isEmpty = require('just-is-empty')\n
isEmpty({a: 3, b: 5});`
      ]
    },
    "just-safe-get": {
      "code": [
        `const get = require('just-safe-get')\n
const obj = {a: {aa: {aaa: 2}}, b: 4};
get(obj, 'b.bb.bbb');`
      ]
    },
    "just-safe-set": {
      "code": [
        `const set = require('just-safe-set')\n
const obj = {};
set(obj, 'a.aa.aaa', {aaaa: 4});
obj;`
      ]
    },
    "just-typeof": {
      "code": [
        `const typeOf = require('just-typeof')\n
typeOf({});
// typeOf([]);
// typeOf(function() {});
// typeOf(/a/);
// typeOf(new Date());
// typeOf(null);
// typeOf(undefined);
// typeOf('a');
// typeOf(1);
// typeOf(true);`
      ]
    }
  },
  "Array": {
    "just-unique": {
      "code": [
        `const unique = require('just-unique')\n
unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]);`
      ]
    },
    "just-flatten-it": {
      "code": [
        `const flatten = require('just-flatten-it')\n
flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);`
      ]
    },
    "just-index": {
      "code": [
        `const index = require('just-index')\n
index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id');`
      ]
    },
    "just-insert": {
      "code": [
        `const insert = require('just-insert')\n
insert([1, 2, 5, 6], ['a', 'c', 'e'], 2);`
      ]
    },
    "just-intersect": {
      "code": [
        `const intersect = require('just-intersect')\n
intersect([1, 2, 5, 6], [2, 3, 5, 6]);`
      ]
    },
    "just-compact": {
      "code": [
        `const compact = require('just-compact')\n
compact([1, null, 2, undefined, null, NaN, 3, 4, false, 5]);`
      ]
    },
    "just-last": {
      "code": [
        `const last = require('just-last')\n
last([true, false, [true, false]]);`
      ]
    },
    "just-tail": {
      "code": [
        `const tail = require('just-tail')\n
tail([0, 1, 2, 3, 4, 5]);`
      ]
    },
    "just-random": {
      "code": [
        `const random = require('just-random');\n
random([1, 2, 3]);`
      ]
    },
    "just-shuffle": {
      "code": [
        `const shuffle = require('just-shuffle');\n
shuffle([1, 2, 3, 4, 5]);`
      ]
    },
    "just-range": {
      "code": [
        `const range = require('just-range')\n
range(0, 20, 5);`
      ]
    },
    "just-remove": {
      "code": [
        `const remove = require('just-remove')\n
remove([1, 2, 3, 4, 5, 6], [1, 3, 6]);`
      ]
    },
    "just-union": {
      "code": [
        `const union = require('just-union')\n
union([1, 2, 5, 6], [2, 3, 4, 6]);`
      ]
    }
  },
  "Strings": {
    "just-template": {
      "code": [
        `const template = require('just-template')\n
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
template('2 {{a.aa.aaa}}s, a {{a.aa.bbb}}, 3 {{a.bb}} and a {{b}}. Yes 1 {{a.aa.bbb}}.', data);`
      ]
    },
    "just-truncate": {
      "code": [
        `const truncate = require('just-truncate')\n
truncate('when shall we three meet again', 10, ' (etc)');`
      ]
    },
    "just-prune": {
      "code": [
        `const prune = require('just-prune')\n
prune('when shall we three meet again', 12, ' (etc)');`
      ]
    },
    "just-squash": {
      "code": [
        `const squash = require('just-squash')\n
squash(\`\tthe cat\n sat \fon \vthe \rmat \`, true);`
      ]
    },
    "just-left-pad": {
      "code": [
        `const leftPad = require('just-left-pad')\n
leftPad('hello', 9, '.');`
      ]
    },
    "just-right-pad": {
      "code": [
        `const rightPad = require('just-right-pad')\n
rightPad('hello', 9, '.');`
      ]
    },
    "just-camel-case": {
      "code": [
        `const camelCase = require('just-camel-case')\n
camelCase('the-quick-brown _fox');`
      ]
    },
    "just-snake-case": {
      "code": [
        `const snakeCase = require('just-snake-case')\n
snakeCase('theQuickBrownFox');`
      ]
    },
    "just-kebab-case": {
      "code": [
        `const kebabCase = require('just-kebab-case')\n
kebabCase('theQuickBrownFox');`
      ]
    }
  },
  "Number": {
    "just-clamp": {
      "code": [
        `const clamp = require('just-clamp');\n
var n = 5;
clamp(1, n, 3); // 3`
      ]
    }
  },
  "Functions": {
    "just-compose": {
      "code": [
        `const compose = require('just-compose')\n
const sqRootBiggest = compose(Math.max, Math.sqrt, Math.trunc);
sqRootBiggest(7, 0, 16);`
      ]
    },
    "just-curry-it": {
      "code": [
        `const curry = require('just-curry-it')\n
function add(a, b, c) {
  return a + b + c;
}
curry(add)(1)(2)(3);`
      ]
    },
    "just-partial-it": {
      "code": [
        `const partial = require('just-partial')\n
const cubedRoot = partial(Math.pow, undefined, 1/3);
cubedRoot(35).toFixed(1);`
      ]
    },
    "just-flip-it": {
      "code": [
        `import flip from 'just-flip';
import map from 'just-map-object';
import curry from 'just-curry';
 
const numbers = {x: 5, y: 10};
const flippedMap = flip(map);
const double = curry(flippedMap, (_, number) => number * 2);
double(numbers);`
      ]
    }
  }
};
