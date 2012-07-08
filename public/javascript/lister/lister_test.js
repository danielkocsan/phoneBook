var myLister,
    myElement = document.getElementById('myList');

module("phoneBook.Lister");

test(
    'check phoneBook.Lister',
    function () {
        ok(
            typeof phoneBook === 'object',
            'phoneBook namespace is exists'
        );
        ok(
            typeof phoneBook.Lister === 'function',
            'Model constructor function is exists'
        );
    }
);


myLister = new phoneBook.Lister(myElement);

test(
    'create ModelHandler instance',
    function () {
        ok(
            myLister,
            'myLister instance is created'
        );
        ok(
            myLister instanceof phoneBook.Lister,
            'myLister is instance of phoneBook.Lister'
        );
    }    
);

test(
    'Model first parameter must be an object',
    function () {
        var myLister;

        try {
            myLister = new phoneBook.Lister('');
            ok(false, 'exception is not thrown');
        } catch (error) {
            if (error instanceof Error) {
                ok(true, 'exception is thrown');
            }
        }

        try {
            myLister = new phoneBook.Lister(myElement);
            ok(true, 'exception is not thrown');
        } catch (error) {
            if (error instanceof Error) {
                ok(false, 'exception is thrown');
            }
        }
    }
);