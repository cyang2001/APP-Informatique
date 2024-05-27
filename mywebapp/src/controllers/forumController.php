<?php 

class ForumController {
    private $pdo;
    private $logger;
    private $forum;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/forum.log');
        $this->forum = new Forum();
        $this->logger->log('forumController initialized');
    }

    }
    public function createPost(){
        session_start();
        $this->logger->log('createPost called');
        $data = json_decode(file_get_contents('php://input'), true);
        $idOrganizer = $_SESSION['user']['id'];
        if (!isset($data['title'], $data['description'], $data['file'], $data['userName'], $data['category'])) {
            echo json_encode(['error' => 'Données manquantes']);
            return;
    }
 



