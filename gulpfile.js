var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task('default', ['css']);

gulp.task('default', function () {
  return gulp.src('dist/', {read: false})
      .pipe(clean());
});

gulp.task('css', function () {
  gulp.src('src/css/*.css')
      .pipe(minifyCSS())
      .pipe(concat('pg.css'))
      .pipe(gulp.dest('dist/'))
});

