<?php
require_once __DIR__ . '/../models/sensor.php';

class SensorController_ {
    private $sensor;

    public function __construct() {
        $this->sensor = new Sensor();
    }

    public function getAllSensorData() {
        $data = $this->sensor->getAllSensorData();
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

