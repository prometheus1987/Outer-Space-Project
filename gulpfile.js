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
      plugins = require('gulp-load-plugins')(),
      nodemon = require('gulp-nodemon'),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      minify = require('gulp-minify'),
      bourbon    = require("bourbon").includePaths,
      pipes = {};

  let paths = {
    scripts: ['./app/assets/js/components/app.module.js',
        './app/assets/js/components/*.js',
        './app/assets/js/components/maps/*.js',
      '!server.js',
      '!gulpfile.js'
    ],
    styles: ['./app/assets/stylesheets/custom.scss',
    ],
    index: './app/index.html',
    partials: ['./app/views/*.html', '!index.html'],
    dist: './public',
    libraries: [
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/jquery/dist/jquery.js',
      './node_modules/lodash/lodash.js',
      './node_modules/moment/moment.js',
      './node_modules/angular-material/angular-material.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-aria/angular-aria.js',
      './node_modules/material-design-lite/material.js',
      './node_modules/aos/dist/aos.js',
      './node_modules/bootstrap/dist/js/bootstrap.js'
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
      .pipe(sass({
          includePaths: [bourbon]
      }))
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
      .pipe(gulp.dest("public"));
  });

// Concatenate & Uglify
  gulp.task('concatenate', function () {
    return gulp.src(paths.scripts)
      .pipe(plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
        }
      }))
      .pipe(concat('all.js'))
      .pipe(gulp.dest('build'))
      .pipe(rename('all.min.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('build/js'));
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
    env({
      file: '.env'
    });

    nodemon({
      script: 'server.js',
      ext: 'js html'
    });
  });

// Default Task
  gulp.task('default', ['start', 'lint', 'sass', 'concatenate', 'watch', 'babel']);

})();