import webpack from 'webpack-stream';

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemap: app.isDev })
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			output: {
				filename: 'index.min.js'
			}
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}