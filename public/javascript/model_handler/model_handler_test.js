var myHandler,
    myModel = function() {
        this.getValues = function () {
            return {
                a: 10,
                b: 20
            }
        }
    };

module("phoneBook.ModelHandler");

test(
    'check phoneBook.ModelHandler',
    function() {
        ok(
            typeof phoneBook === 'object',
            'phoneBook namespace is exists'
        );
        ok(
            typeof phoneBook.ModelHandler === 'function',
            'ModelHandler constructor function is exists'
        );
    }    
);


myHandler = new phoneBook.ModelHandler(myModel);

test(
    'create ModelHandler instance',
    function() {
        ok(
            myHandler,
            'ModelHandler instance is created'
        );
        ok(
            myHandler instanceof phoneBook.ModelHandler,
            'modelHandler is instance of phoneBook.ModelHandler'
        );
    }    
);

test(
    'ModelHandler first parameter must be a function',
    function() {
        var myHandler;
        
        try {
            myHandler = new phoneBook.ModelHandler('');
            ok(false, 'exception is not thrown')
        }
        catch (error) {
            if (error instanceof Error) {
                ok(true, 'exception is thrown');
            }
        }
        
        try {
            myHandler = new phoneBook.ModelHandler(myModel);
            ok(true, 'exception is not thrown')
        }
        catch (error) {
            if (error instanceof Error) {
                ok(false, 'exception is thrown');
            }
        }
    }    
);



test(
    'check save function',
    function() {
        var result;
        
        ok(
            myHandler.save,
            'save function is exists'
        );
        ok(
            typeof myHandler.save === 'function',
            'save function is a function'
        );
        
        try {
            myHandler.save('a');
            ok(false, 'exception is not thrown')
        }
        catch (error) {
            if (error instanceof Error) {
                ok(true, 'parameter must be instance of modelFunction');
            }
        }
        
        try {
            myHandler.save(new myModel());
            ok(true, 'parameter must be instance of modelFunction')
        }
        catch (error) {
            if (error instanceof Error) {
                ok(false, 'exception is thrown');
            }
        }
        
        result = myHandler.save(new myModel());
        strictEqual(typeof result, 'object', 'save() result is an object');
    }    
);