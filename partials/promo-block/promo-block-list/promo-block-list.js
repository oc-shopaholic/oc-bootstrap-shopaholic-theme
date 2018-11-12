export default new class PromoBlockList {
  constructor() {
    this.ajaxWrapper = '_ajax_promo_block_list_wrapper';
    this.requestData = {
      'page': 1
    };
  }

  updatePromoBlockList(page = 1) {
    this.updateRequestString(page);

    $.request('PromoBlockList::onAjaxRequest', {
      update: {'promo-block/promo-block-list/ajax-promo-block-list': `.${this.ajaxWrapper}`},
      success: function (response) {
        this.success(response);
      }
    });
  }

  updateRequestData(page) {
    this.requestData = {
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
