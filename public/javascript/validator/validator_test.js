var myValidator,
    myElement = document.getElementById('myInput');

module("phoneBook.Validator");

test(
    'check phoneBook.Validator',
    function () {
        ok(
            typeof phoneBook === 'object',
            'phoneBook namespace is exists'
        );
        ok(
            typeof phoneBook.Validator === 'function',
            'Model constructor function is exists'
        );
    }
);


myValidator = new phoneBook.Validator(myElement);

test(
    'create ModelHandler instance',
    function () {
        ok(
            myValidator,
            'myValidator instance is created'
        );
        ok(
            myValidator instanceof phoneBook.Validator,
            'myValidator is instance of phoneBook.Validator'
        );
    }    
);

test(
    'Model first parameter must be an object',
    function () {
        var myValidator;

        try {
            myValidator = new phoneBook.Validator('');
            ok(false, 'exception is not thrown');
        } catch (error) {
            if (error instanceof Error) {
                ok(true, 'exception is thrown');
            }
        }

        try {
            myValidator = new phoneBook.Validator(myElement);
            ok(true, 'exception is not thrown');
        } catch (error) {
            if (error instanceof Error) {
                ok(false, 'exception is thrown');
            }
        }
    }
);