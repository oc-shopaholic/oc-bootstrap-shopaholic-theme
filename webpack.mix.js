const mix = require('laravel-mix');

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

mix.setPublicPath('assets/');

mix.js('./common.js', 'js')
  .sass('./common.scss', 'css')
  .options({
    postCss: [
      require('postcss-css-variables')()
    ]
  });

mix.version();