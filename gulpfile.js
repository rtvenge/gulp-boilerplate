/* globals require */
(function () {
  'use strict';

  var gulp = require('gulp');
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');
  var cssnext = require('postcss-cssnext');
  var shortcss = require('postcss-short');

  gulp.task('css', function() {
    var plugins = [
      shortcss,
      cssnext,
      autoprefixer({browsers: ['> 1%'], cascade: false})
    ];
    return gulp.src('initial/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('final'));
  });

}());
