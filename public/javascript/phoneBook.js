var phoneBook = {
    core: {
        init: function () {
            var createForm = new this.Form(document.getElementById('create-form')),
                personModelHandler = new this.ModelHandler(phoneBook.Model),
                lister = new this.Lister(document.getElementById('list'));
            
            createForm.addValidator(new this.RequiredValidator(document.getElementById('first-name')));
            createForm.addValidator(new this.RequiredValidator(document.getElementById('last-name')));
            createForm.addValidator(new this.PhoneValidator(document.getElementById('phone-number')));
            createForm.addValidator(new this.EmailValidator(document.getElementById('email')));
            createForm.addValidator(new this.RequiredValidator(document.getElementById('address')));
            personModelHandler.sync();
            
            document.addEventListener(
                'phoneBookForm-submit',
                function (event) {
                    personModelHandler.save(new phoneBook.Model(event.form.getValues()))
                },
                false
            );
            document.addEventListener(
                'phoneBookModelHandler-add',
                function (event) {
                    lister.add(event.model);
                },
                false
            );
        }
    }
};

this.addEventListener(
    'load', 
    function () {phoneBook.core.init.call(phoneBook);}, 
    false
);