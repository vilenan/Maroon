const { src, dest, parallel, series, watch } = require('gulp')
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

const paths = {
    styles: 'source/sass/style.scss',
    html: 'source/*.html'
}

function styles() {
    return src(paths.styles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('source/css'))
        .pipe(browserSync.stream());
}

exports.styles = styles;

function minifyHtml() {
    return src(paths.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('source'))
}

function browsersync(done) {
    browserSync.init({
        server: {
            baseDir: 'source'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

exports.browsersync = browsersync;

function reload(done) {
    browserSync.reload();
    done();
}

exports.reload = reload;

function watcher(){
    watch('source/sass/**/*.scss', series('styles'));
    // watch(paths.html).on('change', browserSync.reload);
    watch(paths.html, series('reload'));
}

exports.watcher = watcher;

exports.default = parallel(
    styles,
    browsersync,
    watcher
);

exports.build = series(
    styles
)
