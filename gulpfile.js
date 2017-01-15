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
var concat = require("gulp-concat");
var plugins = require('gulp-load-plugins')();
var pipes = {};

var paths = {
    scripts: ['./app/assets/js/components/*.js', './app/assets/js/explore/*.js'],
    styles: ['./app/assets/css/*.css', './app/assets/*.scss'],
    index: './app/index.html',
    partials: ['./app/views/*.html', '!index.html'],
    dist: './public'
};

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./app/assets/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./app/assets/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./app/assets/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./app/assets/js/**/*.js', ['lint', 'scripts']);
    gulp.watch('./app/assets/css/*.scss', ['sass']);
});

// Babel Task
gulp.task("babel", function () {
    return gulp.src("./app/assets/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("public"));
});

gulp.task('karma', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'babel', 'karma']);
