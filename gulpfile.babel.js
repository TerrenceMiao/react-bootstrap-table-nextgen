const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const cleanDir = require('gulp-clean');
const rename = require('gulp-rename');
const shell = require('gulp-shell');

const LIB = 'lib';
const DIST = 'dist';
const TEST = 'test';
const PKG_PATH = './packages';
const NODE_MODULES = 'node_modules';

const JS_PKGS = [
  'react-bootstrap-table-nextgen',
  'react-bootstrap-table-nextgen-editor',
  'react-bootstrap-table-nextgen-filter',
  'react-bootstrap-table-nextgen-overlay',
  'react-bootstrap-table-nextgen-paginator',
  'react-bootstrap-table-nextgen-toolkit'
].reduce((pkg, curr) => `${curr}|${pkg}`, '');

const JS_SKIPS = `+(${TEST}|${LIB}|${DIST}|${NODE_MODULES})`;

const STYLE_PKGS = [
  'react-bootstrap-table-nextgen',
  'react-bootstrap-table-nextgen-filter',
  'react-bootstrap-table-nextgen-paginator',
  'react-bootstrap-table-nextgen-toolkit'
].reduce((pkg, curr) => `${curr}|${pkg}`, '');

const STYLE_SKIPS = `+(${NODE_MODULES})`;


function clean() {
  return gulp
    .src(`./packages/+(${JS_PKGS})/+(${LIB}|${DIST})`, { allowEmpty: true })
    .pipe(cleanDir());
}

function scripts() {
  return gulp
    .src([
      `./packages/+(${JS_PKGS})/**/*.js`,
      `!packages/+(${JS_PKGS})/${JS_SKIPS}/**/*.js`
    ])
    .pipe(babel())
    .pipe(rename((path) => {
      if (path.dirname.indexOf('src') > -1) {
        path.dirname = path.dirname.replace('src', `${LIB}/src`);
      } else {
        path.dirname += `/${LIB}`;
      }
    }))
    .pipe(gulp.dest(PKG_PATH));
}

function declaration() {
  return gulp
    .src([
      `./packages/+(${JS_PKGS})/**/*.d.ts`,
      `!packages/+(${JS_PKGS})/${JS_SKIPS}/**/*.d.ts`,
    ])
    .pipe(rename((path) => {
      if (path.dirname.indexOf('src') > -1) {
        path.dirname = path.dirname.replace('src', `${LIB}/src`);
      } else {
        path.dirname += `/${LIB}`;
      }
    }))
    .pipe(gulp.dest(PKG_PATH));
}

function map() {
  return gulp
    .src([
      `./packages/+(${JS_PKGS})/**/*.js.map`,
      `!packages/+(${JS_PKGS})/${JS_SKIPS}/**/*.js.map`,
    ])
    .pipe(rename((path) => {
      if (path.dirname.indexOf('src') > -1) {
        path.dirname = path.dirname.replace('src', `${LIB}/src`);
      } else {
        path.dirname += `/${LIB}`;
      }
    }))
    .pipe(gulp.dest(PKG_PATH));
}

function styles() {
  return gulp
    .src([
      `./packages/+(${STYLE_PKGS})/style/**/*.scss`,
      `!packages/+(${STYLE_PKGS})/${STYLE_SKIPS}/**/*.scss`
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename((path) => {
      path.dirname = path.dirname.replace('style', DIST);
    }))
    .pipe(gulp.dest(PKG_PATH))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename((path) => {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest(PKG_PATH));
}

function umd(done) {
  gulp.parallel(
    () => gulp.src('./webpack/nextgen.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/editor.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/filter.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/overlay.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/paginator.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/toolkit.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>']))
  )();
  done();
}

const buildJS = gulp.parallel(umd, scripts, declaration, map);
const buildCSS = styles;
const build = gulp.series(clean, gulp.parallel(buildJS, buildCSS));

gulp.task('prod', build);
gulp.task('default', build);
