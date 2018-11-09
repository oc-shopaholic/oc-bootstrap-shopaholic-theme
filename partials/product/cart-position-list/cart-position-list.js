import CartLinkHeader from "../cart-link-header/cart-link-header";

export default new class CartPositionList {
  constructor() {
    this.cartSelector = '.cart';
    this.orderForm = '_ajax_create_order';
    this.rowWrapper = 'cart__item';
    this.errorClass = 'bg-danger';
    this.cartEmptySelector = '.cart__empty';
    this.cartTableSelector = '.cart__table';
    this.cartItemSelector = 'cart__item';
    this.buttonRemoveItemSelector = '.cart__delete-btn';
    this.cartTableTitleSelector = '.cart__table-title';
    this.cartTotalSelector = '.cart__total';
    this.positionPrice = 'cart__position-price-value';
    this.positionOldPrice = 'cart__position-old-price-value';
    this.positionOldPriceWrapper = 'cart__position-old-price-figures';
    this.positionTotalPrice = 'cart__total-position-price-value';
    this.positionTotalOldPrice = 'cart__total-position-old-price-value';
    this.positionTotalOldPriceCurrency = 'cart__total-position-old-price-currency';
    this.totalPrice = 'cart__total-price-price-value';
    this.totalOldPrice = 'cart__total-price-old-price-value';
    this.totalOldPriceCurrency = 'cart__total-price-old-price-currency';
    this.shippingPrice = 'cart__total-shipping-price-value';
    this.shippingOldPrice = 'cart__total-shipping-old-price-value';
    this.shippingOldPriceCurrency = 'cart__total-shipping-old-price-currency';

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

    $(document).on('change', `.${this.orderForm} input[name="shipping_type_id"]`, (e) => {
      const input = $(e.currentTarget),
        activeShippingTypeID = input.val();

        this.sendActiveShippingType(activeShippingTypeID);
    });
  }

  removeItemFromTable($btnRemoveItem) {
    const _this = this,
      $cartItemToRemove = $btnRemoveItem.parent().parent(`.${_this.cartItemSelector}`),
      $cart = $(_this.cartSelector),
      cartItemsNumber = $cart.find('tbody').children().length,
      $cartTable = $(_this.cartTableSelector),
      $cartEmpty = $(_this.cartEmptySelector),
      $cartTableTitle = $(_this.cartTableTitleSelector),
      $cartTotal = $(_this.cartTotalSelector);

    if (cartItemsNumber > 1) {
      $cartItemToRemove.remove();
    } else if (cartItemsNumber === 1) {
      $cartTable.remove();
      $cartEmpty.removeClass('d-none');
      $cartTotal.addClass('d-none');
      $cartTableTitle.addClass('d-none');
    }
  }

  sendRequestRemoveItem($btn) {
    const itemId = $btn.attr('data-id'),
      _this = this,
      activeShippingTypeID = $(`.${this.orderForm}`).find('input[name="shipping_type_id"]').val(),
      data = {
        'cart': [itemId],
        'shipping_type_id': activeShippingTypeID
      };

    $.request('Cart::onRemove', {
      'data': data,
      success: function (response) {
        CartLinkHeader.updateBlock();
        if (!!response && response.status && !!response.data) {
          _this.updatePrice(response.data);
        }
      }
    });
  }

  sendRequestUpdateItem($btn) {

    const row = $btn.parents(`.${this.rowWrapper}`),
      _this = this,
      activeShippingTypeID = $(`.${this.orderForm}`).find('input[name="shipping_type_id"]').val(),
      quantity = parseInt(row.find('input[name=quantity]').val()),
      maxQuantity = parseInt(row.find('input[name=quantity]').attr('max')),
      data = {
        'cart': [
          {
            'offer_id': row.attr('data-offer-id'),
            'quantity': quantity
          }
        ],
        'shipping_type_id': activeShippingTypeID
      };

    if (quantity > maxQuantity) {
      row.addClass(this.errorClass);
    } else {
      row.removeClass(this.errorClass);
    }

    $.request('Cart::onUpdate', {
      'data': data,
      success: function (response) {
        if (!!response && response.status && !!response.data) {
          _this.updatePrice(response.data);
        }
      }
    });
  }

  sendActiveShippingType(activeShippingTypeID)
  {
    const _this = this;

    $.request('Cart::onSetShippingType', {
      'data': {'shipping_type_id': activeShippingTypeID},
    success: function(response) {
        if (!!response && response.status && !!response.data) {
          _this.updatePrice(response.data);
        }
      }
    });
  }

  updatePrice(cartData) {
    if (!cartData) {
      return;
    }

    const positionIDList = Object.keys(cartData.position);
    positionIDList.forEach((positionID) => {
      const priceData = cartData.position[positionID],
      positionItem = $(`.${this.cartItemSelector}[data-position-id="${positionID}"]`);

      positionItem.find(`.${this.positionPrice}`).html(priceData.price);
      positionItem.find(`.${this.positionOldPrice}`).html(priceData.old_price);
      if (priceData.discount_price_value == 0) {
        positionItem.find(`.${this.positionOldPriceWrapper}`).addClass('d-none');
      } else {
        positionItem.find(`.${this.positionOldPriceWrapper}`).removeClass('d-none');
      }
    });

    $(`.${this.positionTotalPrice}`).html(cartData.position_total_price.price);
    $(`.${this.positionTotalOldPrice}`).html(cartData.position_total_price.old_price);
    if (cartData.position_total_price.discount_price_value == 0) {
      $(`.${this.positionTotalOldPrice}`).addClass('d-none');
      $(`.${this.positionTotalOldPriceCurrency}`).addClass('d-none');
    } else {
      $(`.${this.positionTotalOldPrice}`).removeClass('d-none');
      $(`.${this.positionTotalOldPriceCurrency}`).removeClass('d-none');
    }

    $(`.${this.shippingPrice}`).html(cartData.shipping_price.price);
    $(`.${this.shippingOldPrice}`).html(cartData.shipping_price.old_price);
    if (cartData.shipping_price.discount_price_value == 0) {
      $(`.${this.shippingOldPrice}`).addClass('d-none');
      $(`.${this.shippingOldPriceCurrency}`).addClass('d-none');
    } else {
      $(`.${this.shippingOldPrice}`).removeClass('d-none');
      $(`.${this.shippingOldPriceCurrency}`).removeClass('d-none');
    }

    $(`.${this.totalPrice}`).html(cartData.total_price.price);
    $(`.${this.totalOldPrice}`).html(cartData.total_price.old_price);
    if (cartData.total_price.discount_price_value == 0) {
      $(`.${this.totalOldPrice}`).addClass('d-none');
      $(`.${this.totalOldPriceCurrency}`).addClass('d-none');
    } else {
      $(`.${this.totalOldPrice}`).removeClass('d-none');
      $(`.${this.totalOldPriceCurrency}`).removeClass('d-none');
    }
  }
}();
