(function() {
  "use strict";


// Include gulp
  let gulp = require('gulp');

// Include Our Plugins
  let jshint = require('gulp-jshint');
  let sass = require('gulp-sass');
  let concat = require('gulp-concat');
  let uglify = require('gulp-uglify');
  let rename = require('gulp-rename');
  let sourcemaps = require("gulp-sourcemaps");
  let babel = require("gulp-babel");
  let plugins = require('gulp-load-plugins')();
  let nodemon = require('gulp-nodemon');
  let env = require('gulp-env');
  let plumber = require('gulp-plumber');
  let notify = require('gulp-notify');
  let minify = require('gulp-minify');
  let pipes = {};

  let paths = {
    scripts: ['./src/assets/js/components/app.module.js',
      './src/assets/js/components/app.routes.js',
      './src/assets/js/components/app.controller.js',
      '!karma.conf.js',
      '!server.js',
      '!gulpfile.js'
    ],
    styles: ['./src/assets/stylesheets/custom.scss',
             './node_modules/aos/dist/aos.css',
             './node_modules/bootstrap/dist/css/bootstrap.css'
    ],
    index: './src/index.html',
    partials: ['./src/views/*.html', '!index.html'],
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
            message: err.toString()
          })(err);
        }
      }))
      .pipe(sass())
      .pipe(gulp.dest('src/assets/stylesheets'));
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
      .pipe(gulp.dest('public'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
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
      .pipe(gulp.dest('dist/libs'))
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