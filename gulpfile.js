'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    wrap = require('gulp-wrap'),
    ngannotate = require('gulp-ng-annotate'),
    less = require('gulp-less'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    path = require('path'),
    config = require('./gulpfile.config');

// tasks
gulp.task('default', ['build']);
gulp.task('serve', function(done){
    runSequence('build', 'watch', 'run', done);
});

gulp.task('build', function(done){
    runSequence('clean', ['jsApp', 'jsVendor', 'jsCheeky', 'styles', 'templates', 'images', 'content'], done);
});

// components
gulp.task('clean', clean);
gulp.task('content', content);
gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('jsApp', jsApp);
gulp.task('jsVendor', jsVendor);
gulp.task('jsCheeky', jsCheeky);
gulp.task('run', run);
gulp.task('styles', ['fonts'], styles);
gulp.task('templates', templates);
gulp.task('watch', watch);

function clean(){
    return del(['public/*']);
}

function content() {
    return gulp.src(config.src.content)
        .pipe(gulp.dest(config.build.output.content));
}

function fonts() {
    return gulp.src(config.src.fonts)
        .pipe(gulp.dest(config.build.output.fonts));
}

function images() {
    return gulp.src(config.src.img, { base: config.src.imgBasePath })
    .pipe(gulp.dest(config.build.output.content));
}

function jsApp() {
    return gulp.src(config.src.js.cheekyjs)
        .pipe(sourcemaps.init())
        .pipe(ngannotate())
        .pipe(wrap('(function(angular){\n<%= contents %>\n})(window.angular);'))
        .pipe(concat('cheeky.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.output.js));
}

function jsCheeky() {
    return gulp.src(config.src.js.app)
        .pipe(sourcemaps.init())
        .pipe(ngannotate())
        .pipe(wrap('(function(angular){\n<%= contents %>\n})(window.angular);'))
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.output.js));
}

function jsVendor() {
    return gulp.src(config.src.js.vendor)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.build.output.js));
}

function run(){
    nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: ['public/*'],
        env: {NODE_ENV: 'development', DEBUG: true}
    });
}

function styles() {
    return gulp.src(config.src.less)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [
                // Allows us to @import anything in the bower folder in less files using relative paths
                path.join(__dirname, 'bower_components')
            ]
        }))
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.output.css));
}

function templates() {
    return gulp.src(config.src.templates)
        .pipe(templateCache({ module: config.src.templateModuleName }))
        .pipe(gulp.dest(config.build.output.js));
}

function watch(){
    gulp.watch('src/**/*.less', ['styles']);
    gulp.watch(config.src.js.app, ['jsApp']);
    gulp.watch(config.src.js.cheekyjs, ['cheekyjs']);
    gulp.watch('src/**/*.html', ['templates', 'content']);
}