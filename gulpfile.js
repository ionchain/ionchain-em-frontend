var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync');
const rollup = require('rollup');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

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
	gulp.src([
		'bower_components/requirejs/require.js',
		'bower_components/jquery/jquery.min.js',
		'bower_components/lodash/lodash.min.js',
		'bower_components/knockout/dist/*.js',
		'bower_components/jquery-toast-plugin/dist/*.*',
		'bower_components/babel-polyfill/browser-polyfill.js',
		'bower_components/require-css/css.min.js',
		'bower_components/moment/moment.js',
		'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
		'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.hacks.js',
		'bower_components/REM-unit-polyfill/js/rem.min.js'
	])
	.pipe(gulp.dest(`${DIST}/lib`));

	gulp.src([
		'src/lib/**/*.*',
	], { base: 'src' })
		.pipe(gulp.dest(`${DIST}`));

	// Bootstrap
	gulp.src([
		'bower_components/bootstrap/dist/**/*.*'
	], { base: 'bower_components/bootstrap/dist' })
		.pipe(gulp.dest(`${DIST}/plugins/bootstrap`));
	
	// swiper
	gulp.src([
		'bower_components/swiper/dist/**/*'
	],{ base: 'bower_components/swiper/dist' })
	.pipe(gulp.dest(`${DIST}/plugins/swiper`));
	
	// layer
	gulp.src([
			'bower_components/layer/dist/**/*.*'
		], { base: 'bower_components/layer/dist' })
			.pipe(gulp.dest(`${DIST}/plugins/layer`));

	// font
	gulp.src([
		'src/fonts/**/*.*'
	], { base: 'src' })
		.pipe(gulp.dest(`${DIST}/css`));
	
	gulp.src([
		'src/plugins/**/*.*',
	], { base: 'src' })
		.pipe(gulp.dest(`${DIST}`));

	gulp.src([
		'src/customerjs/**/*.js',
	], { base: 'src' })
	// .pipe(sourcemaps.init())
	// .pipe(uglify())
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest(`${DIST}`));

});
// gulp.task('es5', function () {
// 	gulp.src('src/plugins/prevent-robot/jigsaw.js')
// 	.pipe(babel({
// 		"presets": [
// 		  ["latest", {
// 			"es2015": {
// 			  "modules": false
// 			}
// 		  }]
// 		],
// 		"plugins": [
// 		//   "transform-es3-member-expression-literals",
// 		//   "@babel/plugin-transform-reserved-words",
// 		//   "transform-property-literals",
// 		//   "transform-member-expression-literals"
// 		]
// 	  }
// 	  ))
// 	.pipe(gulp.dest('test'))
// });

gulp.task('default', ['watch', 'build', 'less'], function () {
});
