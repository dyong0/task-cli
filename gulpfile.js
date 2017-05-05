const gulp = require('gulp');
const notify = require('gulp-notify');
const mocha = require('gulp-mocha');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const insert = require('gulp-insert');
const chmod = require('gulp-chmod');
const webpack = require('gulp-webpack');
const clean = require('gulp-clean');

const tsProject = ts.createProject('tsconfig.json');

const srcGlobs = ['src/**/*.ts'];
const buildPath = 'build';
const compilePath = 'build/src';
const buildDistPath = 'build/dist';
const specBuildGlobs = ['build/src/spec/**/*.spec.js'];

const distEntry = 'build/src/index.js'
const binaryFileName = 'todo';

const tasks = {
    clean: function () {
        return gulp.src(buildPath)
            .pipe(clean());
    },

    lint: function (cb) {
        return gulp.src(srcGlobs)
            .pipe(tslint({
                formatter: 'stylish'
            }))
            .pipe(tslint.report({
                emitError: false,
                summarizeFailureOutput: true
            }));
    },

    test: function (cb) {
        return gulp.src(specBuildGlobs, { read: false })
            .pipe(mocha({ reporter: 'nyan' }));
    },

    compile: function (cb) {
        return gulp.src(srcGlobs)
            .pipe(tsProject()).js
            .pipe(gulp.dest(compilePath));
    },

    watch: function (cb) {
        return gulp.watch(srcGlobs, ['lint', 'test']);
    },

    build: function (cb) {
        gulp.src(distEntry)
            .pipe(webpack({ output: { filename: binaryFileName } }))
            .pipe(insert.prepend('#!/usr/bin/env node\n'))
            .pipe(chmod({ execute: true }))
            .pipe(gulp.dest(buildDistPath))
            .pipe(notify('Build success!'));
    }
};

gulp.task('clean', tasks.clean);
gulp.task('lint', tasks.lint);
gulp.task('compile', ['lint'], tasks.compile);
gulp.task('test', ['compile'], tasks.test);
gulp.task('watch', ['lint', 'test'], tasks.watch);
gulp.task('build', ['clean', 'test', 'compile'], tasks.build);