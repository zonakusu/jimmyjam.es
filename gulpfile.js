var gulp = require('gulp');
var path = require('path');
var del = require('del');
var $ = require('gulp-load-plugins')({
    pattern: '*',
});

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];

var port = $.util.env.port || 9000;
var src = 'src/';
var dist = 'docs/';

var autoprefixerBrowsers = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 6',
    'opera >= 23',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('sprites', function () {
    var spriteOutput;

    spriteOutput = gulp.src('./docs/css/*.css')
        .pipe($.spriteGenerator({
            baseUrl: './docs/static/images/**/',
            spriteSheetName: "sprite.png",
            spriteSheetPath: "./docs/static/image"
        }));

    spriteOutput.css.pipe(gulp.dest("./docs/css"));
    spriteOutput.img.pipe(gulp.dest("./docs/static/images"));
});

gulp.task('scripts', function () {
    return gulp.src(webpackConfig.entry)
        .pipe($.webpackStream(webpackConfig))
        .pipe(isProduction ? $.uglifyjs() : $.util.noop())
        .pipe(gulp.dest(dist + 'js/'))
        .pipe($.size({title: 'js'}))
        .pipe($.connect.reload());
});

gulp.task('html', function () {
    return gulp.src(src + 'index.html')
        .pipe(gulp.dest(dist))
        .pipe($.size({title: 'html'}))
        .pipe($.connect.reload());
});

gulp.task('styles', function (cb) {
    return gulp.src(src + 'sass/main.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
        .pipe(gulp.dest(dist + 'css/'))
        .pipe($.size({title: 'css'}))
        .pipe($.connect.reload());
});

gulp.task('serve', function () {
    $.connect.server({
        root: [dist, src],
        port: port,
        host: '0.0.0.0',
        fallback: 'src/index.html',
        livereload: {
            port: 35728
        }
    });
});

gulp.task('static', function (cb) {
    return gulp.src(src + 'static/**/*')
        .pipe($.size({title: 'static'}))
        .pipe(gulp.dest(dist + 'static/'));
});

gulp.task('watch', function () {
    gulp.watch(src + 'sass/**/*.scss', ['styles']);
    gulp.watch(src + 'index.html', ['html']);
    gulp.watch(src + 'app/**/*.{js}', ['scripts']);
});

gulp.task('clean', function (cb) {
    del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function () {
    gulp.start(['static', 'html', 'scripts', 'styles', 'sprites']);
});