<?php
require_once __DIR__ . '/../config/logger.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../tools/UUIDGenerator.php';
class Forum {
    private $pdo;
    private $logger;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/forum.log');
    }
    public function addForum($forum_id) 
    {
    }

    
}
