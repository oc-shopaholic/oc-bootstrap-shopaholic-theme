import CatalogProductList from './../catalog-product-list/catalog-product-list';

export default new class ProductSorting {
  constructor() {
    this.sortingSelectSelector = 'sorting__select';

    this.eventHandlers();
  }

  eventHandlers() {
    if (!$(`.${this.sortingSelectSelector}`).length) {
      return;
    }

    $(document).on('change', `.${this.sortingSelectSelector}`, () => {
      CatalogProductList.updateProductList();
    });
  }
}();
