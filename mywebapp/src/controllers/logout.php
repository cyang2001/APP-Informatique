<?php
class logoutController {
    private $logger;
    public function __construct() {
        $this->logger = new Logger('../logs/logout.log');
        $this->logger->log('logoutController constructor initialized');
    }
    function logout() {
        session_start();
        session_destroy();
        header('Content-Type: application/json');
        echo json_encode(array('message' => 'Logged out successfully'));
        $this->logger->log('Logged out successfully');
    }
}

