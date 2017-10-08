#!/usr/bin/env node

var tapOut = require('../');

var parser = tapOut(function (err, output) {
  
  if (err) {
    throw err;
  }
  
  var out = output;
  
  try {
    out = JSON.stringify(output, null, 2);
  }
  catch (e) {}
  
  process.stdout.write(out);
});

process.stdin.pipe(parser);
