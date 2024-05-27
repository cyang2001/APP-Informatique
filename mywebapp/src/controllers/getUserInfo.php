<?php
class getUserInfo {
    private $logger;
    public function __construct() {
        $this->logger = new Logger('../logs/getUserInfo.log');
        $this->logger->log('getUserInfo constructor initialized');
    }
    function getUserInfo() {
    session_start();
    header('Content-Type: application/json');
    if(isset($_SESSION['user'])) {
        echo json_encode($_SESSION['user']);
        $this->logger->log('User info retrieved');
        $this->logger->log(json_encode($_SESSION['user']));
    } else {
        echo json_encode(array('message' => 'Unafuthorized'));
        $this->logger->log('Unauthorized');
    }
    }
}
