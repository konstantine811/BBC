var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create();

var reload      = browserSync.reload;


function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}

//Scss compile
gulp.task('scss', function() {
	return gulp.src('./app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/style/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});


gulp.task('browserSync', function() {
	browserSync.init({
		server: { baseDir: './app'},
		notify: false,
		ghostMode: {
          clicks: true,
          location: true,
          forms: true,
          scroll: false
      }
	});
});

gulp.task('watch', function() {
	gulp.watch('./app/scss/**/*.scss', ['scss']).on('change', browserSync.reload);
	gulp.watch('./app/code/**/*.js', browserSync.reload);
	gulp.watch("./app/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['browserSync','scss', 'watch']);


