export default new class CartLinkHeader {
  constructor() {
    this.ajaxWrapper = '_ajax_cart_link_header_wrapper';

    this.updateBlock();
  }

  updateBlock() {
    if ($(`.${this.ajaxWrapper}`).length == 0 || $('body').attr('data-cart-is-available') != 1) {
      return;
    }

    $.request('Cart::onGetData', {
      update: {'product/cart-link-header/cart-link-header': `.${this.ajaxWrapper}`}
    });
  }
}();
