import CatalogProductList from './../catalog-product-list/catalog-product-list';
import PromoBlockProductList from './../promo-block-product-list/promo-block-product-list';
import PromoBlockList from './../../promo-block/promo-block-list/promo-block-list';

export default new class ProductSorting {
  constructor() {
    this.sortingSelectSelector = 'sorting__select';

    this.catalogProductListLabel = 'catalog-product-list';
    this.promoBlockListLabel = 'promo-block-list';
    this.promoBlockProductListLabel = 'promo-block-product-list';

    this.eventHandlers();
  }

  eventHandlers() {
    if (!$(`.${this.sortingSelectSelector}`).length) {
      return;
    }

    $(document).on('change', `.${this.sortingSelectSelector}`, (e) => {
      const select = $(e.currentTarget),
        label = select.attr('aria-label');

      switch (label) {
        case this.catalogProductListLabel:
          CatalogProductList.updateProductList();
          break;
        case this.promoBlockListLabel:
          PromoBlockList.updatePromoBlockList();
          break;
        case this.promoBlockProductListLabel:
          PromoBlockProductList.updateProductList();
          break;
      }
    });
  }
}();
