<?php
require_once __DIR__ . '/../config/database.php';

class Sensor {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
    }

    public function getAllSensorData() {
        $sql = "SELECT date_heure, niveau_sonore FROM donnees_capteurs_sonore";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>