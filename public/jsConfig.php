<?php

header("Content-Type: application/x-javascript; charset=utf-8");

require realpath(__DIR__) . '/../config/default.php';

print "phoneBook.config =";
print 
    json_encode(
        array(
            'uri' => array(
                'webapi' => URI_API
            )
        ), 
        JSON_FORCE_OBJECT
    );
print ";";