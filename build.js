const { build } = require('esbuild')
const { dependencies } = require('./package.json')

const entryFile = 'src/index.ts'
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: Object.keys(dependencies || {}),
  logLevel: 'info',
  minify: true,
  sourcemap: false,
}

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
  target: ['ES6'],
})

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
  target: ['ES6'],
})