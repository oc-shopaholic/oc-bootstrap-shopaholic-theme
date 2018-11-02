window.$ = window.jQuery = require('jquery');
require('popper.js');
require('bootstrap');

$(() => { // Shorthand for $( document ).ready()
"use strict";

  // Your js script is below this line
  // --------------------------------------------------------------------- //

  // Example
  console.log('ready!');
  require('./partials/content/button-change-quantity/button-change-quantity');
  require('./partials/content/form/formValidation');
});
