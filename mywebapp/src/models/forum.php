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
        $this->logger->log('Forum initialized');
    }
    //fonction pour créer les posts et les ajouter a la base de donnée
    public function createPost($idCreator, $title, $description, $fileURL, $category, $userName) {
        $this->logger->log('createPost called');
        $idPost = UUIDGenerator::generate();
        $sql = "INSERT INTO forum (ID_FORUM, ID_CREATOR, NAME_CATEGORY, FORUM_TITRE, FORUM_DESCRIPTION, FORUM_URL_FICHIR, CREATOR_NAME) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idPost, $idCreator, $category, $title, $description, $fileURL, $userName]);
        $this->logger->log ("Post added: {$idPost} - {$title} - {$description} - {$fileURL} - {$category} - {$userName}");
        return ['success' => true, 'idPost' => $idPost];
    }
    //fonction pour recupérer les posts dans la bases de données
    public function getPost($idPost) {
        $sql = "INSERT INTO forum (ID_POST)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idPost]);
        $this->logger->log ("Post added: {$idPost}");
        return ['success' => true, 'idPost' => $idPost];
    }

    //fonction pour ajouter les posts sur la page
    public function addPost($idPost) {
        $sql = "INSERT INTO forum (ID_POST)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idPost]);
        $this->logger->log ("Post added: {$idPost}");
        return ['success' => true, 'idPost' => $idPost];
    }

    
}
