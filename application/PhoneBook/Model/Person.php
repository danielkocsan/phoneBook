<?php
namespace PhoneBook\Model;

class Person extends Model{
    private $tableName = 'person';
    
    public function insert (
        $firstName,
        $lastName,
        $phone,
        $email,
        $address
    ) {
        
        $query = "
            INSERT INTO `%s`
            (
                `firstName`,
                `lastName`,
                `phone`,
                `email`,
                `address`
            )
            VALUES
            (
                '%s',
                '%s',
                '%s',
                '%s',
                '%s'
            );
        ";
        
        
        $query = 
            sprintf(
                $query,
                $this->tableName,
                $this->db->escape($firstName),
                $this->db->escape($lastName),
                $this->db->escape($phone),
                $this->db->escape($email),
                $this->db->escape($address)
            );
        
        return $this->db->insert($query);
    }
    
    public function getAll($idList) {
        $query = "
            SELECT  * 
            FROM    `%s`
            WHERE   `id` NOT IN (%s);
        ";
        
        $query = 
            sprintf(
                $query,
                $this->tableName,
                $this->db->escape($idList)
            );
        
        return $this->db->query($query);
    }
}