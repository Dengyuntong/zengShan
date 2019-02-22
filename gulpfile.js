var gulp = require('gulp');
var server = require('gulp-webserver');

gulp.task('server', function() {
    gulp.src('./qian1/')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
			proxies:[
				{
					source:'/find',
					target:'http://192.168.0.229:8000/find'
				},
				{
					source:'/remove',
					target:'http://192.168.0.229:8000/remove'
				},
				{
					source:'/insert',
					target:'http://192.168.0.229:8000/insert'
				},
				{
					source:'/detail',
					target:'http://192.168.0.229:8000/detail'
				}
			]
        }))
})