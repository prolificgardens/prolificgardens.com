var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload')
var imagemin = require('gulp-imagemin');


var BUILD_DIRECTORY = 'dist/';

var paths = {
    styles: 'src/css/*.css',
    scripts: 'src/js/**/*.js',
    html: 'src/index.html',
    images: 'src/images/**'
};
gulp.task('default', function build(cb) {
    runSequence('clean', ['styles', 'scripts', 'images'], 'html', 'watch', cb);
});

gulp.task('build', function build(cb) {
    runSequence('clean', ['styles', 'scripts', 'images'], 'html', cb);
});

gulp.task('clean', function () {
    return gulp.src(BUILD_DIRECTORY, {read: false})
        .pipe(clean());
});

gulp.task('styles', function () {
    gulp.src(paths.styles)
        .pipe(minifyCSS())
        .pipe(concat('pg.css'))
        .pipe(gulp.dest(BUILD_DIRECTORY))
});

gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(uglify({mangle: false}))
        .pipe(concat('pg.js'))
        .pipe(gulp.dest(BUILD_DIRECTORY))
});

gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(gulp.dest(BUILD_DIRECTORY))
});

gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(BUILD_DIRECTORY + 'images'));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.html).on('change', livereload.changed);
    gulp.watch(paths.styles).on('change', livereload.changed);
    gulp.watch(paths.scripts).on('change', livereload.changed);
});

