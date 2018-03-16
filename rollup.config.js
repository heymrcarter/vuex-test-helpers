
import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

const babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc')))
const babelConfig = babelrc.env['legacy-rollup-umd']

babelConfig.exclude = 'node_modules/**'
babelConfig.runtimeHelpers = true

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/legacy-umd/index.js',
    format: 'umd'
  },
  name: 'sample-es6-library',
  sourcemap: true,
  external: ['testdouble'],
  globals: {
    testDouble: 'td'
  },
  plugins: [
    json(),
    sourcemaps(),
    babel(babelConfig),
    resolve(),
    commonjs()
  ]
}
