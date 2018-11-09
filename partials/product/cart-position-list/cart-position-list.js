import CartLinkHeader from "../cart-link-header/cart-link-header";

export default new class CartPositionList {
  constructor() {
    this.cartSelector = '.cart';
    this.cartEmptySelector = '.cart__empty';
    this.cartTableSelector = '.cart__table';
    this.cartItemSelector = '.cart__item';
    this.buttonRemoveItemSelector = '.cart__delete-btn';
    this.cartTotalSelector = '.cart__total';

    this.eventHandlers();
  }

  eventHandlers() {
    if (!$(this.cartSelector).length) {
      return;
    }

    const _this = this;

    $(document).on('click', this.buttonRemoveItemSelector, function (e) {
      const $btnRemoveItem = $(e.currentTarget);

      _this.removeItemFromTable($btnRemoveItem);
      _this.sendRequestRemoveItem($btnRemoveItem);

    });
  }

  removeItemFromTable($btnRemoveItem) {
    const _this = this,
      $cartItemToRemove = $btnRemoveItem.parent().parent(_this.cartItemSelector),
      $cart = $(_this.cartSelector),
      cartItemsNumber = $cart.find('tbody').children().length,
      $cartTable = $(_this.cartTableSelector),
      $cartEmpty = $(_this.cartEmptySelector),
      $cartTotal = $(_this.cartTotalSelector)  ;

    if (cartItemsNumber > 1) {
      $cartItemToRemove.remove();
    } else if (cartItemsNumber === 1) {
      $cartTable.remove();
      $cartEmpty.removeClass('d-none');
      $cartTotal.addClass('d-none');
    }
  }

  sendRequestRemoveItem($btn) {
    const itemId = $btn.attr('data-id'),
      data = {
        'cart': [itemId]
      };

    $.request('Cart::onRemove', {
      'data': data,
      success: function (response) {
        CartLinkHeader.updateBlock();
      }
    });
  }
}();
