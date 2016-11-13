let browserSync   = require('browser-sync'),
		gulp          = require('gulp'),
		postcss       = require('gulp-postcss'),
		autoprefixer  = require('autoprefixer'),
		cssnano       = require('cssnano'),
		media         = require('gulp-group-css-media-queries'),
		sass          = require('gulp-sass'),
		bourbon       = require('node-bourbon');
		
gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: 'assets'
		},
		notify: false
	})
});

gulp.task('postcss', function () {
	let processor = ([
			//autoprefixer({browsers: ['last 10 version']}),
			cssnano()
	]);
	return gulp.src('./assets/sass/*.sass')
			.pipe(sass({includePaths: bourbon.includePaths}))
			.pipe(media())
			.pipe(postcss(processor))
			.pipe(gulp.dest('./assets/css'))
			.pipe(browserSync.reload({stream: true}))
});



gulp.task('watch', ['postcss', 'browserSync'], function () {
	gulp.watch('assets/sass/**/*.sass', ['postcss']);
	gulp.watch('assets/*.html', browserSync.reload);
	gulp.watch('assets/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);