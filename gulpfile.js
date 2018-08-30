var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

var DIST = './static/dist'
gulp.task('less', function () {
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest(`${DIST}/css`));
});

gulp.task('watch', function () {
	gulp.watch('src/less/**/*.less', ['less']);
	gulp.watch(['bower_components/*', 'src/**/*'], ['build']);
});

gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: "http://localhost:2018",
		port: 3001,
		ui: {
			port: 3002
		}
	});
	//监听任何文件变化，实时刷新页面
	gulp.watch(["./public/css/**/*.*", 'views/**/*.*', 'public/js/*.*']).on('change', browserSync.reload);
});

gulp.task('build', async function () {
	/* const bundle = await rollup.rollup({
	  input: 'bower_components/validate/validate.js',
	  plugins: [
		babel()
	  ]
	});
  
	await bundle.write({
	  file: `${DIST}/lib/validate.js`,
	  format: 'amd',
	  name: 'library'
	});
 */
	/* gulp.src('bower_components/validate/validate.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest(`${DIST}/lib`)); */

	gulp.src([
		'bower_components/requirejs/require.js',
		'bower_components/jquery/jquery.min.js',
		'bower_components/lodash/lodash.min.js',
		'bower_components/knockout/dist/*.js',
		'bower_components/jquery-toast-plugin/dist/*.*',
		'bower_components/babel-polyfill/browser-polyfill.js',
		'bower_components/require-css/css.min.js'
	])
		.pipe(gulp.dest(`${DIST}/lib`));

	gulp.src([
		'src/lib/**/*.*',
	], { base: 'src' })
		.pipe(gulp.dest(`${DIST}`));

	gulp.src([
		'bower_components/bootstrap/dist/**/*.*'
	], { base: 'bower_components/bootstrap/dist' })
		.pipe(gulp.dest(`${DIST}/plugins/bootstrap`));

	gulp.src([
		'src/plugins/**/*.*',
	], { base: 'src' })
		.pipe(gulp.dest(`${DIST}`));

	gulp.src([
		'src/js/**/*.js',
	], { base: 'src' })
		.pipe(gulp.dest(`${DIST}`));
});

gulp.task('default', ['watch', 'build', 'less'], function () {
});
