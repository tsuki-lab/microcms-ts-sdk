// @ts-check
const { build } = require('esbuild');
const packageJson = require('./package.json');

// @ts-ignore Checked Object keys
const dependencies = hasOwnProperty.call(packageJson, 'dependencies')
  ? packageJson.dependencies
  : {};
const entryFile = 'src/index.ts';

/** @type {import('esbuild').BuildOptions} */
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: Object.keys(dependencies),
  logLevel: 'info',
  minify: true,
  sourcemap: false
};

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
  target: ['ES6']
});

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
  target: ['ES6']
});

// legacy build
build({
  ...shared,
  entryPoints: ['src/legacy/index.ts'],
  format: 'esm',
  outfile: './dist/legacy/index.esm.js',
  target: ['ES6']
});

build({
  ...shared,
  entryPoints: ['src/legacy/index.ts'],
  format: 'cjs',
  outfile: './dist/legacy/index.cjs.js',
  target: ['ES6']
});
