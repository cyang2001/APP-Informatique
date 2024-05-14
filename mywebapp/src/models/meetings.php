<?php 
require_once __DIR__ . '/../config/logger.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../tools/UUIDGenerator.php';
class Meetings {
    private $pdo;
    private $logger;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/meetings.log');
    }

    public function addMeeting($name, $date, $time, $address, $description, $idOrganizer) {
        $idMeeting = UUIDGenerator::generate();
        $sql = "INSERT INTO meetings (ID_MEETING, NAME_MEETING, DATE_MEETING, HOUR_MEETING, ADDRESS, MEETING_DESCRIPTION, ID_ORGANIZER) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idMeeting, $name, $date, $time, $address, $description, $idOrganizer]);
        $this->logger->log("Meeting added: {$idMeeting}-{$name} - {$date} - {$time} - {$address} - {$description}");
        return ['success' => true, 'idMeeting' => $idMeeting];
    }

    public function deleteMeeting($idMeeting) {
        $sql = "DELETE FROM meetings WHERE ID_MEETING = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idMeeting]);
        $this->logger->log("Meeting deleted: {$idMeeting}");
        return ['success' => true];
    } 
}