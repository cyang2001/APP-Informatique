<?php
class DeletePlaylistController {
    private $pdo;
    private $logger;
    private $playlist;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/playlist.log');
        $this->playlist = new Playlist();
        $this->logger->log('createPlaylistController initialized');
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