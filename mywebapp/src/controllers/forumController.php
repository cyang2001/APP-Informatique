<?php 
require_once __DIR__ . '/../config/logger.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/forum.php';
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

    public function createPost(){
        $this->logger->log('createPost called');
        $data = json_decode(file_get_contents('php://input'), true);
        $idOrganizer = $_SESSION['user']['id'];
        $userName = $_SESSION['user']['name'];
        $category = NAN;
        $forumURL = '';
        $this->logger->log($data);
        if (!isset($data['title'], $data['description'])) {
            echo json_encode(['error' => 'Données manquantes']);
            $this->logger->log('missing data');
            return;
        }
        $this->forum->createPost($idOrganizer, $data['title'], $data['description'], $forumURL, $category, $userName);
        $this->logger->log('forum created');
    }
}



