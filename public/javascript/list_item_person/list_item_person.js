(function (PB, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }

    PB.ListItemPerson = function (model, element) {
       if (typeof model !== 'object') {
           throw new Error('fitst parameter must be a model in ListItemPerson constructor');
       }
       if (typeof element !== 'object') {
           throw new Error('secound parameter must be a DOM node');
       }
       
       this.model = model;
       this.element = element;
       
       this.createContent();
    };

    PB.ListItemPerson.prototype = {
        createContent: function() {
            this.element.innerHTML = '' +
                '<section class="name">' +
                    '<span class="firstName">' + this.model.firstName + '</span>' +
                    '<span class="lastName">' + this.model.lastName + '</span>' +
                '</section>' +
                '<span class="phone">' + this.model.phone + '</span>' +
                '<span class="email"><a href="mailto:' + this.model.email + '">' + this.model.email + '</a></span>' +
                '<address>' + this.model.address + '</address>' +
            '';
        }
    };
}(phoneBook, document));