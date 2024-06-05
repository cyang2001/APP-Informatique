<?php
class Music {
    private $pdo;
    private $logger;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/music.log');
    }

    public function addMusic($title, $artist, $musicUrl, $genre, $duration) {
        $idMusic = UUIDGenerator::generate();
        $sql = "INSERT INTO MUSIC_TRACKS (ID_TRACK, TITLE, ARTIST, MUSIC_URL, GENRE, DURATION) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idMusic, $title, $artist, $musicUrl, $genre, $duration]);
        $this->logger->log("Music added: {$idMusic}-{$title} - {$artist} - {$musicUrl} - {$genre}");
        return ['success' => true, 'idMusic' => $idMusic];
    }

    public function deleteMusic($idMusic) {
        $sql = "DELETE FROM MUSIC_TRACKS WHERE ID_TRACK = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idMusic]);
        $this->logger->log("Music deleted: {$idMusic}");
        return ['success' => true];
    } 
}

