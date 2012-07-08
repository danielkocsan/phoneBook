<?php
namespace PhoneBook\Model;

class Model {
    protected $db = null;

    public function __construct(\Lib\Database\Database $db) {
        $this->db = $db;
    }
}