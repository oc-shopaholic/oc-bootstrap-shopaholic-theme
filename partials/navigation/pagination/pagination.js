import CatalogProductList from './../../product/catalog-product-list/catalog-product-list';

export default new class Pagination {
    constructor() {
       this.btnPage = 'page-link';
       this.activeClass = 'active';
       this.catalogProductListLabel = 'catalog-product-list';

        this.eventHandlers();
    }

    eventHandlers() {

        $(document).on('click', `.${this.btnPage}`, (e) => {
           e.preventDefault();
           e.stopPropagation();
           const button = $(e.currentTarget),
             page = button.attr('data-page'),
             label = button.parents('nav').attr('aria-label');

           if (button.parent('li').hasClass(this.activeClass)) {
             return;
           }

           switch (label) {
             case this.catalogProductListLabel:
               CatalogProductList.updateProductList(page);
               break;
           }
        });
    }

} ();
