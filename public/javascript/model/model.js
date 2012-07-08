(function (PB, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }

    PB.Model = function (values) {
        var pName,
            event,
            pObject = values;

        if (typeof pObject !== 'object') {
            throw new Error('phoneBook.Model first parameter must be an object');
        }

        for (pName in pObject) {
            if (pObject.hasOwnProperty(pName)) {
                (function (propertyName) {
                    this.__defineSetter__(propertyName, function (val) {
                        if (typeof val === 'function') {
                            throw new Error('model property value type must be primitive or object - ' + typeof val + ' is set');
                        }
                        this.properties[propertyName] = val;

                        var event = doc.createEvent("Event");
                        event.initEvent("phoneBookModelSet", true, true);
                        event.value = val;
                        event.name = propertyName;
                        doc.dispatchEvent(event);
                    });
                    this.__defineGetter__(propertyName, function () {
                        return this.properties[propertyName];
                    });
                }).call(this, pName);

                this[pName] = pObject[pName];
            }
        }
        
        event = doc.createEvent("Event");
        event.initEvent("phoneBookModelCreate", true, true);
        event.model = this;
        doc.dispatchEvent(event);
    };
    
    PB.Model.prototype = {
        properties: {},
        getValues: function () {
            return this.properties;
        }
    };
}(phoneBook, document));