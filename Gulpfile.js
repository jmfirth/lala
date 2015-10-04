var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

gulp.task('babel', function() {
  return gulp.src('src/*.es6')
    .pipe(babel())
    .pipe(rename(function(path) { path.extname = '.js' }))
    .pipe(gulp.dest('lib/'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.es6', ['babel']);
});

// Default Task
gulp.task('default', ['babel']);
