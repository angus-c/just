# tap-spec [![NPM version](https://img.shields.io/npm/v/tap-spec.svg?style=flat-square)](https://www.npmjs.com/package/tap-spec) [![NPM download count](https://img.shields.io/npm/dm/tap-spec.svg?style=flat-square)](https://www.npmjs.com/package/tap-spec)

Formatted TAP output like Mocha's spec reporter

![iterm - 2 bash - may 29 2015 at 10 17 am screen shot](https://cloud.githubusercontent.com/assets/974723/7888261/03366236-05ec-11e5-9f94-d9c2707526b7.png)

## Install

```
npm install tap-spec --save-dev
```

## Usage

### Streaming

```js
var test = require('tape');
var tapSpec = require('tap-spec');

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);
```

### CLI

**package.json**

```json
{
  "name": "module-name",
  "scripts": {
    "test": "node ./test/tap-test.js | tap-spec"
  }
}
```

Then run with `npm test`

**Terminal**

```
tape test/index.js | node_modules/.bin/tap-spec
```

**Testling**

```
npm install testling -g
testling test/index.js | node_modules/.bin/tap-spec
```
