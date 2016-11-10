var browserSync   = require('browser-sync'),
		gulp          = require('gulp'),
		autoprefixer  = require('gulp-autoprefixer'),
		cleanCss      = require('gulp-clean-css'),
		gcmq          = require('gulp-group-css-media-queries'),
		image         = require('gulp-image'),
		sass          = require('gulp-sass'),
		notify        = require('gulp-notify'),
		bourbon       = require('node-bourbon'),
		uglify        = require('gulp-uglify');
		
gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: 'assets'
		},
		notify: false
	})
});

gulp.task('sass', function () {
	return gulp.src('assets/sass/*.sass')
			.pipe(sass({
				includePaths: bourbon.includePaths
			}).on("error", notify.onError()))
			.pipe(autoprefixer(['last 10 versions']))
			.pipe(gcmq())
			.pipe(cleanCss())
			.pipe(gulp.dest('assets/css'))
			.pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', ['sass', 'browserSync'], function () {
	gulp.watch('assets/sass/**/*.sass', ['sass']);
	gulp.watch('assets/*.html', browserSync.reload);
	gulp.watch('assets/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);