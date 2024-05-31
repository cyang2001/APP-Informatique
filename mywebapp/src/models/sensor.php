<?php
require_once __DIR__ . '/../config/database.php';

class Sensor {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
    }

    public function getAllSensorData() {
        $sql = "SELECT * FROM sensor";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

