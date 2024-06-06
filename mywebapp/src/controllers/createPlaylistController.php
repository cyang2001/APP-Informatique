<?php
class CreatePlaylistController {
    private $playlist;
    private $music;
    private $logger;

    public function __construct() {
        $this->playlist = new Playlist();
        $this->music = new Music();
        $this->logger = new Logger('../logs/playlist.log');
        $this->logger->log('createPlaylistController initialized');
    }

    public function addPlaylistAndMusic() {
        $this->logger->log('addPlaylistAndMusic called');

        $idOrganizer = $_SESSION['user']['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $title = $_POST['title'];
        $artist = $_POST['artist'];
        $genre = $_POST['genre'];

        // Ensure the upload directories exist
        $coverDir = '../public/source/covers/';
        $musicDir = '../public/source/music/';

        if (!is_dir($coverDir)) {
            mkdir($coverDir, 0777, true);
        }
        if (!is_dir($musicDir)) {
            mkdir($musicDir, 0777, true);
        }

        // Save cover image
        $cover = $_FILES['cover'];
        $coverPath = $coverDir . basename($cover['name']);
        move_uploaded_file($cover['tmp_name'], $coverPath);

        // Save music file
        $music = $_FILES['music'];
        $musicPath = $musicDir . basename($music['name']);
        move_uploaded_file($music['tmp_name'], $musicPath);

        // Dummy duration value, should calculate real duration
        $duration = '00:03:30';

        // Add playlist to database
        $playlistResponse = $this->playlist->addPlaylist($name, $description, $coverPath, $idOrganizer);

        if ($playlistResponse['success']) {
            // Add music to database
            $musicResponse = $this->music->addMusic($title, $artist, $musicPath, $genre, $duration);

            if ($musicResponse['success']) {
                // Add music to playlist
                $addMusicToPlaylistResponse = $this->playlist->addMusicToPlaylist($playlistResponse['idPlaylist'], $musicResponse['idMusic']);

                if ($addMusicToPlaylistResponse['success']) {
                    echo json_encode(['success' => true, 'message' => 'Playlist et musique ajoutées avec succès']);
                } else {
                    echo json_encode(['error' => 'Erreur lors de l\'ajout de la musique à la playlist']);
                }
            } else {
                echo json_encode(['error' => 'Erreur lors de l\'ajout de la musique']);
            }
        } else {
            echo json_encode(['error' => 'Erreur lors de l\'ajout de la playlist']);
        }
    }
}
