var gulp = require('gulp');

var server = require('gulp-webserver');

var css = require('gulp-sass');

var cssMin = require('gulp-clean-css');

var querystring = require('querystring');

var mock = require('./mock');

var url = require('url');
var dataJson = [{
    name: "123",
    pwd: "321",
    login: false

}, {
    name: "321",
    pwd: "123",
    login: false

}]

gulp.task('css', function() {
    gulp.src('src/scss/**/*.{css,scss}')
        .pipe(css())
        // .pipe(cssMin())
        .pipe(gulp.dest('src/css'))
})
gulp.task('server', ['css'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url, true).pathname;
                if (pathname === '/login') {
                    var data = '';
                    req.on('data', function(chunk) {
                        data += chunk;
                    })
                    req.on('end', function() {
                        data = decodeURI(data);
                        var arr = querystring.parse(data);

                        dataJson.forEach(function(item, index) {
                            if (item.name === arr.name && item.pwd === arr.pwd) {
                                var login = res.login = true
                                res.end(JSON.stringify({ code: 1, msg: "登录成功", login }));
                            } else {
                                res.end(JSON.stringify({ code: 2, msg: "登录失败", login }));
                            }

                        })


                    })
                    return false

                    next()
                }
                if (pathname === '/details') {
                    var details_id = url.parse(req.url, true).query.id;
                    var dataJson_1 = mock('details')
                    var data = dataJson_1.slideShow;
                    var target = data.filter(function(item) {
                        return item.id == details_id;
                    })
                    console.log(target);
                    res.end(JSON.stringify(target))
                } else if (/\api/g.test(pathname)) {
                    var url_mock = querystring.unescape(req.url);
                    var data = mock(url_mock);
                    res.end(JSON.stringify(data))

                }
                next()

            }
        }))
})
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.{css,scss}', ['css'])
})
gulp.task('default', ['server', 'watch'])