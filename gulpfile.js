"use strict";

const gulp = require("gulp");
const gulpTS = require("gulp-typescript");
const tslint = require("gulp-tslint");
const gulpSourcemaps = require("gulp-sourcemaps");
const del = require("del");
const merge = require("merge2");

const project = gulpTS.createProject("tsconfig.json");

gulp.task("default", () => {
	del.sync(["./lib/**/*.*"]);

	const tsCompile = gulp
		.src("./src/**/*.ts")
		.pipe(
			tslint({
				formatter: "verbose",
			})
		)
		.pipe(tslint.report())
		.pipe(gulpSourcemaps.init())
		.pipe(project());

	return merge([
		tsCompile.js.pipe(gulpSourcemaps.write()).pipe(gulp.dest("lib/")),
		tsCompile.dts.pipe(gulpSourcemaps.write()).pipe(gulp.dest("lib/")),
	]);
});
