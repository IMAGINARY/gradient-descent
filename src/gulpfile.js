const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const touch = require('gulp-touch-fd');
const rev = require('gulp-rev');
const del = require('del');

const pugHelper = require('./helpers/pug-helper');
const pugData = require('./pug/data.js');

const OUTPUT_DIR = '..';

const paths = {
  html: {
    src: ['./pug/**/*.pug', '!./pug/include/**/*.pug', '!./pug/tpl/**/*.pug',
          '!./pug/sections/**/*.pug'],
    watchSrc: [
      './pug/**/*.pug',
      pugData.revManifestPath('styles'),
      pugData.revManifestPath('scripts'),
      pugData.revManifestPath('dependencies'),
    ],
    dest: `${OUTPUT_DIR}`,
  },
  styles: {
    src: './sass/**/*.scss',
    watchSrc: './sass/**/*.scss',
    dest: `${OUTPUT_DIR}/assets/css`,
    revManifest: pugData.revManifestPath('styles'),
    clean: [
      `${OUTPUT_DIR}/assets/css/default-??????????.css`,
      `${OUTPUT_DIR}/assets/css/default-??????????.css.map`
    ],
  },
  scripts: {
    src: './js/main.js',
    watchSrc: ['./js/**/*.js', '!./js/dependencies.js'],
    dest: `${OUTPUT_DIR}/assets/js`,
    revManifest: pugData.revManifestPath('scripts'),
    filename: 'bundle',
    clean: [
      `${OUTPUT_DIR}/assets/js/bundle-??????????.min.js`,
      `${OUTPUT_DIR}/assets/js/bundle-??????????.min.js.map`
    ],
  },
  dependencies: {
    src: './js/dependencies.js',
    watchSrc: './js/dependencies.js',
    dest: `${OUTPUT_DIR}/assets/js`,
    revManifest: pugData.revManifestPath('dependencies'),
    filename: 'dependencies',
    clean: [
      `${OUTPUT_DIR}/assets/js/dependencies-??????????.min.js`,
      `${OUTPUT_DIR}/assets/js/dependencies-??????????.min.js.map`
    ],
  },
};

function html() {
  return gulp.src(paths.html.src)
    .pipe(pugHelper())
    .pipe(pug({
      pretty: true,
      data: Object.assign({}, pugData),
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(touch());
}

function safeClean(paths) {
  // To avoid tragedy we check that all deleted files are within the assets directory.
  // This is an extra layer of security.
  const safePath = '../assets';
  paths.forEach((path) => {
    if (path.substr(0, safePath.length) !== safePath) {
      throw Error('Attempting to clean file from unsafe directory');
    }
  });
  // By default del only deletes files under the working directory, but since our
  // assets are stored one level above, we have to force it.
  del.sync(paths, { force: true });
}

function styles() {
  safeClean(paths.styles.clean);
  return gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rev.manifest(paths.styles.revManifest))
    .pipe(gulp.dest('.'));
}

function es({ src, dest, revManifest, filename, clean }) {
  safeClean(clean);
  return browserify({
    extensions: ['.js', '.jsx'],
    entries: src,
    debug: true,
  })
    .transform('babelify', { presets: ['@babel/env'], sourceMaps: true })
    .on('error', (msg) => {
      // eslint-disable-next-line no-console
      console.error(msg);
    })
    .bundle()
    .pipe(source(`${filename}.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename(`${filename}.min.js`))
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
    .pipe(rev.manifest(revManifest))
    .pipe(gulp.dest('.'));
}

function dependencies() {
  return es(paths['dependencies']);
}

function scripts() {
  return es(paths['scripts']);
}

function watch() {
  gulp.watch(paths.html.watchSrc, html);
  gulp.watch(paths.styles.watchSrc, styles);
  gulp.watch(paths.scripts.watchSrc, scripts);
  gulp.watch(paths.dependencies.watchSrc, dependencies);
}

const build = gulp.series(gulp.parallel(styles, scripts, dependencies), html);

exports.html = html;
exports.styles = styles;
exports.dependencies = dependencies;
exports.scripts = scripts;
exports.watch = watch;

exports.build = build;
exports.default = build;
