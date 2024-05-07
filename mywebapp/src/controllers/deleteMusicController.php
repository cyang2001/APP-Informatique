<?php
class DeleteMusicController {
    private $pdo;
    private $logger;
    private $music;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/music.log');
        $this->music = new Music();
        $this->logger->log('addMusicController initialized');
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