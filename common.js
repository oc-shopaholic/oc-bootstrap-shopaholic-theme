window.$ = window.jQuery = require('jquery');
require('popper.js');
require('bootstrap');

$(() => { // Shorthand for $( document ).ready()
"use strict";
  //Form
  require('./partials/form/button-add-to-cart/button-add-to-cart');
  require('./partials/form/button-change-quantity/button-change-quantity');
  require('./partials/form/checkout-form/checkout-form-validation');
  //Navigation
  require('./partials/navigation/pagination/pagination');
  //Product
  require('./partials/product/cart-link-header/cart-link-header');
  require('./partials/product/cart-position-list/cart-position-list');
  require('./partials/product/catalog-product-list/catalog-product-list');
  require('./partials/product/product-sorting/product-sorting');
});
