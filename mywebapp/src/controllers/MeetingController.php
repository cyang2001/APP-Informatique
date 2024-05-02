<?php

class MeetingController {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
    }

    public function ajouterEvenement() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['nom'], $data['date'], $data['heure'], $data['adresse'], $data['description'])) {
            echo json_encode(['error' => 'Données manquantes']);
            return;
        }

        $stmt = $this->pdo->prepare("INSERT INTO meetings (nom, date, heure, adresse, description) VALUES (:nom, :date, :heure, :adresse, :description)");
        $stmt->bindParam(':nom', $data['nom']);
        $stmt->bindParam(':date', $data['date']);
        $stmt->bindParam(':heure', $data['heure']);
        $stmt->bindParam(':adresse', $data['adresse']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Événement ajouté avec succès']);
    }

    public function supprimerEvenement() {
        $id = $_GET['id'];

        $stmt = $this->pdo->prepare("DELETE FROM meetings WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Événement supprimé avec succès']);
    }
}
?>