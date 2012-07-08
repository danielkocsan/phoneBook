<?php

namespace PhoneBook\Controller;

class IndexTest extends \PHPUnit_Framework_TestCase {

    protected $object;

    protected function setUp() {
        $this->object = new Index;
    }

    protected function tearDown() {
        
    }

    /**
     * @expectedException \RangeException
     */
    public function testSaveActionThowsExceptionIfRequestIsEmpty() {
        $this->object->setRequest(array());
        $this->object->saveAction();
    }

}