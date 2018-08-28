var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync');
const rollup = require('rollup');

var DIST = './static'
gulp.task('less', function() {
	gulp.src('less/*.less')
	.pipe(less())
	.pipe(gulp.dest(`${DIST}/css`));
});

gulp.task('watch', function() {
	gulp.watch('less/**/*.less', ['less']);
});

gulp.task('browser-sync', function() {
	browserSync.init({
		proxy:"http://localhost:3000",
		port:3001,
		ui: {
			port: 3002
		}
    });
    //监听任何文件变化，实时刷新页面
    gulp.watch(["./public/css/**/*.*",'views/**/*.*','public/js/*.*']).on('change', browserSync.reload);
});

gulp.task('build', async function () {
	/* const bundle = await rollup.rollup({
	  input: './src/api.js',
	  plugins: [
	  ]
	});
  
	await bundle.write({
	  file: './static/api.js',
	  format: 'umd',
	  name: 'library',
	  sourcemap: true
	}); */
	
	gulp.src([
		'bower_components/requirejs/require.js',
		'bower_components/jquery/jquery.min.js',
		'bower_components/lodash/lodash.min.js'
	])
	.pipe(gulp.dest(`${DIST}/dist`));
});

gulp.task('default',['watch', 'build'], function() {
});
