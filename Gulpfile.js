var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');
var sourcemap = require('gulp-sourcemaps');

var src = 'src/';
var dist = 'dist/';

gulp.task('uglify', function () {
    return gulp.src(src + 'bg-single-selector.js')
            .pipe(uglify())
            .pipe(gulp.dest(dist));
});
gulp.task('uglify-sourcemap', function () {
    return gulp.src(src + 'bg-single-selector.js')
            .pipe(sourcemap.init())
            .pipe(uglify())
            .pipe(sourcemap.write())
            .pipe(gulp.dest(dist));
});
gulp.task('style', function () {
    return sass(src + 'sass/single-selector.scss', {style: 'compressed', sourcemap: false})
            .pipe(gulp.dest(dist + 'css'));
});

gulp.task('watch', function () {
    gulp.watch(src + 'sass/single-selector.scss', ['style']);
    gulp.watch(src + 'bg-single-selector.js', ['uglify-sourcemap']);
});

gulp.task('dev', ['watch']);
gulp.task('build', ['style', 'uglify']);
