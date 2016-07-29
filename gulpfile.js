var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var ngHtml2Js = require("gulp-ng-html2js");
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('sass', function () {
    return gulp.src('client/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('client/css'));
});

gulp.task('scripts', function () {
    gulp.src(['./client/js/**/*.js', '!./client/js/**/*.test.js', '!./client/js/app.min.js', '!./client/js/jqscripts/*.js', '!./client/js/old/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify()).on('error', function (e) {
            console.log(e);
        })
        .pipe(gulp.dest('./client/js/'))
});

gulp.task('useref', function () {
    return gulp.src('client/*.html')
        .pipe(useref())
        .pipe(gulp.dest('min'))
});

<<<<<<< HEAD
gulp.task('browserSync',function(){
    browserSync.init({
        server :{
            baseDir : 'client'
        }
    })
});

gulp.watch('client/scss/*.scss',['sass']);
gulp.watch('client/**/*.js').on('change', browserSync.reload);
gulp.watch('client/**/*.css').on('change', browserSync.reload);
gulp.watch('client/**/*.html').on('change', browserSync.reload);
gulp.watch('client/**/*.json').on('change', browserSync.reload);

gulp.task('default', ['sass','browserSync']);


=======
gulp.task('main', function () {
    gulp.watch('./client/scss/*.scss', ['sass']);
//    gulp.watch('./client/**/*.js').on('change');
//    gulp.watch('./client/**/*.css').on('change');
//    gulp.watch('./client/**/*.html').on('change');
//    gulp.watch('./client/**/*.json').on('change');
    gulp.watch(['./client/js/**/*.js', '!./client/js/**/*.test.js', '!./client/js/app.min.js', '!./client/js/jqscripts/*.js', '!./client/js/old/*.js'], ['scripts']);
});

gulp.task('default', ['sass', 'scripts', 'main']);
>>>>>>> e79daa89af622532d9fa1c566575611d23718c83
