import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // сжатие CSS файла
import webpcss from 'gulp-webpcss'; // вывод webp изображений
import autoprefixer from 'gulp-autoprefixer'; // добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // группировка медиа запросов

const sass = gulpSass(dartSass)

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemap: app.isDev })
		.pipe(app.plugins.replace(/@img\//g, '../assets/images/'))
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss({
					webClass: '.webp',
					noWebpClass: '.no-webp',
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserslist: ['Last 3 versions'],
					cascde: true,
				})
			)
		)
		// выгружает два файло минимизированный и нет, если не нужен не мин, то строку ниже закомментить
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}