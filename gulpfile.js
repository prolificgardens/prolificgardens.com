var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

var BUILD_DIRECTORY = 'dist/';

gulp.task('default', function build(cb) {
  runSequence('clean', ['styles', 'scripts'], 'html', 'watch', cb);
});

gulp.task('build', function build(cb) {
  runSequence('clean', ['styles', 'scripts'], 'html', cb);
});

gulp.task('clean', function () {
  return gulp.src(BUILD_DIRECTORY, {read: false})
      .pipe(clean());
});

gulp.task('styles', function () {
  gulp.src('src/css/*.css')
      .pipe(minifyCSS())
      .pipe(concat('pg.css'))
      .pipe(gulp.dest(BUILD_DIRECTORY))
});

gulp.task('scripts', function () {
  gulp.src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(concat('pg.js'))
      .pipe(gulp.dest(BUILD_DIRECTORY))
});

gulp.task('html', function () {
  gulp.src('src/index.html')
      .pipe(gulp.dest(BUILD_DIRECTORY))
});

