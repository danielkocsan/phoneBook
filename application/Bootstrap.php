<?php
$configFilePath = realpath(__DIR__) . '/../config/default.php';
if (!is_file($configFilePath)) {
    throw new \Exception('config file is not found at ' . $configFilePath);
}
require $configFilePath;

set_include_path(implode(PATH_SEPARATOR, array(
    realpath(DIR_APPLICTION),
    get_include_path(),
)));

require DIR_APPLICTION . 'Lib/Autoloader.php';