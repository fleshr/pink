'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();
const del = require('del');

function clean(cb) {
  return del('dist');

  cb();
}

function reload(cb) {
  browserSync.reload();

  cb();
}

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  cb();
}

function html(cb) {
  return src('src/**/*.html', { baseDir: 'src' })
    .pipe(dest('dist'));

  cb();
}

function css(cb) {
  return src('src/assets/styles/main.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: "style",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(dest('dist/assets/styles', { sourcemaps: '.'}))

  cb();
}

function js(cb) {
  return src('src/assets/scripts/*.js')
    .pipe(plumber())
    .pipe(dest('dist/assets/scripts'));

  cb();
}

function images(cb) {
  return src('src/assets/images/**/*.{jpg,png,svg,webp}')
    .pipe(imagemin())
    .pipe(dest('dist/assets/images'));

  cb();
}

function cwebp(cb) {
  return src('src/assets/images/**/*.{jpg,png,webp}')
    .pipe(webp())
    .pipe(dest('dist/assets/images'));

  cb();
}

function sprite(cb) {
  return src('src/assets/images/**/*.svg')
    .pipe(imagemin())
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest : '.',
          sprite: 'sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/assets/images'));

  cb();
}

function fonts(cb) {
  return src('src/assets/fonts/**/*.{woff,woff2}')
    .pipe(dest('dist/assets/fonts'));

  cb();
}

function watchFiels() {
  watch('src/**/*.html', series(html, reload));
  watch('src/assets/styles/**/*.scss', series(css, reload));
  watch('src/assets/scripts/**/*.js', series(js, reload));
  watch('src/assets/images/**/*.{jpg,png,svg,webp}', series(images, reload));
  watch('src/assets/images/**/*.svg', series(sprite, reload));
  watch('src/assets/images/**/*.{jpg,png,webp}', series(cwebp, reload));
  watch('src/assets/fonts/**/*.{woff,woff2}', series(fonts, reload));
}

const build = series(clean, parallel(html, css, js, images, cwebp, sprite, fonts));
const dev = series(build, serve, watchFiels);

exports.build = build;
exports.dev = dev;
exports.default = dev;
