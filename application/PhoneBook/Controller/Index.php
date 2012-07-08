<?php

namespace PhoneBook\Controller;

class Index extends Controller{
    public function saveAction () {
        $request = $this->getRequest();
        
        if (empty($request)) {
            throw new \RangeException('Request is empty');
        }
        
        $db = new \Lib\Database\Mysql(
            MYSQL_HOST, 
            MYSQL_USER, 
            MYSQL_PASS, 
            MYSQL_DB
        );

        $person = new \PhoneBook\Model\Person($db);
        $insertId = $person->insert(
            $this->getRequestValue('firstName'), 
            $this->getRequestValue('lastName'), 
            $this->getRequestValue('phone'), 
            $this->getRequestValue('email'), 
            $this->getRequestValue('address')
        );
        
        $this->sendHeader(201, 'Created', 'Person created with ID ' . $insertId);
    }
    
    public function allAction () {
        $idList = $this->getRequestValue('idList');
        if (empty($idList)) {
            $idList = '0';
        }
        
        $db = new \Lib\Database\Mysql(
            MYSQL_HOST, 
            MYSQL_USER, 
            MYSQL_PASS, 
            MYSQL_DB
        );

        $person = new \PhoneBook\Model\Person($db);
        
        $timelimit = time() + 20;
        
        do {
            sleep(0.1);
            $result = $person->getAll($idList);
        } while($result->num_rows === 0 && time() < $timelimit);
        
        $rows = array();
        while ($row = $result->fetch_object()) {
            $rows[] = $row;
        }
        
        header("Content-Type: application/x-javascript; charset=utf-8");
        
        $this->sendHeader(200, 'OK', json_encode($rows));
    }
}