# bin-check [![Build Status](https://travis-ci.org/kevva/bin-check.png?branch=master)](https://travis-ci.org/kevva/bin-check)

Check if a binary is working in Node.js by checking its exit code.

## Getting started

Install with npm: `npm install bin-check`

## Example

```js
var binCheck = require('bin-check');

binCheck('/bin/sh', '--help', function (err, works) {
    console.log(works);
    // => true
});
```

## API

### binCheck(name, cmd, cb)

Check if a binary is working by checking its exit code. Use `cmd` to test against 
custom commands. Defaults to `--help`.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) (c) [Kevin Mårtensson](https://github.com/kevva)
