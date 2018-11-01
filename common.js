window.$ = window.jQuery = require('jquery');
require('popper.js');
require('bootstrap');

$(() => { // Shorthand for $( document ).ready()
"use strict";

  // Your js script is below this line
  // --------------------------------------------------------------------- //

  // Example
  console.log('ready!');
  require('./partials/product/product-card-detailed/product-card-detailed');
  require('./partials/content/form/formValidation');
});
