var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

// clean files first
gulp.task('clean', function(){
  gulp.src('./www/minify')
    .pipe(clean());
});

// copy files
gulp.task('copy', function(){
  console.log("starting copy");
  gulp.src(['node_modules/angular/angular.js'])
    .pipe(gulp.dest('www/js/lib/'));

  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css'])
    .pipe(gulp.dest('www/css/'));
});

// minify task
gulp.task('minify-html', function () {
    gulp.src('./www/*.html') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('./www/minify/html'));
});

gulp.task('minify-css', function(){
    gulp.src('./www/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./www/minify/css'))
});

gulp.task('minify-js', function(){
    gulp.src('./www/js/*/**')
    .pipe(uglify())
    .pipe(gulp.dest('./www/minify/'))
})

gulp.task('minify', ['minify-html', 'minify-css']);

gulp.task('default', ['clean', 'copy', 'minify']);
