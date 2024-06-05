<?php
class CreatePlaylistController {
    private $pdo;
    private $logger;
    private $playlist;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/playlist.log');
        $this->playlist = new Playlist();
        $this->logger->log('createPlaylistController initialized');
    }

    public function ajouterPlaylist() {
        session_start();
        $this->logger->log('ajouterPlaylist called');
        $data = json_decode(file_get_contents('php://input'), true);
        $idOrganizer = $_SESSION['user']['id'];
        if (!isset($data['nom'], $data['description'], $data['imageUrl'])) {
            echo json_encode(['error' => 'Données manquantes']);
            return;
        }

        $response = $this->playlist->addPlaylist($data['nom'], $data['description'], $data['imageUrl'], $idOrganizer);
        if (!$response['success']) {
            echo json_encode(['error' => 'Erreur lors de l\'ajout de la playlist']);
            return;
        }
        echo json_encode(['success' => true, 'message' => 'Playlist ajouté avec succès', 'id' => $response['idPlaylist']]);
    }

    public function supprimerPlaylist($idPlaylist) {
        $this->logger->log('supprimerPlaylist called');
        $response = $this->playlist->deletePlaylist($idPlaylist);
        if (!$response['success']) {
            echo json_encode(['error' => 'Erreur lors de la suppression de la playlist']);
            return;
        }
        echo json_encode(['success' => true, 'message' => 'Playlist supprimé avec succès']);
    }
}