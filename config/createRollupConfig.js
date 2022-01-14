const cjs = require('@rollup/plugin-commonjs');
const {resolve} = require('path');

/**
 *
 * @param {string} path
 */
module.exports = function createRollupConfig(path) {
  return {
    input: resolve(path, './index.js'),
    output: {
      file: resolve(path, './index.mjs'),
      format: 'esm',
    },
    plugins: [cjs()],
  };
};
