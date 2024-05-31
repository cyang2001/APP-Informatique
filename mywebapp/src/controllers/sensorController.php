<?php
require_once __DIR__ . '/../models/SensorModel.php';
require_once __DIR__ . '/../../public/sensor.html';
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
        session_start();
        $_SESSION['sensorData'] = $data;

    }
}

