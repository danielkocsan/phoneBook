(function (PB, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }
    if (typeof PB.Validator !== 'function') {
        throw new Error('PhoneBook object is not found');
    }

    PB.RequiredValidator = function (element) {
        this.element = element;

        if (typeof element !== 'object') {
            throw new Error('phoneBook.Validator first parameter must be an object');
        }

        this.validatorMessage = 'This field is required',
        this.bind();
        this.createMessageElement();
        
        this.check = function () {
            return this.element.value.length > 0;
        }
    };

    PB.RequiredValidator.prototype = Object.create(PB.Validator.prototype);
}(phoneBook, document));