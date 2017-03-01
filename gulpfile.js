(function() {
  "use strict";


// Include gulp
  let gulp = require('gulp');
  let karma = require('karma').Server;

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
    scripts: ['./app/assets/js/components/app.module.js',
      './app/assets/js/components/app.routes.js',
      './app/assets/js/components/app.controller.js',
      '!karma.conf.js',
      '!server.js',
      '!gulpfile.js'
    ],
    styles: ['./app/assets/stylesheets/custom.scss'],
    index: './app/index.html',
    partials: ['./app/views/*.html', '!index.html'],
    dist: './public',
    libraries: ['./node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/jquery/dist/jquery.js',
      './node_modules/lodash/lodash.js',
      './node_modules/material-design-lite/material.js'
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
      .pipe(gulp.dest('public/stylesheets'));
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
  gulp.task('scripts', function () {
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

// Karma Task
  gulp.task('karma', function (done) {
    karma.start({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, function () {
      done();
    });
  });

// Nodemon Task
  gulp.task('nodemon', function () {
    env({
      file: '.env'
    });

    nodemon({
      script: 'server.js',
      ext: 'js html'
    });
  });

// Default Task
  gulp.task('default', ['nodemon', 'lint', 'sass', 'scripts', 'watch', 'babel', 'karma']);

})();