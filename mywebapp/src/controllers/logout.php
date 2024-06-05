<?php
class logoutController {
    private $logger;
    public function __construct() {
        $this->logger = new Logger('../logs/logout.log');
        $this->logger->log('logoutController constructor initialized');
    }
    function logout() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION = array();
        header('Content-Type: application/json');
        echo json_encode(array('message' => 'Logged out successfully'));
        session_destroy();
        $this->logger->log('Logged out successfully');
    }
}

