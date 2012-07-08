(function (PB, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }

    PB.Lister = function (element) {
        if (typeof element !== 'object') {
            throw new Error('phoneBook.Form first parameter must be an object');
        }
        
        this.element = element;
    };

    PB.Lister.prototype = {
        items: [],
        add: function (model) {
            var itemElement = doc.createElement('div'),
                listItem,
                instertedItem;
            
            instertedItem = this.element.insertBefore(itemElement, this.element.firstChild);
            this.items.push(listItem);
            
            listItem = new PB.ListItemPerson(model, instertedItem);
            instertedItem.className = 'active';
        }
    };
}(phoneBook, document));