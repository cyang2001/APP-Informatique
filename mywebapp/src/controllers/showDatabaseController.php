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
        ob_start();
        $this->logger->log('showDatabaseController.showDatabase() called');
        $sql = "SELECT ID_USER, NAME, EMAIL, ID_ACCESS_LEVEL, TICKET FROM USER";
        $stmt = $this->pdo->prepare($sql);
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $this->logger->log('Database query success');
            $this->logger->log(json_encode($result));
            ob_clean();
            echo json_encode($result);
        } else {
            echo json_encode(['error' => 'Database query failed']);
        }
    }
    
    
}