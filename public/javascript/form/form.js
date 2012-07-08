(function (PB, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }

    PB.Form = function (element) {
        this.element = element;

        if (typeof element !== 'object') {
            throw new Error('phoneBook.Form first parameter must be an object');
        }

        this.bind();
    };

    PB.Form.prototype = {
        getValues: function () {
            var elements = this.element.elements,
                count = elements.length,
                i,
                values = {},
                element;
            
            for (i = 0; i < count; i++) {
                element = elements[i];
                
                if (element.name) {
                    values[element.name] = element.value;
                }
            }
            
            return values;
        },
        
        handleSubmit: function (event) {
            var values,
                myEvent;
            
            event.preventDefault();
            
            if (this.validate()) {
                myEvent = doc.createEvent("Event");
                myEvent.initEvent("phoneBookForm-submit", true, true);
                myEvent.form = this;
                doc.dispatchEvent(myEvent);
                this.element.reset();
            }
        },
        
        bind: function () {
            this.element.addEventListener(
                'submit',
                (function (that) {
                    return function (event) {that.handleSubmit(event);};
                }(this))
            );
        },
        
        validators: [],
        
        addValidator: function (validator) {
            if (typeof validator !== 'object') {
                throw new Error('phoneBook.Form.addValidator() first parameter must be a Validator object');
            }
            
            this.validators.push(validator);
        },
        
        validate: function () {
            var result = true,
                i,
                count = this.validators.length,
                validator;
            
            for (i = 0; i < count; i += 1) {
                validator = this.validators[i];
                if (validator.validate) {
                    if (!validator.validate()) {
                        result = false;
                    }
                }
            }
            
            return result;
        }
    };
}(phoneBook, document));