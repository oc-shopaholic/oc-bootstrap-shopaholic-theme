import CartPositionList from "./../../product/cart-position-list/cart-position-list";

export default new class ButtonChangeQuantity {
  constructor() {
    /* selectors */
    this.productQuantitySelector = '.product-detailed__btn-qty';
    this.btnQuantityChangeSelector = '.product-detailed__btn-qty-change';
    this.quantitySelector = '.product-detailed__btn-qty-input';

    /* variables */
    this.checkQuantityRegExp = /^\+?(0|[1-9]\d*)$/;

    this.eventHandlers();
  }

  eventHandlers() {
    if (!$(this.productQuantitySelector).length) {
      return;
    }

    const _this = this;

    $(document)
        .on('click', this.btnQuantityChangeSelector, function (e) {
            const $btn = $(e.currentTarget),
            $productQuantityInput = $btn.parent().find(_this.quantitySelector),
            maxQuantity = parseInt($productQuantityInput.attr('max'));
            let productQuantity = parseInt($productQuantityInput.val());

            const isQuantityValid = _this.checkQuantityValidity(productQuantity);

            if (isQuantityValid) {
                if ($btn.attr('data-qty') === 'minus') {
                  _this.reduceQuantity($productQuantityInput, productQuantity, maxQuantity, $btn);
                } else if ($btn.attr('data-qty') === 'plus') {
                  _this.addQuantity($productQuantityInput, productQuantity, maxQuantity, $btn);
                }
                if ($btn.attr('data-ajax') === 'updateTotal') {
                  CartPositionList.sendRequestUpdateItem($btn);
                }
            }
        })
        .on('change', this.quantitySelector, function (e) {
            const $input = $(e.currentTarget);

            if($input.attr('data-ajax') === 'updateTotal') {
                CartPositionList.sendRequestUpdateItem($input);
            }
        });
  }

  checkQuantityValidity(quantity) {
    const _this = this;

    return _this.checkQuantityRegExp.test(quantity);
  }

  addQuantity(productQuantityInput, productQuantity, maxQuantity, $btn) {
    const newValue = +productQuantity + 1,
      $minBtn = $btn.parent().find('button[data-qty="minus"]');
    if (newValue > maxQuantity) {
      $btn.attr('disabled', 'disabled');
      return;
    }

    if (newValue > 1) {
      $minBtn.attr('disabled', false);
    }

    if (newValue >= maxQuantity) {
      $btn.attr('disabled', 'disabled');
    }

    $(productQuantityInput).val(+productQuantity + 1);
  }

  reduceQuantity(productQuantityInput, productQuantity, maxQuantity, $btn) {
    const newValue = +productQuantity - 1,
      $maxBtn = $btn.parent().find('button[data-qty="plus"]');

    if (productQuantity > 1) {
      $(productQuantityInput).val(newValue);
    }

    if (newValue <= 1) {
      $btn.attr('disabled', 'disabled');
    }

    if (newValue < maxQuantity) {
      $maxBtn.attr('disabled', false);
    }
  }
}();
