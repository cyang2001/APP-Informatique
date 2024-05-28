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
        session_start();
        $this->logger->log('createPost called');
        $data = json_decode(file_get_contents('php://input'), true);
        $idOrganizer = $_SESSION['user']['id'];
        $userName = $_SESSION['user']['name'];
        $category = NAN;
        $forumURL = '';
        // ToDo ajouter file
        // ToDo vérifier si les données sont présentes
        #if (!isset($data['title'], $data['description'])) {
        #    echo json_encode(['error' => 'Données manquantes']);
        #    return;

        // ToDo ajouter les donnes à la base de données
        // ToDo oublier pas le category
        $this->forum->createPost($idOrganizer, $data['title'], $data['description'], $forumURL, $category, $userName);
    }
}



