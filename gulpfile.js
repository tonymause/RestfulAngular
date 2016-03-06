var gulp = require('gulp');


// copy files
gulp.task('copy', function(){
  console.log("starting copy");
  gulp.src(['node_modules/angular/angular.js'])
    .pipe(gulp.dest('www/js/lib/'));

  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css'])
    .pipe(gulp.dest('www/css/'));
});

gulp.task('default', ['copy']);
