# pretty-ms [![Build Status](https://travis-ci.org/sindresorhus/pretty-ms.svg?branch=master)](https://travis-ci.org/sindresorhus/pretty-ms)

> Convert milliseconds to a human readable string: `1337000000` → `15d 11h 23m 20s`


## Usage

```
$ npm install --save pretty-ms
```

```js
var prettyMs = require('pretty-ms');

prettyMs(1337000000);
//=> '15d 11h 23m 20s'

prettyMs(1337);
//=> '1.3s'

prettyMs(133);
//=> '133ms'

// compact option
prettyMs(1337, {compact: true});
//=> '~1s'

// verbose option
prettyMs(1335669000, {verbose: true});
//=> '15 days 11 hours 1 minute 9 seconds'

// can be useful for time durations
prettyMs(new Date(2014, 0, 1, 10, 40) - new Date(2014, 0, 1, 10, 5))
//=> '35m'
```


## API

### prettyMs(milliseconds, [options])

#### milliseconds

*Required*  
Type: `number`

Milliseconds to humanize.

#### options

##### secDecimalDigits

Type: `number`  
Default: `1`

Number of digits to appear after the seconds decimal point.

##### msDecimalDigits

Type: `number`  
Default: `0`

Number of digits to appear after the milliseconds decimal point.

Useful in combination with [`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime).

##### compact

Type: `boolean`  
Default: `false`

Only show the first unit: `1h 10m` → `~1h`.

##### verbose

Type: `boolean`  
Default: `false`

Use full-length units: `5h 1m 45s` → `5 hours 1 minute 45 seconds`


## Related

- [pretty-ms-cli](https://github.com/sindresorhus/pretty-ms-cli) - CLI for this module


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
