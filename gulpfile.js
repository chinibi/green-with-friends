var gulp = require('gulp');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// parse javascript files for errors
gulp.task('jshint', () => {
  gulp.src('./public/src/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});


// compress images for production
gulp.task('imagemin', () => {
  var imgSrc = './public/src/images/**/*',
      imgDst = './public/images';

  gulp.src(imgSrc)
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst));
});


// compress HTML files
gulp.task('minifyHTML', () => {
  var templateSrc = './public/src/js/templates/*';
  var templateDst = './public/js/templates';

  gulp.src(templateSrc)
      .pipe(minifyHTML())
      .pipe(gulp.dest(templateDst));

  var rootSrc = './public/src/index.html';
  var rootDst = './public';

  gulp.src(rootSrc)
      .pipe(minifyHTML())
      .pipe(gulp.dest(rootDst));
});


// bundle javascripts into one file
gulp.task('scripts', () => {
  var rootDirectory = './public/src/js/';
  var javascripts = [
    'app.module.js',
    'app.routes.js',
    'services/*.js',
    'config/*.js',
    'controllers/*.js',
    'resources/*.js',
  ];
  javascripts.forEach((entry, i) => {
    javascripts[i] = entry.replace(/^/, rootDirectory);
  });

  gulp.src(javascripts)
      .pipe(concat('bundle.js'))
      .pipe(stripDebug())
      .pipe(uglify().on('error', e => {
        console.log(e);
      }))
      .pipe(gulp.dest('./public/js/'));
});


// compress CSS
gulp.task('minifyCSS', () => {
  var cssSrc = ['./public/src/css/*.css'];
  var cssDst = './public/css/';

  gulp.src(cssSrc)
      .pipe(concat('main.css'))
      .pipe(autoprefix('last 2 versions'))
      .pipe(minifyCSS())
      .pipe(gulp.dest(cssDst));
});


// run all tasks as default
var allTasks = ['imagemin', 'minifyHTML', 'scripts', 'minifyCSS'];
gulp.task('default', allTasks, () => {

  // watch for HTML changes
  gulp.watch(['./public/src/*.html', './public/src/js/templates/*.html'], ['minifyHTML']);

  // watch for JS changes
  gulp.watch('./public/src/js/**/*.js', ['scripts']);

  // watch for CSS changes
  gulp.watch('./public/src/css/*.css', ['minifyCSS']);

  console.log('Listening for file changes.');
});
