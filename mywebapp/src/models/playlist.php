<?php
class Playlist {
    private $pdo;
    private $logger;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/playlist.log');
    }

    public function addPlaylist($name, $description, $imageUrl, $idOrganizer) {
        $idPlaylist = UUIDGenerator::generate();
        $sql = "INSERT INTO PLAY_LIST (ID_PLAY_LIST, NAME_PLAY_LIST, PLAY_LIST_DESCRIPTION, IMAGE_URL_PLAY_LIST, ID_ORGANIZER) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idPlaylist, $name, $description, $imageUrl, $idOrganizer]);
        $this->logger->log("Playlist added: {$idPlaylist}-{$name} - {$description} - {$imageUrl}");
        return ['success' => true, 'idPlaylist' => $idPlaylist];
    }

    public function deletePlaylist($idPlaylist) {
        $sql = "DELETE FROM PLAY_LIST WHERE ID_PLAY_LIST = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idPlaylist]);
        $this->logger->log("Playlist deleted: {$idPlaylist}");
        return ['success' => true];
    } 

    public function addMusicToPlaylist($idPlaylist, $idMusic) {
        $sql = "INSERT INTO PLAY_LIST_TRACKS (ID_PLAY_LIST, ID_TRACK) VALUES (?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idPlaylist, $idMusic]);
        $this->logger->log("Music {$idMusic} added to playlist {$idPlaylist}");
        return ['success' => true];
    }
}
