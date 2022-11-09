import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import pug from 'gulp-pug';

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(fileInclude())
		// .pipe(pug({
		// 	// сжатие HTML файла
		// 	pretty: true,
		// 	// показывать в терминале какой файл обработан
		// 	verbose: true,
		// }))
		.pipe(app.plugins.replace(/@img\//g, 'assets/images/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
}