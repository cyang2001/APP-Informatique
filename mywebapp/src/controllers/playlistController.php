<?php


class PlaylistController {
    private $pdo;
    private $logger;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/playlist.log');
    }

    public function getPlaylists() {
        $sql = "SELECT * FROM PLAY_LIST";
        $stmt = $this->pdo->query($sql);
        $playlists = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($playlists);
    }
}
?>
