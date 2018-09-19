import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
export default {
  input: 'src/plugins/prevent-robot/jigsaw.js',
  output: {
    file: 'test/jigsaw.js',
    format: 'amd'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      plugins: [],
    })
  ]
};