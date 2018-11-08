export default new class Sorting {
    constructor() {
        this.sortingSelector = '.sorting';
        this.sortingSelectSelector = '.sorting__select';

        this.eventHandlers();
    }

    eventHandlers() {
        if(!$(this.sortingSelector).length) {
            return;
        }

        const _this = this;

        $(document).on('change', _this.sortingSelectSelector, function () {
            console.log('sorted by...');
        });
    }

} ();
