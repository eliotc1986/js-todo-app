'use strict';

var $        = require('gulp-load-plugins')();
var gulp     = require('gulp');
var browser  = require('browser-sync').create();
var sequence = require('run-sequence');
var nib      = require('nib');
var rimraf   = require('rimraf');
var PORT     = 8000;

// ------------------------------------
// WORKER FUNCTIONS
// ====================================

gulp.task('clean', function(done) {
  rimraf('public', done);
});

gulp.task('server', function() {
  browser.init({
    server: '',
    port: PORT
  });
});

// Compile and Compress JS files
gulp.task('javascript', function() {
  gulp.src([
      'src/js/app.js'
    ])
      .pipe($.concat('app.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('./public/js'))
      .on('finish', browser.reload);
});

// Compile and compress stylus files
gulp.task('stylus', function() {
  gulp.src('src/styles/*.styl')
    .pipe($.concat('app.styl'))
    .pipe($.stylus({
      compress: true,
      'include css': true,
      use: nib()
    }))
    .pipe($.rename('app.min.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browser.reload({ stream: true }));
});

// Clean and compile tasks
gulp.task('compile', function(done) {
    sequence('clean', ['javascript', 'stylus'], done);
});

// Default + watch tasks
gulp.task('default', ['compile', 'server'], function() {
  // Watch JS files
  gulp.watch(['src/js/*.js', 'src/js/**/*.js'], ['javascript']);
  
  // Watch CSS files
  gulp.watch('src/styles/*.styl', ['stylus']);

  // Watch HTML files
  gulp.watch("*.html").on("change", browser.reload);
});
