(function() {
  "use strict";


// Include gulp
  let gulp = require('gulp');

// Include Our Plugins
  let jshint = require('gulp-jshint'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      sourcemaps = require("gulp-sourcemaps"),
      babel = require("gulp-babel"),
      nodemon = require('gulp-nodemon'),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      minify = require('gulp-minify'),
      pipes = {};

  let paths = {
      minScripts: ['./app/dist/libs/jquery.js',
                   './app/dist/libs/moment.js',
                   './app/dist/libs/angular.js',
                   './app/dist/libs/angular-ui-router.js',
                   './app/dist/libs/lodash.js',
                   './app/dist/libs/angular-material.js',
                   './app/dist/libs/angular-animate.js',
                   './app/dist/libs/angular-aria.js',
          './app/dist/libs/angular-sanitize.js',
                   './app/dist/libs/material.js',
                   './app/dist/libs/aos.js',
                   './app/dist/libs/bootstrap.js',
                   './app/dist/libs/angular-vimeo.js',
                   './app/dist/libs/angular-datepicker.js',
                    './app/dist/libs/ui-bootstrap-tpls.js',

                   './app/assets/components/app.module.js',
                   './app/assets/components/app.routes.js',
                   './app/assets/components/apod.controller.js',
                  './app/assets/components/apod.service.js',
                  './app/assets/components/home.controller.js,',
                  './app/assets/components/hubble.controller.js',
                  './app/assets/components/images.controller.js',
                  './app/assets/components/orbital.controller.js',
                  './app/assets/components/orbital.service.js',
                  './app/assets/components/rover.controller.js',
                  './app/assets/components/rover.service.js',
                   './app/assets/components/maps/*.js',
      ],
      scripts: ['./app/assets/components/app.module.js',
                './app/assets/components/app.routes.js',
                './app/assets/components/*.js',
                './app/assets/components/maps/*.js',
      ],
      styles: ['./app/assets/stylesheets/custom.scss',
      ],
      index: './app/index.html',
      partials: ['./app/views/*.html', '!/app/index.html'],
      libraries: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-ui-router/release/angular-ui-router.js',
        './node_modules/lodash/lodash.js',
        './node_modules/moment/moment.js',
        './node_modules/angular-material/angular-material.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-aria/angular-aria.js',
        './node_modules/material-design-lite/material.js',
        './node_modules/aos/dist/aos.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        './node_modules/angular-sanitize/angular-sanitize.js'
      ]
  };

// Lint Task
  gulp.task('lint', function () {
    return gulp.src(paths.scripts)
      .pipe(plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
        }
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

// Compile Our Sass
  gulp.task('sass', function () {
    return gulp.src(paths.styles)
      .pipe(plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString(),
          })(err);
        }
      }))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app/assets/stylesheets'));
  });

// Watch Files For Changes
  gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['lint', 'scripts']);
    gulp.watch(paths.styles, ['sass']);
  });

// Babel Task
  gulp.task("babel", function () {
    return gulp.src(paths.scripts)
      .pipe(plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
        }
      }))
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat("all.js"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("build"));
  });

// Concatenate & Uglify
  gulp.task('concat', function () {
    return gulp.src(paths.minScripts)
      .pipe(plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
        }
      }))
      .pipe(concat('all.js'))
      .pipe(gulp.dest('build/js'))
      // .pipe(rename('all.min.js'))
      .pipe(babel({
          presets: ['es2015']
      }))
      // .pipe(uglify())
      .pipe(gulp.dest('app/assets/components'));
  });

// Minify
  gulp.task('compress', function () {
    gulp.src(paths.libraries)
      .pipe(plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
        }
      }))
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(minify({
        ext: {
          min: '.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
      }))
      .pipe(gulp.dest('app/dist/libs'))
  });

// Nodemon Task
  gulp.task('start', function () {
    nodemon({
      script: 'server.js',
      ext: 'js html'
    });
  });

// Default Task
  gulp.task('default', ['start', 'lint', 'sass', 'concat', 'watch', 'babel']);

})();