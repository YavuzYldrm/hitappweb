'use strict';

const path = require('path');
const fs = require('fs')

const gulp = require('gulp');
const image = require('gulp-image');
const newer = require('gulp-newer');
const nodemon = require('gulp-nodemon');
const clean = require('gulp-clean');
// const exec = require('child_process').execFile;
const run = require('gulp-run');

const browserSync = require('browser-sync');


const base_path = './public/src/';
const dist_path = './public/dist/';

const reload = () => {
    browserSync.reload();
    return;
};

const nodemon_watched = ['./bin/www', './app.js', './routes/*.js'];

const compiled_assets = {
    image: './public/src/images/**/*',
    script: './public/src/scripts/',
    entry: './public/src/scripts/main.js',
};

const moved_assets = [
    './public/src/templates/**/*',
    './public/src/styles/*',
];

const _move = () => {
    return gulp.src(moved_assets, { base: base_path })
        .pipe(newer(dist_path))
        .pipe(gulp.dest(dist_path))
};

const _image = () => {
    return gulp.src(compiled_assets.image, { base: base_path })
        .pipe(newer(dist_path))
        .pipe(image()).on('error', (error) => console.error(error))
        .pipe(gulp.dest(dist_path))
        .pipe(browserSync.reload({ stream: true }));
};

const _bundle = () => {
    return run('npm run build').exec();
};

const _watch = () => {
    gulp.watch("./public/src/**/*").on('unlink', (file) => {
        var filePathFromSrc = path.relative(path.resolve('src'), file);
        var destFilePath = path.resolve('src', filePathFromSrc);

        destFilePath = destFilePath.replace('src', 'dist');
        console.log("Deleting: " + destFilePath);
        if (fs.existsSync(destFilePath)) {
            fs.unlinkSync(destFilePath);
        }
    });
    gulp.watch(compiled_assets.image, gulp.series(_image));
    gulp.watch(moved_assets, gulp.series(_move));
    gulp.watch(compiled_assets.pug).on('change', reload);
};

const _server = (cb) => {
    var started = false;
    return nodemon({
        script: './bin/www',
        watch: nodemon_watched,
        env: { 'NODE_ENV': 'development' }
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;

            browserSync.init(null, {
                proxy: "http://localhost:3000",
                port: 3001,
                notify: true,
                debug: true
            });
        }
    });
};

const _clean = () => {
    return gulp.src(dist_path, { read: false, allowEmpty: true })
        .pipe(clean());
};

gulp.task('clean', gulp.series(_clean));
gulp.task('build', gulp.parallel(_bundle, _image, _move));
gulp.task('watch', _watch)
gulp.task('sync', gulp.series('build', gulp.parallel(_server, 'watch')));
gulp.task('serveWatch', gulp.parallel(_server, 'watch'));
gulp.task('serve', gulp.series(_server));
