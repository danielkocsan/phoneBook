<?php
namespace Lib;

class Autoloader {
    static function loadClass($className) {
        $className = str_replace(array('/', '\\'), DIRECTORY_SEPARATOR, $className);

        $filename = $className . '.php';

        include $filename;
    }
    static function register () {
        spl_autoload_register("\Lib\Autoloader::loadClass");
    }
    static function unregister () {
        spl_autoload_unregister("\Lib\Autoloader::loadClass");
    }
}

Autoloader::register();