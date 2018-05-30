import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-uglify';

export default [
  {
    input: './src/index.js',
    output: {
      file: './dist/index.js',
      format: 'es'
    }
  },
  {
    input: './src/index.js',
    output: {
      file: './dist/index.min.js',
      format: 'es'
    },
    plugins: [
      resolve(),
      minify()
    ]
  }
]