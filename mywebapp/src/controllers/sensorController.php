<?php
require_once __DIR__ . '/../models/SensorModel.php';

class SensorController {
    private $sensorModel;

    public function __construct() {
        $this->sensorModel = new Sensor();
    }

    public function getAllSensorData() {
        return $this->sensorModel->getAllSensorData();
    }
    public function displaySensorData() {
        $data = $this->getAllSensorData();
        include __DIR__ . '/../../public/sensor.html';
    }
}
?>
