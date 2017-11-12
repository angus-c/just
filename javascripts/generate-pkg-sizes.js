const fs = require('fs');
const exec = require('child_process').exec;
const map = require('just-map-object');
const data = require('./data');

const pkgNames = [];
const sizes = {};

map(data, (category, value) => {
  return map(value.utils, pkgName => {
    return pkgNames.push(pkgName);
  });
});

const pkgsIt = pkgNames[Symbol.iterator]();

console.log('fetching packages sizes...');
const getSizes = function() {
  return new Promise((resolve, reject) => {
    iterate(pkgsIt.next().value);
    function iterate(pkgName) {
      console.log(pkgName);
      exec(`package-size ${pkgName}`, (...args) => {
        const min = args[args.length - 2]
          .trim()
          .match(/([0-9]+)\s[k]?B[^B]+$/)[1];
        sizes[pkgName] = min;
        const nextValue = pkgsIt.next().value;
        nextValue ? iterate(nextValue) : resolve(sizes);
      });
    }
  });
};

getSizes().then(data => {
  fs.writeFile(
    'javascripts/sizes.js',
    `module.exports = ${JSON.stringify(sizes, null, 2)}`,
    err => {
      if (err) {
        throw err;
      }
      console.log('package sizes written to javascripts/sizes.js');
    }
  );
});
