	
	/*
	 * @name 	Gulpfile
	 * @author 	@jakerb
	 */

	var gulp = require('gulp');
	var sass = require('gulp-sass');
	var uglify = require('gulp-uglify-es').default;
 	var rename = require('gulp-rename');

 	/*
 	 * Gulp task: Build CSS from src/scss and save it to dist/css.
 	 */
	gulp.task('build-css', function() {
		return gulp.src('./src/scss/*.scss')
		.pipe(sass({ includePaths: ['./node_modules'], outputStyle: 'compressed' }))
		.on('error', sass.logError)
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./dist/css'));
	});

	/*
 	 * Gulp task: Build JS from src/js and save it to dist/js.
 	 */
	gulp.task('build-js', function(){
	    return gulp.src(['./src/js/*.js'])
	    .pipe(uglify({mangle: false, keep_fnames: true}))
	    .pipe(rename('script.min.js'))
	    .on('error', function (err) { console.log(err.toString()); })
	    .pipe(gulp.dest('./dist/js'));
	});

	/*
 	 * Gulp task: Watch for changes to the src files.
 	 */
	gulp.task('watch', function() {
	  gulp.watch('./src/scss/*.scss', ['build-css']);
	  gulp.watch('./src/js/*.js', ['build-js']);
	});

	gulp.task('default', ['watch']);