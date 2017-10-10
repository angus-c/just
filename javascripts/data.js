export default {
  Collections: {
    symbol: '{}[]',
    utils: {
      'just-diff': {
        size: 626,
        code: [
          `const {diff, jsonPatchPathConverter} = require('just-diff')\n
diff(
  {a: 2, b: {bb: 4}, c: [1, 3]},
  {b: {cc: 4}, c: [1, 2, 5]},
  /* jsonPatchPathConverter */
);`
        ]
      },
      'just-diff-apply': {
        size: 677,
        code: [
          `const {diffApply, jsonPatchPathConverter} = require('just-diff-apply')\n
const obj1 = {a: 3, b: 5};
diffApply(obj1,
  [
    { "op": "remove", "path": ['b'] },
    { "op": "replace", "path": ['a'], "value": 4 },
    { "op": "add", "path": ['c'], "value": 5 }
  ],
  /* jsonPatchPathConverter */
);
obj1;`
        ]
      },
      'just-compare': {
        size: 539,
        code: [
          `const compare = require('just-compare')\n
compare([1, [2, {a: 4}], 4], [1, [2, {a: 4}], 4]);`
        ]
      },
      'just-clone': {
        size: 355,
        code: [
          `const clone = require('just-clone')\n
const arr = [1, 2, 3];
const subObj = {aa: 1};
const obj = {a: 3, b: 5, c: arr, d: subObj};
const objClone = clone(obj);
arr.push(4);
subObj.bb = 2;
obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}  
objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}`
        ]
      },
      'just-pluck-it': {
        size: 448,
        code: [
          `const pluck = require('just-pluck-it')\n
pluck({x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}}, 'a')`
        ]
      },
      'just-flush': {
        size: 419,
        code: [
          `const flush = require('just-flush')\n
flush([1, undefined, 2, null, 3, NaN, 0])
// flush({a: 2, b: null, c: 4, d: undefined})`
        ]
      }
    }
  },
  Objects: {
    symbol: '{}',
    utils: {
      'just-merge': {
        size: 369,
        code: [
          `const merge = require('just-merge')\n
let obj = {a: 3, b: 5};
merge(obj, {a: 4, c: 8});`
        ]
      },
      'just-extend': {
        size: 455,
        code: [
          `// like just-merge but allows deep copy
const extend = require('just-extend')\n          
let arr = [1, 2, 3];
let obj = {a: 3, b: 5};
extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push[4];
obj`
        ]
      },
      'just-values': {
        size: 426,
        code: [
          `const values = require('just-values')\n
values({a: 4, b: 9, c: 8});`
        ]
      },
      'just-entries': {
        size: 398,
        code: [
          `const entries = require('just-entries')\n
entries({a: 4, b: 9, c: 8});`
        ]
      },
      'just-pick': {
        size: 369,
        code: [
          `const pick = require('just-pick')\n
const obj = {a: 3, b: 5, c: 9};
pick(obj, ['a', 'c']);`
        ]
      },
      'just-omit': {
        size: 376,
        code: [
          `const omit = require('just-omit')\n
var obj = {a: 3, b: 5, c: 9};
omit(obj, ['a', 'c']);`
        ]
      },
      'just-filter-object': {
        size: 348,
        code: [
          `const filter = require('just-filter-object')\n
filter({a: 3, b: 5, c: 9}, (key, value) => value < 6);`
        ]
      },
      'just-flip-object': {
        size: 348,
        code: [
          `const flip = require('just-flip-object')\n
flip({a: 'x', b: 'y', c: 'z'}); // {x: 'a', y: 'b', z: 'c'}`
        ]
      },
      'just-map-object': {
        size: 351,
        code: [
          `const map = require('just-map-object')\n
map({a: 3, b: 5, c: 9}, (key, value) => key + value);`
        ]
      },
      'just-reduce-object': {
        size: 385,
        code: [
          `const reduce = require('just-reduce-object')\n
reduce({a: 3, b: 5, c: 9}, (acc, key, value, index, keys) => {
  acc[value] = key;
  return acc;
}, {});`
        ]
      },
      'just-is-empty': {
        size: 354,
        code: [
          `const isEmpty = require('just-is-empty');\n
isEmpty({a: 3, b: 5});`
        ]
      },
      'just-is-circular': {
        size: 437,
        code: [
          `const obj = {};
obj.x = {y: obj};
const isCircular = require('just-is-circular');\n
isCircular(obj);`
        ]
      },
      'just-is-primitive': {
        size: 308,
        code: [
          `const isPrimitive = require('just-is-primitive');\n
isPrimitive(new Date());`
        ]
      },
      'just-safe-get': {
        size: 350,
        code: [
          `const get = require('just-safe-get');\n
const obj = {a: {aa: {aaa: 2}}, b: 4};
get(obj, 'b.bb.bbb');`
        ]
      },
      'just-safe-set': {
        size: 375,
        code: [
          `const set = require('just-safe-set');\n
const obj = {};
set(obj, 'a.aa.aaa', {aaaa: 4});
obj;`
        ]
      },
      'just-typeof': {
        size: 356,
        code: [
          `const typeOf = require('just-typeof');\n
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
    }
  },
  Arrays: {
    symbol: '[]',
    utils: {
      'just-unique': {
        size: 563,
        code: [
          `const unique = require('just-unique');\n
unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]);`
        ]
      },
      'just-flatten-it': {
        size: 364,
        code: [
          `const flatten = require('just-flatten-it')\n
flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);`
        ]
      },
      'just-index': {
        size: 427,
        code: [
          `const index = require('just-index')\n
index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id');`
        ]
      },
      'just-insert': {
        size: 435,
        code: [
          `const insert = require('just-insert')\n
insert([1, 2, 5, 6], ['a', 'c', 'e'], 2);`
        ]
      },
      'just-intersect': {
        size: 354,
        code: [
          `const intersect = require('just-intersect')\n
intersect([1, 2, 5, 6], [2, 3, 5, 6]);`
        ]
      },
      'just-compact': {
        size: 381,
        code: [
          `const compact = require('just-compact')\n
compact([1, null, 2, undefined, null, NaN, 3, 4, false, 5]);`
        ]
      },
      'just-last': {
        size: 349,
        code: [
          `const last = require('just-last')\n
last([true, false, [true, false]]);`
        ]
      },
      'just-split': {
        size: 364,
        code: [
          `const split = require('just-split')\n
split([1, 2, 3, 4, 5, 6, 7, 8], 2);`
        ]
      },
      'just-tail': {
        size: 345,
        code: [
          `const tail = require('just-tail')\n
tail([0, 1, 2, 3, 4, 5]);`
        ]
      },
      'just-random': {
        size: 362,
        code: [
          `const random = require('just-random');\n
random([1, 2, 3]);`
        ]
      },
      'just-shuffle': {
        size: 405,
        code: [
          `const shuffle = require('just-shuffle');\n
shuffle([1, 2, 3, 4, 5]);`
        ]
      },
      'just-range': {
        size: 435,
        code: [
          `const range = require('just-range')\n
range(0, 20, 5);`
        ]
      },
      'just-split': {
        size: 364,
        code: [
          `const split = require('just-split')\n
split([1, 2, 3, 4, 5, 6, 7, 8], 2);`
        ]
      },
      'just-split-at': {
        size: 415,
        code: [
          `const splitAt = require('just-split-at');\n
splitAt([1, 2, 3, 4, 5], 2);`
        ]
      },
      'just-partition': {
        size: 430,
        code: [
          `const partition = require('just-partition');\n
partition([1, 5, 3, 4, 2], n => n > 3);`
        ]
      },
      'just-remove': {
        size: 412,
        code: [
          `const remove = require('just-remove')\n
remove([1, 2, 3, 4, 5, 6], [1, 3, 6]);`
        ]
      },
      'just-union': {
        size: 419,
        code: [
          `const union = require('just-union')\n
union([1, 2, 5, 6], [2, 3, 4, 6]);`
        ]
      },
      'just-zip-it': {
        size: 473,
        code: [
          `const zip = require('just-zip-it')\n
zip([1, 2, 3], [4, 5, 6], [7, 8, 9]);`
        ]
      }
    }
  },
  Strings: {
    symbol: '""',
    utils: {
      'just-template': {
        size: 379,
        code: [
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
      'just-truncate': {
        size: 352,
        code: [
          `const truncate = require('just-truncate')\n
truncate('when shall we three meet again', 10, ' (etc)');`
        ]
      },
      'just-prune': {
        size: 385,
        code: [
          `const prune = require('just-prune')\n
prune('when shall we three meet again', 12, ' (etc)');`
        ]
      },
      'just-squash': {
        size: 330,
        code: [
          `const squash = require('just-squash')\n
squash(\`\tthe cat\n sat \fon \vthe \rmat \`, true);`
        ]
      },
      'just-left-pad': {
        size: 376,
        code: [
          `const leftPad = require('just-left-pad')\n
leftPad('hello', 9, '.');`
        ]
      },
      'just-right-pad': {
        size: 375,
        code: [
          `const rightPad = require('just-right-pad')\n
rightPad('hello', 9, '.');`
        ]
      },
      'just-camel-case': {
        size: 459,
        code: [
          `const camelCase = require('just-camel-case')\n
camelCase('the-quick-brown _fox');`
        ]
      },
      'just-snake-case': {
        size: 444,
        code: [
          `const snakeCase = require('just-snake-case')\n
snakeCase('theQuickBrownFox');`
        ]
      },
      'just-kebab-case': {
        size: 444,
        code: [
          `const kebabCase = require('just-kebab-case')\n
kebabCase('theQuickBrownFox');`
        ]
      },
      'just-pascal-case': {
        size: 456,
        code: [
          `const pascalCase = require('just-pascal-case')\n
pascalCase('the-quick-brown _fox');`
        ]
      }
    }
  },
  Numbers: {
    symbol: '+-',
    utils: {
      'just-clamp': {
        size: 412,
        code: [
          `const clamp = require('just-clamp');\n
var n = 5;
clamp(1, n, 3); // 3`
        ]
      },
      'just-modulo': {
        size: 319,
        code: [
          `const modulo = require('just-modulo');\n
modulo(-4, 13);`
        ]
      }
    }
  },
  Functions: {
    symbol: '=>',
    utils: {
      'just-compose': {
        size: 415,
        code: [
          `const compose = require('just-compose')\n
const sqRootBiggest = compose(Math.max, Math.sqrt, Math.trunc);
sqRootBiggest(7, 0, 16);`
        ]
      },
      'just-curry-it': {
        size: 346,
        code: [
          `const curry = require('just-curry-it')\n
function add(a, b, c) {
  return a + b + c;
}
curry(add)(1)(2)(3);`
        ]
      },
      'just-demethodize': {
        size: 348,
        code: [
          `const demethodize = require('just-demethodize');

const trimFn = demethodize(''.trim);
['hello ', ' goodbye', 'hello again'].map(trimFn)`
        ]
      },
      'just-partial-it': {
        size: 396,
        code: [
          `const partial = require('just-partial-it')\n
const cubedRoot = partial(Math.pow, undefined, 1/3);
cubedRoot(35).toFixed(1);`
        ]
      },
      'just-flip': {
        size: 359,
        code: [
          `const flip = require('just-flip');

flip(console.log)(1, 2, 3);`
        ]
      },
      'just-debounce-it': {
        size: 383,
        code: [
          `const debounce = require('just-debounce-it');

const fn1 = debounce(() => console.log('Hello'), 1000, true);
fn1();
fn1();
fn1();
fn1();`
        ]
      },
      'just-throttle': {
        size: 373,
        code: [
          `const throttle = require('just-throttle');

const fn1 = throttle(() => console.log('hello'), 2000, true);
setInterval(fn1, 400);`
        ]
      },
      'just-once': {
        size: 376,
        code: [
          `const once = require('just-once');

let i = 0;
const addOnce = once(() => i++);
addOnce();
addOnce();
i;`
        ]
      }
    }
  }
};
