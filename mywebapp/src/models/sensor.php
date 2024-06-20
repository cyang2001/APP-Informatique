<?php

use Ramsey\Uuid\Type\Time;

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

    public function getUniqueTimeSensorData(DateTime $timeBegin, DateTime $timeEnd) {
        $sql = "SELECT * FROM sensor WHERE time BETWEEN :timeBegin AND :timeEnd";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'timeBegin' => $timeBegin->format('Y-m-d H:i:s'),
            'timeEnd' => $timeEnd->format('Y-m-d H:i:s')
        ]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
    }
}

