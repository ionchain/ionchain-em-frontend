export default {
  input: 'bower_components/validate/validate.js',
  output: {
    file: 'static/dist/lib/validate.js',
    format: 'amd'
  },
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning); // this requires Rollup 0.46
  }
};