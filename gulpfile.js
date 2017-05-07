const gulp = require("gulp");
const notify = require("gulp-notify");
const mocha = require("gulp-mocha");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");
const insert = require("gulp-insert");
const chmod = require("gulp-chmod");
const webpack = require("gulp-webpack");
const copy = require("gulp-copy");
const del = require("del");

const tsProject = ts.createProject("tsconfig.json");

const srcGlobs = ["**/*.ts", "!node_modules/**"];
const compilePath = ".";

const compileGlobs = ["src/**/*.js"];

const specBuildGlobs = ["spec/**/*.spec.js"];

const buildPath = "dist";
const srcEntry = "src/index.js"

const resourceDirRelativePath = "resource"
const resourceGlobs = [resourceDirRelativePath + "/**"];

const binaryFileName = "task";

const tasks = {
    clean: function () {
        return del(compileGlobs.concat(specBuildGlobs, [buildPath]));
    },

    lint: function (cb) {
        return gulp.src(srcGlobs)
            .pipe(tslint({
                formatter: "stylish"
            }))
            .pipe(tslint.report({
                emitError: false,
                summarizeFailureOutput: true
            }));
    },

    test: function (cb) {
        return gulp.src(specBuildGlobs, { read: false })
            .pipe(mocha({ reporter: "spec" }));
    },

    compile: function (cb) {
        return gulp.src(srcGlobs)
            .pipe(tsProject()).js
            .pipe(gulp.dest(compilePath));
    },

    watch: function (cb) {
        return gulp.watch(srcGlobs, ["lint", "test"]);
    },

    build: function (cb) {
        gulp.src(srcEntry)
            .pipe(webpack({ output: { filename: binaryFileName } }))
            .pipe(insert.prepend("#!/usr/bin/env node\n"))
            .pipe(chmod({ execute: true }))
            .pipe(gulp.dest(buildPath))
            .pipe(gulp.src(resourceGlobs))
            .pipe(copy(resourceDirRelativePath))
            .pipe(gulp.dest(buildPath))
            .pipe(notify("Build success!"));
    }
};

gulp.task("clean", tasks.clean);
gulp.task("lint", tasks.lint);
gulp.task("compile", ["lint"], tasks.compile);
gulp.task("test", ["compile"], tasks.test);
gulp.task("watch", ["clean", "lint", "test"], tasks.watch);
gulp.task("build", ["clean", "test", "compile"], tasks.build);