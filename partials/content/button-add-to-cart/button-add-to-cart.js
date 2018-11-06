export default new class ButtonAddToCart {
    constructor() {
        /* selectors */
        this.btnAddToCart = '.btn-add-to-cart ';

        this.eventHandlers();
    }

    eventHandlers() {
        if(!$(this.btnAddToCart).length) {
            return;
        }

        const _this = this;

        $(document).on('click', _this.btnAddToCart, function () {
            console.log('added to cart');
        });
    }
} ();
