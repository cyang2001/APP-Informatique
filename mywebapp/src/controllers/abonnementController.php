<?php
require_once __DIR__ . '/../models/users.php';

class AbonnementController {
    private $userModel;
    private $logger;

    public function __construct() {
        $this->userModel = new User();
        $this->logger = new Logger('../logs/abonnement.log');
    }

    public function updateAccessLevel($userId, $accessLevel) {
        $currentUser = $this->userModel->getUser($userId);
        if (!$currentUser) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'User not found']);
            return;
        }


        $this->userModel->updateUserAccessLevel($userId, $accessLevel);

        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user']['accessLevel'] = $accessLevel;

        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }
    
}
