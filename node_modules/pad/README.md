
# Node.js pad

[![Build Status](https://secure.travis-ci.org/adaltas/node-pad.png)](http://travis-ci.org/adaltas/node-pad)

Node Pad is a simple and elegant function to pad strings in both left and right directions.

## Usage

```javascript
pad('pad', 5)      // "pad  "
pad(5, 'pad')      // "  pad"
pad('pad', 5, '+') // "pad++"
pad(5, 'pad', '+') // "++pad"
```

## Options

Options are provided as a third argument and are all optional. A string argument
it is interpreted as the "char" option. Accepted options include:

*   `char` (string)   
    The character used to fill the gap.   
*   `colors` (boolean)   
    Ajust to hidden terminal color characters, you may also use
    `require 'pad/lib/colors'` to avoid passing this option.   
*   `strip` (boolean)   
    Remove characters from text if length smaller than text length, default to
    "false".   

## Left padding: `pad(length, text, [options])`

Left padding occurs when the first argument is a number and the second
argument is a string.

```javascript
var pad = require('pad');
pad(5, 'pad', '-').should.eql('-pad');
```

## Right padding: `pad(text, length, [options])`

Right padding occurs when the first argument is a string and the second
argument is a number.

```javascript
var pad = require('pad');
pad('pad', 6).should.eql('pad   ');
```

## Installing

Starting with version 1.1.0, Node pad rely on Node.js 4.0.0 or more recent. Stick to version 1.0.x if using an older version of Node.js.

Via [npm](http://github.com/isaacs/npm):

```bash
npm install pad
```

Via git (or downloaded tarball), copy or link the project from a discoverable Node directory:

```bash
git clone http://github.com/wdavidw/node-pad.git
```

## Testing

Clone the repo, install the development dependencies and run the suite:

```bash
git clone http://github.com/wdavidw/node-pad.git .
npm install
make test
```
