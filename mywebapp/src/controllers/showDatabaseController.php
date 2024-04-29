<?php
require_once __DIR__ .'/../config/logger.php';

header('Content-Type: application/json');
class showDatabaseController {
    private $logger;
    private $pdo;
    public function __construct() {
        $this->logger = new Logger('../logs/showDatabase.log'); 
        $this->logger->log('showDatabaseController initialized');
        $this->pdo = Database::getInstance()->getConnection();
    }
    function showDatabase() {
        $this->logger->log('showDatabaseController.showDatabase() called');
        $sql = "SELECT * FROM USER";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        echo json_encode($result);
    }
}