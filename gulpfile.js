var gulp = require('gulp');

var jshint = require('gulp-jshint');

gulp.task('jshint', () => {
  gulp.src('./public/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});
