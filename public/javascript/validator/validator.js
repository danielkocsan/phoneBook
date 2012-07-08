(function (PB, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }

    PB.Validator = function (element) {
        this.element = element;

        if (typeof element !== 'object') {
            throw new Error('phoneBook.Validator first parameter must be an object');
        }

        this.bind();
        
        this.createMessageElement();
    };

    PB.Validator.prototype = {
        validatorMessage: 'This is a Validator constructor, please do not implement',
        
        createMessageElement: function () {
            this.messageElement = document.createElement("div");
            this.element.parentNode.appendChild(this.messageElement);
            this.messageElement.innerHTML = this.validatorMessage;
            this.messageElement.className = 'error-message';
        },
        
        check: function () {
            return false;
        },
        
        validate: function () {
            var result = this.check();
            
            if (result) {
                this.messageElement.className = 'error-message';
            }
            else {
                this.messageElement.className = 'error-message active';
            }
            return result;
        },
        
        handleChange: function (event) {
            this.validate();
        },
        
        bind: function () {
            this.element.addEventListener(
                'keyup',
                (function (that) {
                    return function (event) {that.handleChange(event);};
                }(this))
            );
            this.element.addEventListener(
                'change',
                (function (that) {
                    return function (event) {that.handleChange(event);};
                }(this))
            );
        }
    };
}(phoneBook, document));