/*global require, console*/
(function () {
    'use strict';

    var gulp = require('gulp'),
        less = require('gulp-less'),
        notify = require('gulp-notify'),
        concatCss = require('gulp-concat-css'),
        prefixer = require('gulp-autoprefixer'),
        minifyCss = require('gulp-minify-css'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify');


    /* less */
    gulp.task('less', function () {
        gulp.src('./source/less/main.less')
            .pipe(less())
            .on('error', function () {
                console.log('Ошибка в задаче less!');
            })
            .pipe(prefixer('last 3 versions', 'ie >= 8'))
            .pipe(gulp.dest('./source/css'))
            .pipe(notify('less  Ok!'));
    });


    /* css */
    gulp.task('css', function () {
        gulp.src(['./bower_components/normalize-css/normalize.css',
                 './source/css/main.css'])
            .pipe(concatCss('all.css'))
            .on('error', function () {
                console.log('Ошибка в задаче css!');
            })
            .pipe(prefixer('last 2 versions'))
            .pipe(minifyCss())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./app/css'))
            .pipe(notify('css  Ok!'));
    });


    /* js */
    gulp.task('js', function () {
        gulp.src(['./bower_components/bootstrap/dist/js/bootstrap.min.js',
                './bower_components/jquery-placeholder/jquery.placeholder.js',
                './source/js/main.js'])
            .pipe(concat('all.js'))
            .pipe(uglify())
            .on('error', function () {
                console.log('Ошибка в задаче js!');
            })
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./app/js'))
            .pipe(notify('js  Ok!'));
    });


    /* watch */
    gulp.task('watch', function () {
        gulp.watch('./source/less/main.less', ['less']);
        gulp.watch('./source/css/*.css', ['css']);
        gulp.watch('./source/js/*.js', ['js']);
    });


    gulp.task('default', ['watch']);

})();