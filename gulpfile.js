var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync');
const rollup = require('rollup');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const jeditor = require("gulp-json-editor");
const replace = require('gulp-replace');
const uuidv1 = require('uuid/v1');
var rename = require("gulp-rename");
var clean   = require('gulp-clean');
var runSequence = require('gulp-sequence'); 


var DIST = './static/dist'

gulp.task('clean', function() {
	return gulp.src(`${DIST}/css`, {read: false})
	.pipe(clean());
});
gulp.task('less', function () {
	return gulp.src('src/less/*.less')
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
gulp.task('rbower', function(){
	return gulp.src('./src/require.config.json')
	.pipe(jeditor(function(json){
		let path = json.paths
		for(let prop in path){
			if(path[prop].indexOf('bower_components')>-1){
				let path_split = path[prop].split('/')
				gulp.src(`${path[prop]}.js`)
				.pipe(gulp.dest(`${DIST}/plugins/`))
				path[prop] = `/dist/plugins/${path_split[path_split.length-1]}`
			}
		}
		let shim = json.shim
		for(let prop in shim){
			for(let i in shim[prop]){
				if(shim[prop][i].indexOf('bower_components')>-1 && shim[prop][i].indexOf('css!')>-1){
					let _uuid = uuidv1()
					gulp.src(shim[prop][i].replace(/css!/g,''))
					.pipe(rename(function (path) {
						// path.basename += `_${_uuid}`
					}))
					.pipe(gulp.dest(`${DIST}/css/`))
					let fname = shim[prop][i].split('/')
					fname =  fname[fname.length-1]
					// shim[prop][i] = '/dist/css/' + fname.replace(/\.css/, `_${_uuid}.css`)
					shim[prop][i] = '/dist/css/' + fname
				}
			}
		}		
		gulp.src('./src/main.js')
		.pipe(replace(/__REQUIRE_CONFIG__/, JSON.stringify(json)))
		.pipe(gulp.dest(`${DIST}/js`))
	}))
})
gulp.task('build-other', function () {
	gulp.src([
		'bower_components/requirejs/require.js',
		'bower_components/require-css/css.min.js'
	])
	.pipe(gulp.dest(`${DIST}/js`));

	// gulp.src([
	// 	'src/lib/**/*.*',
	// ], { base: 'src' })
	// 	.pipe(gulp.dest(`${DIST}`));

	// Bootstrap
	// gulp.src([
	// 	'bower_components/bootstrap/dist/**/*.*'
	// ], { base: 'bower_components/bootstrap/dist' })
	// 	.pipe(gulp.dest(`${DIST}/plugins/bootstrap`));
	
	// // swiper
	// gulp.src([
	// 	'bower_components/swiper/dist/**/*'
	// ],{ base: 'bower_components/swiper/dist' })
	// .pipe(gulp.dest(`${DIST}/plugins/swiper`));
	
	// // layer
	// gulp.src([
	// 		'bower_components/layer/dist/**/*.*'
	// 	], { base: 'bower_components/layer/dist' })
	// 		.pipe(gulp.dest(`${DIST}/plugins/layer`));

	// font
	gulp.src([
		'src/less/fonts/**/*.*'
	], { base: 'src/less' })
		.pipe(gulp.dest(`${DIST}/css`));
	
	// gulp.src([
	// 	'src/plugins/**/*.*',
	// ], { base: 'src' })
	// 	.pipe(gulp.dest(`${DIST}`));

	// gulp.src([
	// 	'src//**/*.js',
	// ], { base: 'src' })
	// // .pipe(sourcemaps.init())
	// // .pipe(uglify())
	// // .pipe(sourcemaps.write())
	// .pipe(gulp.dest(`${DIST}`));
})
gulp.task('build', runSequence('clean', ['less', 'rbower'],'build-other'));

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
