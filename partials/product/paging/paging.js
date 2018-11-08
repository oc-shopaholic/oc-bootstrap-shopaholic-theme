export default new class Paging {
    constructor() {
       this.btnPage = '.page-link';

        this.eventHandlers();
    }

    eventHandlers() {
        if(!$(this.btnPage).length) {
            return;
        }

        const _this = this;

        $(document).on('click', this.btnPage, function (e) {
           e.preventDefault();
           console.log('go to other page');
        });
    }

} ();
