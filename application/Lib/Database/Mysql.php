<?php
namespace Lib\Database;

class Mysql extends Database {
    private $connection;
    
    public function __construct($host, $user, $password, $db) {
        $this->connection = new \mysqli($host, $user, $password, $db);
        
        if ($this->connection->connect_error) {
            throw new \Exception('Connect Error (' . $this->connection->connect_errno . ') ' . $this->connection->connect_error);
        }
        
        $this->query('SET NAMES UTF8');
    }
    
    public function query($query) {
        $result = $this->connection->query($query);
        
        if ($this->connection->errno) {
            throw new \Exception('Query error with ' . $this->connection->errno . ' ' . $this->connection->error );
        }
        
        return $result;
    }
    
    public function insert($query) {
        $this->query($query);
        
        return $this->connection->insert_id;
    }
    
    public function escape($value) {
        return $this->connection->real_escape_string($value);
    }
}