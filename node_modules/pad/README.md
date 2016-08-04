[![Build Status](https://secure.travis-ci.org/wdavidw/node-pad.png)](http://travis-ci.org/wdavidw/node-pad)

<pre style="font-family:courier">
 _   _           _        _____          _ 
| \ | |         | |      |  __ \        | |
|  \| | ___   __| | ___  | |__) |_ _  __| |
| . ` |/ _ \ / _` |/ _ \ |  ___/ _` |/ _` |
| |\  | (_) | (_| |  __/ | |  | (_| | (_| |
|_| \_|\___/ \__,_|\___| |_|   \__,_|\__,_| New BSD License
</pre>

Node Pad is a simple function to pad strings in the left and right directions.

## `pad(length, text, [options])`: Left padding

Node Pad does left padding when the first argument is a number and the second
argument is a string.

```javascript
var pad = require('pad');
pad(5, 'pad', '--').should.eql('--pad');
```

## `pad(text, length, [options])`: Right padding

Node Pad does right padding when the first argument is a string and the second
argument is a number.

```javascript
var pad = require('pad');
pad('pad', 6).should.eql('pad   ');
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

## Installing

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
