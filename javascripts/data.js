const sizes = require('./sizes');

module.exports = {
  Collections: {
    symbol: '{}[]',
    utils: {
      'just-clone': {
        size: sizes['just-clone'],
        code: [
          `const clone = require('just-clone')\n
const arr = [1, 2, 3];
const subObj = {aa: 1};
const obj = {a: 3, b: 5, c: arr, d: subObj};
const objClone = clone(obj);
arr.push(4);
objClone.d.bb = 2;
obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}
objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}`,
        ],
      },
      'just-diff': {
        size: sizes['just-diff'],
        code: [
          `const {diff, jsonPatchPathConverter} = require('just-diff')\n
diff(
  {a: 2, b: {bb: 4}, c: [1, 3]},
  {b: {cc: 4}, c: [1, 2, 5]},
  /* jsonPatchPathConverter */
);`,
        ],
      },
      'just-diff-apply': {
        size: sizes['just-diff'],
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
obj1;`,
        ],
      },
      'just-compare': {
        size: sizes['just-compare'],
        code: [
          `const compare = require('just-compare')\n
compare([1, [2, {a: 4}], 4], [1, [2, {a: 4}], 4]);`,
        ],
      },
      'just-pluck-it': {
        size: sizes['just-pluck-it'],
        code: [
          `const pluck = require('just-pluck-it')\n
pluck({x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}}, 'a')`,
        ],
      },
      'just-flush': {
        size: sizes['just-flush'],
        code: [
          `const flush = require('just-flush')\n
flush([1, undefined, 2, null, 3, NaN, 0])
// flush({a: 2, b: null, c: 4, d: undefined})`,
        ],
      },
    },
  },
  Objects: {
    symbol: '{}',
    utils: {
      'just-merge': {
        size: sizes['just-merge'],
        code: [
          `const merge = require('just-merge')\n
let obj = {a: 3, b: 5};
merge(obj, {a: 4, c: 8});`,
        ],
      },
      'just-extend': {
        size: sizes['just-extend'],
        code: [
          `// like just-merge but allows deep copy
const extend = require('just-extend')\n
let arr = [1, 2, 3];
let obj = {a: 3, b: 5};
extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push[4];
obj`,
        ],
      },
      'just-values': {
        size: sizes['just-values'],
        code: [
          `const values = require('just-values')\n
values({a: 4, b: 9, c: 8});`,
        ],
      },
      'just-entries': {
        size: sizes['just-entries'],
        code: [
          `const entries = require('just-entries')\n
entries({a: 4, b: 9, c: 8});`,
        ],
      },
      'just-pick': {
        size: sizes['just-pick'],
        code: [
          `const pick = require('just-pick')\n
const obj = {a: 3, b: 5, c: 9};
pick(obj, ['a', 'c']);`,
        ],
      },
      'just-omit': {
        size: sizes['just-omit'],
        code: [
          `const omit = require('just-omit')\n
var obj = {a: 3, b: 5, c: 9};
omit(obj, ['a', 'c']);`,
        ],
      },
      'just-filter-object': {
        size: sizes['just-filter-object'],
        code: [
          `const filter = require('just-filter-object')\n
filter({a: 3, b: 5, c: 9}, (key, value) => value < 6);`,
        ],
      },
      'just-flip-object': {
        size: sizes['just-flip-object'],
        code: [
          `const flip = require('just-flip-object')\n
flip({a: 'x', b: 'y', c: 'z'}); // {x: 'a', y: 'b', z: 'c'}`,
        ],
      },
      'just-map-object': {
        size: sizes['just-map-object'],
        code: [
          `// DEPRECATED: use just-map-values
const map = require('just-map-object')\n
map({a: 3, b: 5, c: 9}, (key, value) => key + value);`,
        ],
      },
      'just-map-keys': {
        size: sizes['just-map-keys'],
        code: [
          `const map = require('just-map-keys')\n
map({a: 3, b: 5, c: 9}, (value, key, obj) => obj.b + value + key);`,
        ],
      },
      'just-map-values': {
        size: sizes['just-map-values'],
        code: [
          `const map = require('just-map-values')\n
map({a: 3, b: 5, c: 9}, (value, key, obj) => obj.b + value + key);`,
        ],
      },
      'just-reduce-object': {
        size: sizes['just-reduce-object'],
        code: [
          `const reduce = require('just-reduce-object')\n
reduce({a: 3, b: 5, c: 9}, (acc, key, value, index, keys) => {
  acc[value] = key;
  return acc;
}, {});`,
        ],
      },
      'just-is-empty': {
        size: sizes['just-is-empty'],
        code: [
          `const isEmpty = require('just-is-empty');\n
isEmpty({a: 3, b: 5});`,
        ],
      },
      'just-is-circular': {
        size: sizes['just-is-circular'],
        code: [
          `const obj = {};
obj.x = {y: obj};
const isCircular = require('just-is-circular');\n
isCircular(obj);`,
        ],
      },
      'just-is-primitive': {
        size: sizes['just-is-primitive'],
        code: [
          `const isPrimitive = require('just-is-primitive');\n
isPrimitive(new Date());`,
        ],
      },
      'just-safe-get': {
        size: sizes['just-safe-get'],
        code: [
          `const get = require('just-safe-get');\n
const obj = {a: {aa: {aaa: 2}}, b: 4};
get(obj, 'b.bb.bbb');`,
        ],
      },
      'just-safe-set': {
        size: sizes['just-safe-set'],
        code: [
          `const set = require('just-safe-set');\n
const obj = {};
set(obj, 'a.aa.aaa', {aaaa: 4});
obj;`,
        ],
      },
      'just-has': {
        size: sizes['just-has'],
        code: [
          `const has = require('just-has');\n
const obj = {a: {aa: {aaa: 2}}, b: 4};
has(obj, ['a', 'aa', 'aaa']);`,
        ],
      },
      'just-typeof': {
        size: sizes['just-typeof'],
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
// typeOf(true);`,
        ],
      },
    },
  },
  Arrays: {
    symbol: '[]',
    utils: {
      'just-unique': {
        size: sizes['just-unique'],
        code: [
          `const unique = require('just-unique');\n
unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]);`,
        ],
      },
      'just-flatten-it': {
        size: sizes['just-flatten-it'],
        code: [
          `const flatten = require('just-flatten-it')\n
flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);`,
        ],
      },
      'just-index': {
        size: sizes['just-index'],
        code: [
          `const index = require('just-index')\n
index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id');`,
        ],
      },
      'just-insert': {
        size: sizes['just-insert'],
        code: [
          `const insert = require('just-insert')\n
insert([1, 2, 5, 6], ['a', 'c', 'e'], 2);`,
        ],
      },
      'just-intersect': {
        size: sizes['just-intersect'],
        code: [
          `const intersect = require('just-intersect')\n
intersect([1, 2, 5, 6], [2, 3, 5, 6]);`,
        ],
      },
      'just-compact': {
        size: sizes['just-compact'],
        code: [
          `const compact = require('just-compact')\n
compact([1, null, 2, undefined, null, NaN, 3, 4, false, 5]);`,
        ],
      },
      'just-last': {
        size: sizes['just-last'],
        code: [
          `const last = require('just-last')\n
last([true, false, [true, false]]);`,
        ],
      },
      'just-tail': {
        size: sizes['just-tail'],
        code: [
          `const tail = require('just-tail')\n
tail([0, 1, 2, 3, 4, 5]);`,
        ],
      },
      'just-random': {
        size: sizes['just-random'],
        code: [
          `const random = require('just-random');\n
random([1, 2, 3]);`,
        ],
      },
      'just-shuffle': {
        size: sizes['just-shuffle'],
        code: [
          `const shuffle = require('just-shuffle');\n
shuffle([1, 2, 3, 4, 5]);`,
        ],
      },
      'just-range': {
        size: sizes['just-range'],
        code: [
          `const range = require('just-range')\n
range(0, 20, 5);`,
        ],
      },
      'just-split': {
        size: sizes['just-split'],
        code: [
          `const split = require('just-split')\n
split([1, 2, 3, 4, 5, 6, 7, 8], 2);`,
        ],
      },
      'just-split-at': {
        size: sizes['just-split-at'],
        code: [
          `const splitAt = require('just-split-at');\n
splitAt([1, 2, 3, 4, 5], 2);`,
        ],
      },
      'just-partition': {
        size: sizes['just-partition'],
        code: [
          `const partition = require('just-partition');\n
partition([1, 5, 3, 4, 2], n => n > 3);`,
        ],
      },
      'just-remove': {
        size: sizes['just-remove'],
        code: [
          `const remove = require('just-remove')\n
remove([1, 2, 3, 4, 5, 6], [1, 3, 6]);`,
        ],
      },
      'just-union': {
        size: sizes['just-union'],
        code: [
          `const union = require('just-union')\n
union([1, 2, 5, 6], [2, 3, 4, 6]);`,
        ],
      },
      'just-zip-it': {
        size: sizes['just-zip-it'],
        code: [
          `const zip = require('just-zip-it')\n
zip([1, 2, 3], [4, 5, 6], [7, 8, 9]);`,
        ],
      },
      'just-group-by': {
        size: sizes['just-group-by'],
        code: [
          `const groupBy = require('just-group-by')\n
groupBy([1,2,3,4,5,6,7,8], function(i) { return i % 2});`,
        ],
      },
    },
  },
  Statistics: {
    symbol: 'Σ',
    utils: {
      'just-mean': {
        size: sizes['just-mean'],
        code: [
          `const mean = require('just-mean')\n
mean([1, 4, 5, -9]);`,
        ],
      },
      'just-median': {
        size: sizes['just-median'],
        code: [
          `const median = require('just-median')\n
median([1, 4, 5, -9, 2]);`,
        ],
      },
      'just-mode': {
        size: sizes['just-mode'],
        code: [
          `const mode = require('just-mode')\n
mode([1, 4, 4, -9, 2]);`,
        ],
      },
      'just-percentile': {
        size: sizes['just-percentile'],
        code: [
          `const percentile = require('just-percentile')\n
percentile([15, 20, 35, 40, 50], 30);`,
        ],
      },
      'just-variance': {
        size: sizes['just-variance'],
        code: [
          `const variance = require('just-variance')\n
variance([1, 3, 9, 4, -1]);`,
        ],
      },
      'just-standard-deviation': {
        size: sizes['just-standard-deviation'],
        code: [
          `const standardDeviation = require('just-standard-deviation')\n
standardDeviation([1, 3, 9, 4, -1]);`,
        ],
      },
      'just-skewness': {
        size: sizes['just-skewness'],
        code: [
          `const skewness = require('just-skewness')\n
skewness([1, 2, 3, 5]);`,
        ],
      },
    },
  },
  Strings: {
    symbol: '""',
    utils: {
      'just-template': {
        size: sizes['just-template'],
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
template('2 {{a.aa.aaa}}s, a {{a.aa.bbb}}, 3 {{a.bb}} and a {{b}}. Yes 1 {{a.aa.bbb}}.', data);`,
        ],
      },
      'just-truncate': {
        size: sizes['just-truncate'],
        code: [
          `const truncate = require('just-truncate')\n
truncate('when shall we three meet again', 10, ' (etc)');`,
        ],
      },
      'just-prune': {
        size: sizes['just-prune'],
        code: [
          `const prune = require('just-prune')\n
prune('when shall we three meet again', 12, ' (etc)');`,
        ],
      },
      'just-squash': {
        size: sizes['just-squash'],
        code: [
          `const squash = require('just-squash')\n
squash(\`\tthe cat\n sat \fon \vthe \rmat \`, true);`,
        ],
      },
      'just-left-pad': {
        size: sizes['just-left-pad'],
        code: [
          `const leftPad = require('just-left-pad')\n
leftPad('hello', 7, '🐄');`,
        ],
      },
      'just-right-pad': {
        size: sizes['just-right-pad'],
        code: [
          `const rightPad = require('just-right-pad')\n
rightPad('hello', 7, '🐄');`,
        ],
      },
      'just-camel-case': {
        size: sizes['just-camel-case'],
        code: [
          `const camelCase = require('just-camel-case')\n
camelCase('the-quick-brown _fox');`,
        ],
      },
      'just-snake-case': {
        size: sizes['just-snake-case'],
        code: [
          `const snakeCase = require('just-snake-case')\n
snakeCase('theQuickBrownFox');`,
        ],
      },
      'just-kebab-case': {
        size: sizes['just-kebab-case'],
        code: [
          `const kebabCase = require('just-kebab-case')\n
kebabCase('theQuickBrownFox');`,
        ],
      },
      'just-pascal-case': {
        size: sizes['just-pascal-case'],
        code: [
          `const pascalCase = require('just-pascal-case')\n
pascalCase('the-quick-brown _fox');`,
        ],
      },
      'just-capitalize': {
        size: sizes['just-capitalize'],
        code: [
          `const capitalize = require('just-capitalize')\n
capitalize('all the THINGS');`,
        ],
      },
      'just-replace-all': {
        size: sizes['just-replace-all'],
        code: [
          `const replaceAll = require('just-replace-all')\n
replaceAll('Mississippi', 's', '*');`,
        ],
      },
    },
  },
  Numbers: {
    symbol: '+-',
    utils: {
      'just-clamp': {
        size: sizes['just-clamp'],
        code: [
          `const clamp = require('just-clamp');\n
var n = 5;
clamp(1, n, 3); // 3`,
        ],
      },
      'just-modulo': {
        size: sizes['just-modulo'],
        code: [
          `const modulo = require('just-modulo');\n
modulo(-4, 13);`,
        ],
      },
    },
  },
  Functions: {
    symbol: '=>',
    utils: {
      'just-compose': {
        size: sizes['just-compose'],
        code: [
          `const compose = require('just-compose')\n
const sqRootBiggest = compose(Math.max, Math.sqrt, Math.trunc);
sqRootBiggest(7, 0, 16);`,
        ],
      },
      'just-curry-it': {
        size: sizes['just-curry-it'],
        code: [
          `const curry = require('just-curry-it')\n
function add(a, b, c) {
  return a + b + c;
}
curry(add)(1)(2)(3);`,
        ],
      },
      'just-demethodize': {
        size: sizes['just-demethodize'],
        code: [
          `const demethodize = require('just-demethodize');

const trimFn = demethodize(''.trim);
['hello ', ' goodbye', 'hello again'].map(trimFn)`,
        ],
      },
      'just-partial-it': {
        size: sizes['just-partial-it'],
        code: [
          `const partial = require('just-partial-it')\n
const cubedRoot = partial(Math.pow, undefined, 1/3);
cubedRoot(35).toFixed(1);`,
        ],
      },
      'just-flip': {
        size: sizes['just-flip'],
        code: [
          `const flip = require('just-flip');

flip(console.log)(1, 2, 3);`,
        ],
      },
      'just-debounce-it': {
        size: sizes['just-debounce-it'],
        code: [
          `const debounce = require('just-debounce-it');

const fn1 = debounce(() => console.log('Hello'), 1000, true);
fn1();
fn1();
fn1();
fn1();`,
        ],
      },
      'just-throttle': {
        size: sizes['just-throttle'],
        code: [
          `const throttle = require('just-throttle');

const fn1 = throttle(() => console.log('hello'), 2000, true);
setInterval(fn1, 400);`,
        ],
      },
      'just-once': {
        size: sizes['just-once'],
        code: [
          `const once = require('just-once');

let i = 0;
const addOnce = once(() => i++);
addOnce();
addOnce();
i;`,
        ],
      },
    },
  },
};
