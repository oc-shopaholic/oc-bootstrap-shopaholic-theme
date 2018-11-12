export default new class PromoBlockProductList {
  constructor() {
    this.sortingSelector = 'select[name="sorting"]';
    this.ajaxWrapper = '_ajax_catalog_wrapper';
    this.requestData = {
      'sort': '',
      'page': 1
    };
  }

  updateProductList(page = 1) {
    this.updateRequestString(page);

    $.request('ProductList::onAjaxRequest', {
      update: {'product/promo-block-product-list/ajax-promo-block-product-list': `.${this.ajaxWrapper}`},
      success: function (response) {
        this.success(response);
      }
    });
  }

  updateRequestData(page) {
    this.requestData = {
      'sort': $(this.sortingSelector).val(),
      'page': page
    };
  }

  updateRequestString(page) {
    this.updateRequestData(page);

    const arKeyList = Object.keys(this.requestData);
    let sResult = '';

    arKeyList.forEach((sKey) => {
      let sValue = this.requestData[sKey];
      if (Array.isArray(sValue)) {
        sValue = sValue.join('|');
      }

      if (sKey == 'page' && sValue == 1) {
        return;
      }

      if (sResult.length > 0) {
        sResult += '&';
      } else {
        sResult += '?';
      }

      sResult += sKey + '=' + sValue;
    });

    window.history.pushState(null, null, `${location.origin}${location.pathname}${sResult}`);
  }
}();
