(function (PB, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }
    if (typeof PB.Validator !== 'function') {
        throw new Error('PhoneBook object is not found');
    }

    PB.EmailValidator = function (element) {
        this.element = element;

        if (typeof element !== 'object') {
            throw new Error('phoneBook.Validator first parameter must be an object');
        }

        this.validatorMessage = 'This field must be an email address',
        this.bind();
        this.createMessageElement();
        
        this.check = function () {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return reg.test(this.element.value);
        }
    };

    PB.EmailValidator.prototype = Object.create(PB.Validator.prototype);
}(phoneBook, document));