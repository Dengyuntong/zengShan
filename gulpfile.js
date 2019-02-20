var gulp = require('gulp');
var server = require('gulp-webserver');

gulp.task('server', function() {
    gulp.src('./qian/')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true
        }))
})