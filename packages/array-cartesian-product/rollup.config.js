import cjs from '@rollup/plugin-commonjs';

export default {
  input: './index.js',
  output: {
    file: './index.esm.rollup.js',
    format: 'esm',
  },
  plugins: [cjs()],
}
