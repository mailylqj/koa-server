const gulp = require('gulp');
const webpack = require('webpack');
const watch = require('gulp-watch');
const babel = require('gulp-babel');

const { task, series, parallel } = gulp;

const esDir = '../es';
const libDir = '../lib';

function compile(modules) {
    return gulp.src(['../src/component/**/*.js'])
        .pipe(babel({
            presets: [
                ["@babel/preset-env", {
                    modules: false,
                    loose: true
                }]
            ]
        }))
        .pipe(gulp.dest(modules === false ? esDir : libDir));
}

task('compile-with-es', done => {
    compile(false).on('finish', done);
})

task('compile',series(parallel('compile-with-es')));

// watch(['../src/component/**/*.js'], compile);