<?php
class AddMusicController {
    private $pdo;
    private $logger;
    private $music;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/music.log');
        $this->music = new Music();
        $this->logger->log('addMusicController initialized');
    }

    public function ajouterMusic() {
        session_start();
        $this->logger->log('ajouterMusic called');
        $data = json_decode(file_get_contents('php://input'), true);
        $idOrganizer = $_SESSION['user']['id'];
        if (!isset($data['title'], $data['artist'], $data['musicUrl'], $data['genre'])) {
            echo json_encode(['error' => 'Données manquantes']);
            return;
        }

        $response = $this->playlist->addPlaylist($data['title'], $data['artist'], $data['musicUrl'], $data['genre'], $idOrganizer);
        if (!$response['success']) {
            echo json_encode(['error' => 'Erreur lors de l\'ajout de la musique']);
            return;
        }
        echo json_encode(['success' => true, 'message' => 'Musique ajouté avec succès', 'id' => $response['idMusic']]);
    }

    public function supprimerMusic($idMusic) {
        $this->logger->log('supprimerMusic called');
        $response = $this->music->deleteMusic($idMusic);
        if (!$response['success']) {
            echo json_encode(['error' => 'Erreur lors de la suppression de la musique']);
            return;
        }
        echo json_encode(['success' => true, 'message' => 'Musique supprimé avec succès']);
    }
}