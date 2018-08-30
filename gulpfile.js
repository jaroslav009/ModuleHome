'use strict';

var gulp = 			 require('gulp'),
	sass = 			 require('gulp-sass'),
	browserSync =	 require('browser-sync'),
	concat =		 require('gulp-concat'),
	uglify = 		 require('gulp-uglifyjs'),
	cssnano =		 require('gulp-cssnano'),
	rename = 		 require('gulp-rename'),
	del 		=  	 require('del');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/Css/'))
	.pipe(sass().on('error', sass.logError))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));

});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/Css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/Css'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/.*js', browserSync.reload);

});

gulp.task('default', ['watch'], function() {
  // place code for your default task here
});