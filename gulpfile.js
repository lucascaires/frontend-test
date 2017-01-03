var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function () {
  return gulp.src('./public/stylesheets/*.scss')
    .pipe(sass({
    	outputStyle: 'compact' //deploy com compressed
    }).on('error', sass.logError))    
    .pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('watch', function () {
	gulp.watch('public/stylesheets/*.scss', ['sass']);
});
