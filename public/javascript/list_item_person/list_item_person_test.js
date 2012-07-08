var myListItem,
    myModel = function() {
        this.getValues = function () {
            return {
                a: 10,
                b: 20
            }
        }
    };

module("phoneBook.ListItemPerson");

test(
    'check phoneBook.ListItemPerson',
    function () {
        ok(
            typeof phoneBook === 'object',
            'phoneBook namespace is exists'
        );
        ok(
            typeof phoneBook.ListItemPerson === 'function',
            'Model constructor function is exists'
        );
    }
);


myListItem = new phoneBook.ListItemPerson(new myModel());

test(
    'create ModelHandler instance',
    function () {
        ok(
            myListItem,
            'myLister instance is created'
        );
        ok(
            myListItem instanceof phoneBook.ListItemPerson,
            'myLister is instance of phoneBook.ListItemPerson'
        );
    }    
);

test(
    'ListItem first parameter must be an instence of phoneBook.Model',
    function() {
        var myListItem;
        
        try {
            myListItem = new phoneBook.ListItemPerson('');
            ok(false, 'exception is not thrown')
        }
        catch (error) {
            if (error instanceof Error) {
                ok(true, 'exception is thrown');
            }
        }
        
        try {
            myListItem = new phoneBook.ListItemPerson(new myModel());
            ok(true, 'exception is not thrown')
        }
        catch (error) {
            if (error instanceof Error) {
                ok(false, 'exception is thrown');
            }
        }
    }    
);