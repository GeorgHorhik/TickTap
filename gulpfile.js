const
    autoprefixer = require("autoprefixer"),
    browserSync = require('browser-sync').create(),
    gulp = require("gulp"),
    less = require("gulp-less"),
    postcss = require("gulp-postcss"),
    csso = require("gulp-csso"),
    posthtml = require("gulp-posthtml"),
    include = require("posthtml-include");


var build = {
    css: "./app/css",
    html: "./app/html",
    js: "./app.js"
}
var src = {
    less: "./src/less/styles.less",
    img: "./src/img/*",
    svg: "./src/svg/*",
    js: "./app/js/**/*.js",
    index: "./index.html"
};






//  let path
//  const htmlPlugins = [require('posthtml-include')]



// BrowserSync
function server() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: src.index
        },
        port: 3001
    });


    gulp.watch("./**/*.less", gulp.series('style'));
    gulp.watch("./**/*.html").on('change', browserSync.reload);
    gulp.watch("./**/*.js").on('change', browserSync.reload);

};
exports.server = server;

/*
 *   css
 */


gulp.task('style', function() {
    return gulp.src(src.less) // only compile the entry file
        .pipe(less())
        .pipe(postcss([autoprefixer({ Browserslist: ['last 3 versions', 'ie > 9'] })]))
        .pipe(gulp.dest(build.css))
        .pipe(browserSync.stream());

});
gulp.task('default', function() {
    server();
})