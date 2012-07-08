(function (PB, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }
    if (typeof PB.Validator !== 'function') {
        throw new Error('PhoneBook object is not found');
    }

    PB.PhoneValidator = function (element) {
        this.element = element;

        if (typeof element !== 'object') {
            throw new Error('phoneBook.Validator first parameter must be an object');
        }

        this.validatorMessage = 'This field format is +36 20 999 88 77',
        this.bind();
        this.createMessageElement();
        
        this.check = function () {
            var reg = /^(\+36)[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
            return reg.test(this.element.value);
        }
    };

    PB.PhoneValidator.prototype = Object.create(PB.Validator.prototype);
}(phoneBook, document));