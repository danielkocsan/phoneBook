<?php
namespace PhoneBook\Controller;

class Controller {
    protected $request = array();


    public function __construct() {
        $this->request = array_merge($_POST, $_GET);
    }

    public function getRequest() {
        return $this->request;
    }

    public function setRequest($valueArray) {
        $this->request = $valueArray;
    }
    
    public function getRequestValue($key, $defaultValue = '') {
        $result = $defaultValue;
        
        if (isset($this->request[$key])) {
            $result = $this->request[$key];
        }
        
        return $result;
    }
    
    protected function sendHeader($statusCode, $message, $body) {
        header($_SERVER['SERVER_PROTOCOL'] . $message, true, $statusCode);
        
        if (!empty($body)) {
            print $body;
        }
        
        exit;
    }
}