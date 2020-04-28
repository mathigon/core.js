import typescript from '@rollup/plugin-typescript';

const options = {
  input: './index.ts',
  plugins: [typescript()],
};

module.exports = [
  {...options, output: {file: 'dist/core.cjs.js', format: 'cjs'}},
  {...options, output: {file: 'dist/core.esm.js', format: 'esm'}}
];
