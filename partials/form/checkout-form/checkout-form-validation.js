export default new class CheckoutFormValidation {
    constructor() {
        this.form = '.needs-validation';
        this.wasValidatedClass = 'was-validated';

        this.eventHandlers();
    }

    eventHandlers() {
        if(!$(this.form).length) {
            return;
        }

        const _this = this;
        const forms = $(this.form);

        $.each(forms, function (i, elem) {
           $(elem).on('submit', function() {
               if (elem.checkValidity() === false) {
                   event.preventDefault();
                   event.stopPropagation();
               }
               $(elem).addClass(_this.wasValidatedClass);
               if (elem.checkValidity() === true) {
                   /* TODO: lines below are for backend, please, delete them when backend side is ready  */
                   event.preventDefault();
                   event.stopPropagation();
                   console.log('send request');
               }
           });
        });
    }

} ();
