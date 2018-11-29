import CartLinkHeader from "../../product/cart-link-header/cart-link-header";

export default new class CheckoutFormValidation {
  constructor() {
    this.form = '_ajax_create_order';
    this.cartItemItem = 'cart__item';
    this.errorClass = 'bg-danger';
    this.buttonClass = '_create_order_button';
    this.wasValidatedClass = 'was-validated';

    this.eventHandlers();
  }

  eventHandlers() {
    if (!$(`.${this.form}`).length) {
      return;
    }

    const _this = this;
    const forms = $(`.${this.form}`);

    $.each(forms, function (i, elem) {
      $(elem).on('submit', function (event) {
        if (elem.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        $(elem).addClass(_this.wasValidatedClass);
        if (elem.checkValidity() === true) {
          event.preventDefault();
          event.stopPropagation();

          _this.createOrder();
        }
      });
    });
  }

  createOrder() {

    const form = $(`.${this.form}`),
      button = $(`.${this.buttonClass}`),
      _this = this;

    var data = {
      'order': {
        'payment_method_id': form.find('input[name="payment_method_id"]:checked').val(),
        'shipping_type_id': form.find('input[name="shipping_type_id"]:checked').val(),
      },
      'user': {
        'email': form.find('input[name="email"]').val(),
        'name': form.find('input[name="name"]').val(),
        'last_name': form.find('input[name="last_name"]').val(),
      },
      'shipping_address': {
        'address1': form.find('input[name="address1"]').val(),
        'address2': form.find('input[name="address2"]').val(),
        'country': form.find('input[name="country"]').val(),
        'state': form.find('input[name="state"]').val(),
        'postcode': form.find('input[name="postcode"]').val(),
      },
      'billing_address': {}
    };

    this.clearNotAvailableCartPosition();

    $.request('MakeOrder::onCreate', {
      'data': data,
      success: function (response) {
        if (!!response && (response.status || !!response['X_OCTOBER_REDIRECT'])) {
          this.success(response);
        } else {
          button.attr('data-content', response.message);
          _this.markNotAvailableOfferPosition(response);

          button.popover('show');
          setTimeout(() => {
            button.popover('hide');
          }, 1500);
        }
      }
    });
  }

  markNotAvailableOfferPosition(response) {
    if (!response || !response.data || !response.data.cart_position_id) {
      return;
    }

    $(`.${this.cartItemItem}[data-position-id="${response.data.cart_position_id}"]`).addClass(this.errorClass);
  }

  clearNotAvailableCartPosition() {
    $(`.${this.cartItemItem}`).removeClass(this.errorClass);
  }
}();
