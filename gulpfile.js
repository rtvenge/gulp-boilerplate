/* globals require */
(function () {
  'use strict';

  var
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    critical = require('critical'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    // svgmin = require('gulp-svgmin'),
    sourcemaps = require('gulp-sourcemaps'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify');

  var settings = {
    browserSupport: ['> 5%', 'IE 9'],
    watch: {
      images: ['src/img/**/*.jpg'],
      scss: 'src/scss/style.scss',
      js: ['src/js/vendor/**/*.js', 'src/js/deps/**/*.js', 'src/js/src/global.js']
    },
    dist: {
      images: 'dist/img',
      css: 'dist/css', // aka root
      jsFile: 'main.min.js',
      js: 'dist/js',
      srcMaps: './maps'
    }
  };

  /*
   * styles
   */

  gulp.task('styles', ['critical'], function () {
    return gulp.src(settings.watch.scss)
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(sourcemaps.init())
      .pipe(sass({ style: 'expanded' }))
      .pipe(autoprefixer({ browsers: settings.browserSupport }))
      .pipe(minifycss())
      .pipe(sourcemaps.write(settings.dist.srcMaps))
      .pipe(gulp.dest(settings.dist.css))
      .pipe(notify({ message: 'Styles task complete' }));
    });

  /*
   * scripts
   */

  gulp.task('scripts', function() {
    return gulp.src(settings.watch.js)
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(sourcemaps.init())
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat(settings.dist.jsFile))
        .pipe(uglify())
      .pipe(sourcemaps.write(settings.dist.srcMaps)) //Not working
      .pipe(gulp.dest(settings.dist.js))
      .pipe(notify({ message: 'Scripts task complete' }));
  });

  /*
   * images
   */

  gulp.task('images', function() {
    return gulp.src(settings.watch.images)
      .pipe(cache(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true, svgoPlugins: [{removeViewBox: false}] })))
      // .pipe(svgmin())
      .pipe(gulp.dest('dist/img')); // Bug in path: https://github.com/imagemin/imagemin/issues/60
      // .pipe(notify({ message: 'Images task complete' }));
  });

  /*
   * critical
   */

  gulp.task('critical', function () {
    critical.generate({
      src: 'index.html', // If using Wordpress, use local url: http://hoverboardstudios.dev/
      dest: 'inc/critical.css',
      minify: true,
      height: 768,
      width: 1024
    });
  });

  // Watch
  gulp.task('watch', ['styles', 'scripts', 'images'], function() {

    // Watch .scss files
    gulp.watch('src/scss/**/*.scss', ['styles', 'critical']);

    // Watch .js files
    gulp.watch(settings.concat, ['scripts']);

    // Watch image files
    gulp.watch('src/img/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in , reload on change
    gulp.watch(['/style.css']).on('change', livereload.changed);

  });

}());
