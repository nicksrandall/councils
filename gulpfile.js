var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: [
    'www/js/app.js',
    'www/js/utilities.js',
    'www/js/module.js',
    'www/js/routes.js',
    'www/js/controllers.js',
    'www/js/services.js',
    'www/js/filters.js',
    'www/js/directives.js',
    'www/js/constants.js',
  ]
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    //.pipe(sourcemaps.init(({loadMaps: true}))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    //.pipe(sourcemaps.write())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('build', ['sass'], function(done) {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    // .pipe(gulp.dest('./www/js/'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/js'));
});

gulp.task('build-no-min', function() {
  return gulp.src(paths.js)
    .pipe(uglify('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('www/js'))
});

gulp.task('build:watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['build']);
});


