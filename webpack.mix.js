const mix = require('laravel-mix');
const stylelint = require('laravel-mix-stylelint');
const StyleLintPlugin = require('stylelint-webpack-plugin');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
	plugins: [
		new StyleLintPlugin({
			files: './partials/**/*.css',
			configFile: '.stylelintrc',
		}),
	]
});

mix.setPublicPath('assets/');

mix.stylelint();

mix.js('./common.js', 'js')
  .sass('./common.scss', 'css').options({
    processCssUrls: false
});

mix.version();
