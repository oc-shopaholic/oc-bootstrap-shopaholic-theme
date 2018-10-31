export default new class BtnChangeQty {
    constructor () {
        /* selectors */
        this.productQtySelector = '.product-detailed__btn-qty';
        this.btnQtyChangeSelector = '.product-detailed__btn-qty-change';
        this.qtySelector = '.product-detailed__btn-qty-input';

        this.eventHandlers();
    }

    eventHandlers() {
        if(!$(this.productQtySelector)) {
            return;
        }

        const _this = this;

        $(document).on('click', this.btnQtyChangeSelector, function(e) {
            const $btn = $(e.currentTarget);
            const $productQtyInput = $(_this.qtySelector);
            let productQty = $productQtyInput.val();

            if($btn.attr('data-qty') === 'minus') {
                _this.reduceQuantity($productQtyInput, productQty);
            } else {
                _this.addQuantuty($productQtyInput, productQty);
            }
        });
    }

    addQuantuty(productQtyInput, productQty) {
        if(productQty === '') {
            $(productQtyInput).val(1);
        } else {
            $(productQtyInput).val(+productQty + 1);
        }
    }

    reduceQuantity(productQtyInput, productQty) {
        if(productQty <= 1) {
            $(productQtyInput).val('');
        } else {
            $(productQtyInput).val(+productQty - 1);
        }
    }

} ();
