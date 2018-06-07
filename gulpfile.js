const gulp        = require('gulp'),
      prefixer    = require('gulp-autoprefixer'),
      uglify      = require('gulp-uglify-es').default,
      sass        = require('gulp-sass'),
      sourcemaps  = require('gulp-sourcemaps'),
      cssmin      = require('gulp-clean-css'),
      rigger      = require('gulp-rigger'),
      imagemin    = require('gulp-imagemin'),
      watch       = require('gulp-watch'),
      pngquant    = require('imagemin-pngquant'),
      browserSync = require("browser-sync"),
      cleanhtml   = require('gulp-cleanhtml'),
      reload = browserSync.reload;

const path = {
      //Готовые файлы после сборки
      build:
      {
          html:     './build/',
          js:       './build/js/',
          css:      './build/css/',
          img:      './build/img/',
          fonts:    './build/fonts/'
      },

      //Исходники
      src:
      {
          html:  './src/*.html',
          js:    './src/js/**/*.js',
          style: './src/css/**/*.scss',
          img:   './src/resources/img/**/*.*',
          fonts: './src/resources/fonts/*.*'
      },

      //Слежка
      watch:
      {
          html:  './src/*.html',
          js:    './src/js/**/*.js',
          style: './src/css/**/*.scss',
          img:   './src/resources/img/*.*',
          fonts: './src/resources/fonts/*.*'
      },

      clean: './build'
};

const devconfig = {
  server:
  {
      baseDir: "./build",
      index: 'index.html'
  },
  files: './build/**/*.*',
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "nonamelab"
}

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(cleanhtml())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'img:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(devconfig);
});

gulp.task('default', ['build', 'webserver', 'watch']);
