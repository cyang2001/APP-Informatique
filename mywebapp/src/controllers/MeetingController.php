<?php
class MeetingController {
    private $pdo;
    private $logger;
    private $meetings;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/meetings.log');
        $this->meetings = new Meetings();
        $this->logger->log('MeetingController initialized');
    }

    public function ajouterEvenement() {
        session_start();
        $this->logger->log('ajouterEvenement called');
        $data = json_decode(file_get_contents('php://input'), true);
        $idOrganizer = $_SESSION['user']['id'];
        if (!isset($data['nom'], $data['date'], $data['heure'], $data['adresse'], $data['description'])) {
            echo json_encode(['error' => 'Données manquantes']);
            return;
        }
        $dateString = $data['date'];
        $pattern = "/(\d{4}-\d{2}-\d{2})/";
        preg_match($pattern, $dateString, $matches);
        $data['date'] = $matches[1];
        $response = $this->meetings->addMeeting($data['nom'], $data['date'], $data['heure'], $data['adresse'], $data['description'], $idOrganizer);
        if (!$response['success']) {
            echo json_encode(['error' => 'Erreur lors de l\'ajout de l\'événement']);
            return;
        }
        echo json_encode(['success' => true, 'message' => 'Événement ajouté avec succès', 'id' => $response['idMeeting']]);
    }

    public function supprimerEvenement($idMeeting) {
        $this->logger->log('supprimerEvenement called');
        $response = $this->meetings->deleteMeeting($idMeeting);
        if (!$response['success']) {
            echo json_encode(['error' => 'Erreur lors de la suppression de l\'événement']);
            return;
        }
        echo json_encode(['success' => true, 'message' => 'Événement supprimé avec succès']);
    }
}
