<?php
namespace PhoneBook;

class Routing {
    public static function init () {
        $uriParameters = explode( '/', $_SERVER['REQUEST_URI']);
        $parameterCount = count($uriParameters);

        if ($parameterCount < 1) {
            throw new \Exception('action parameter is not set');
        }
        
        $actionPart = $uriParameters[$parameterCount - 1];
        $methodName = $actionPart . 'Action';

        $controller = new \PhoneBook\Controller\Index();
        
        if (method_exists($controller, $methodName)) {
            call_user_method($methodName, $controller);
        }
        else {
            throw new \Exception('called method not exists ' . $actionPart);
        }
    }
}

require realpath(__DIR__) . '/../application/Bootstrap.php';

try {
    Routing::init();
} catch (\Exception $e) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    print $e->getMessage();
}