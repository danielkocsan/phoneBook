(function (PB, window, doc) {
    'use strict';
    if (typeof PB !== 'object') {
        throw new Error('PhoneBook object is not found');
    }

    PB.ModelHandler = function (pModelFunction) {
        if (typeof pModelFunction !== 'function') {
            throw new Error('modelFunction parameter must be a function');
        }

        var list = {},
            modelFunction = pModelFunction,
            createAjaxCall = function (type, url, data) {
                var httpRequest,
                    getURIFormat = function (obj) {
                        var string = '',
                            propName,
                            propValue,
                            i = 0;

                        if (typeof data !== 'object') {
                            return data;
                        }

                        for (propName in obj) {
                            if (obj.hasOwnProperty(propName)) {
                                i += 1;
                                propValue = obj[propName];

                                if (i > 1) {
                                    string += '&';
                                }
                                string += encodeURIComponent(propName) + '=' + encodeURIComponent(propValue);
                            }
                        }

                        return string;
                    };

                if (window.XMLHttpRequest) {
                    httpRequest = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }

                httpRequest.open(type, url, true);
                httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequest.send(getURIFormat(data));

                return httpRequest;
            },
            getIdList = function () {
                var count = list.length,
                    id,
                    i = 0,
                    idList = '',
                    model;
                
                for (id in list) {
                    if (list.hasOwnProperty(id)) {
                        i += 1;
                        model = list[id];
                        if (model.id) {
                            if (i > 1) {
                                idList += ',';
                            }
                            idList += id;
                        }
                    }
                }

                return {idList: idList};
            };

        this.save = function (model) {
            var ajaxObject,
                data;

            if (!(model instanceof modelFunction)) {
                throw new Error('ModelHandler.save() first parameter must be instance of modelFunction');
            }

            data = model.getValues();

            ajaxObject = createAjaxCall('POST', PB.config.uri.webapi + 'save', data);

            return ajaxObject;
        };
        
        this.add = function (model) {
            var event;
            
            list[model.id] = model;
            
            event = doc.createEvent("Event");
            event.initEvent("phoneBookModelHandler-add", true, true);
            event.model = model;
            doc.dispatchEvent(event);
        }

        this.sync = function () {
            var data,
                ajaxObject;

            data = getIdList();
            ajaxObject = createAjaxCall('POST', PB.config.uri.webapi + 'all', data);
            ajaxObject.onreadystatechange = (function (httpRequest, that) {
                return function () {
                    if (httpRequest.readyState === 4) {  
                        if (httpRequest.status === 200) {  
                            var response = eval(httpRequest.responseText),
                                count = response.length,
                                i;  
                            
                            for (i = 0; i < count; i += 1) {
                                that.add(new phoneBook.Model(response[i]));
                            }
                        } 
                        else {  
                            console.log('There was a problem with the request.');  
                        }

                        window.setTimeout(
                            (function(modelHandler) {
                                return function () {
                                    modelHandler.sync();
                                }
                            }(that)),
                            1000
                        );
                    }
                }
            }(ajaxObject, this));
        };
    };
}(phoneBook, window, document));