var myModel,
    myObject = {
        a: 10,
        b: 'testValue'
    },
    testValues = {
        a: 'a new value',
        b: 12,
        c: 23
    };

module("phoneBook.ModelHandler");

test(
    'check phoneBook.ModelHandler',
    function () {
        ok(
            typeof phoneBook === 'object',
            'phoneBook namespace is exists'
        );
        ok(
            typeof phoneBook.Model === 'function',
            'Model constructor function is exists'
        );
    }
);


myModel = new phoneBook.Model(myObject);

test(
    'create ModelHandler instance',
    function () {
        ok(
            myModel,
            'myModel instance is created'
        );
        ok(
            myModel instanceof phoneBook.Model,
            'myModel is instance of phoneBook.Model'
        );
    }    
);

test(
    'Model first parameter must be an object',
    function () {
        var myModel;

        try {
            myModel = new phoneBook.Model('');
            ok(false, 'exception is not thrown');
        } catch (error) {
            if (error instanceof Error) {
                ok(true, 'exception is thrown');
            }
        }

        try {
            myModel = new phoneBook.Model(myObject);
            ok(true, 'exception is not thrown');
        } catch (error) {
            if (error instanceof Error) {
                ok(false, 'exception is thrown');
            }
        }
    }
);

test(
    'test model getters',
    function () {
        strictEqual(myModel.a, 10, 'a property is 10');
        strictEqual(myModel.b, 'testValue', 'b property is "testValue"');
        
        try {
            myModel.a = function () {};
            ok(false, 'exception is not thrown when function typed value is set');
        } catch (error) {
            if (error instanceof Error) {
                ok(true, 'exception is thrown when function typed value is set');
            }
        }
    }
);

test(
    'test model setters',
    function () {
        myModel.a = testValues.a;
        strictEqual(myModel.a, testValues.a, 'property c is setted and getted');
    }
);

test(
    'test model setter events',
    function () {
        document.addEventListener(
            'phoneBookModelSet',
            function (event) {
                equal(event.type, 'phoneBookModelSet', 'event is triggered');
                start();
            },
            false
        );

        stop();
        myModel.a = testValues.b;
    }
);

test(
    'test getValues()',
    function () {
        var values;
        
        strictEqual(typeof myModel.getValues, 'function', 'function exists');
        
        myModel.a = myObject.a;
        myModel.b = myObject.b;
        
        values = myModel.getValues();
        strictEqual(typeof values, 'object', 'return value is and object');
        strictEqual(values.a, myObject.a, 'property a is OK');
        strictEqual(values.b, myObject.b, 'property b is OK');
    }
);

test(
    'test model create event',
    function () {
        document.addEventListener(
            'phoneBookModelCreate',
            function (event) {
                equal(event.type, 'phoneBookModelCreate', 'event is triggered');
                start();
            },
            false
        );

        stop();
        myModel = new phoneBook.Model(myObject);
    }
);