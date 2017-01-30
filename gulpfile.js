// Include gulp
var gulp = require('gulp');
var karma = require('karma').Server;

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var plugins = require('gulp-load-plugins')();
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var minify = require('gulp-minify');
var pipes = {};

var paths = {
    scripts: ['./app/assets/js/components/app.module.js',
              './app/assets/js/components/app.routes.js',
              './app/assets/js/components/app.controller.js',
               '!karma.conf.js',
               '!server.js',
               '!gulpfile.js'
    ],
    styles: ['./app/assets/css/custom.scss'],
    index: './app/index.html',
    partials: ['./app/views/*.html', '!index.html'],
    dist: './public'
};

// Lint Task
gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(paths.styles)
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['lint', 'scripts']);
    gulp.watch(paths.styles, ['sass']);
});

// Babel Task
gulp.task("babel", function () {
    return gulp.src(paths.scripts)
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("public"));
});

// Concatenate & Uglify
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plumber({ errorHandler: function(err) {
      notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
      })(err);
    }}))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

// Minify
gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(plumber({ errorHandler: function(err) {
      notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
      })(err);
    }}))
    .pipe(minify({
      ext:{
        src:'-debug.js',
        min:'.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});

// Karma Task
gulp.task('karma', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});

// Nodemon Task
gulp.task('nodemon', function() {
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
