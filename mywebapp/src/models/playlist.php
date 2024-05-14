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
        $sql = "INSERT INTO playlist (ID_PLAY_LIST, NAME_PLAY_LIST, PLAY_LIST_DESCRIPTION, IMAGE_URL_PLAY_LIST, ID_ORGANIZER) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idMeeting, $name, $date, $time, $address, $description, $idOrganizer]);
        $this->logger->log("Meeting added: {$idMeeting}-{$name} - {$date} - {$time} - {$address} - {$description}");
        return ['success' => true, 'idMeeting' => $idMeeting];
    }
}