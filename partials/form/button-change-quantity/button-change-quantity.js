export default new class ButtonChangeQuantity {
    constructor () {
        /* selectors */
        this.productQuantitySelector = '.product-detailed__btn-qty';
        this.btnQuantityChangeSelector = '.product-detailed__btn-qty-change';
        this.quantitySelector = '.product-detailed__btn-qty-input';
        this.totalPriceSelector = '.cart__total-price-figures';

        /* variables */
        this.checkQuantityRegExp = /^\+?(0|[1-9]\d*)$/;

        this.eventHandlers();
    }

    eventHandlers () {
        if(!$(this.productQuantitySelector).length) {
            return;
        }

        const _this = this;

        $(document).on('click', this.btnQuantityChangeSelector, function(e) {
            const $btn = $(e.currentTarget);
            const $productQuantityInput = $btn.parent().find(_this.quantitySelector);
            let productQuantity = $productQuantityInput.val();

            const isQuantityValid = _this.checkQuantityValidity(productQuantity);

            if (isQuantityValid) {
                if($btn.attr('data-qty') === 'minus') {
                    _this.reduceQuantity($productQuantityInput, productQuantity);
                } else if ($btn.attr('data-qty') === 'plus') {
                    _this.addQuantity($productQuantityInput, productQuantity);
                }
                if($btn.attr('data-ajax') === 'updateTotal') {
                    _this.sendRequestUpdateTotal($btn);
                }
            }
        });
    }

    checkQuantityValidity (quantity) {
        const _this = this;

        return _this.checkQuantityRegExp.test(quantity);
    }

    addQuantity (productQuantityInput, productQuantity) {
        $(productQuantityInput).val(+productQuantity + 1);
    }

    reduceQuantity (productQuantityInput, productQuantity) {
        if (productQuantity > 1) {
            $(productQuantityInput).val(+productQuantity - 1);
        }
    }

    sendRequestUpdateTotal ($btn) {
        const _this = this;

        console.log('update total'); /* for backend */

        let $totalPrice = $btn.parent().parent().next().find(_this.totalPriceSelector);
        $totalPrice.text('updated');
    }

} ();
