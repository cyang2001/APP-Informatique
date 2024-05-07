<?php
class Music {
    private $pdo;
    private $logger;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/music.log');
    }

    public function addMusic($title, $artist, $musicUrl, $genre, $duration, $idOrganizer) {
        $idMusic = UUIDGenerator::generate();
        $sql = "INSERT INTO music (ID_TRACKS, TITLE, ARTIST, MUSIC_URL, GENRE, DURATION, ID_ORGANIZER) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idMusic, $title, $artist, $musicUrl, $genre, $duration, $idOrganizer]);
        $this->logger->log("Music added: {$idMusic}-{$title} - {$artist} - {$musicUrl} - {$genre}");
        return ['success' => true, 'idMusic' => $idMusic];
    }

    public function deleteMusic($idMusic) {
        $sql = "DELETE FROM music WHERE ID_TRACKS = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idMusic]);
        $this->logger->log("Music deleted: {$idMusic}");
        return ['success' => true];
    } 
}