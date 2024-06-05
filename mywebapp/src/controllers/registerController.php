<?php

require_once __DIR__ . '/../models/users.php'; 
require_once __DIR__ .'/../config/logger.php';
header('Content-Type: application/json');

class RegisterController {
    private $users;
    private $logger;

    public function __construct() {
        $this->users = new User();
        $this->logger = new Logger('../logs/register.log'); 
        $this->logger->log('RegisterController initialized');
    }

    function register() {
    $this->logger->log('Registering user');
    $userName = $_POST['name'];
    $userPassword = $_POST['password'];
    $userEmail = $_POST['email'];
    $confirmPassword = $_POST['confirmPassword'];

    if ($userPassword != $confirmPassword) {
        http_response_code(400); 
        $response = [
            'success' => false,
            'message' => 'Password and confirmPassword do not match'
        ];
        $this->logger->log("Password and confirmPassword do not match: {$userEmail}");
        echo json_encode($response);
        return; 
    }

    $defaultAvatarPath = 'source/avatars/default.jpg'; 

    $registrationResult = $this->users->register($userName, $userPassword, $userEmail, $defaultAvatarPath);
    if ($registrationResult['success']) {
        http_response_code(200);
        $this->logger->log("User registered: {$userEmail} - {$userName}");
        $response = [
            'success' => true,
            'message' => 'User registered successfully'
        ];
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $userId = $registrationResult['userId'];
        $responseTemp = $this->users->getUser($userId);
        $_SESSION['user'] = [
            'id' => $responseTemp['ID_USER'],
            'email' => $userEmail,
            'name' => $responseTemp['NAME_USER'],
            'accessLevel' => $responseTemp['ID_ACCESS_LEVEL']
        ];
        echo json_encode($response);
    } else {
        http_response_code(400); 
        echo json_encode([
            'success' => false,
            'message' => $registrationResult['message']
        ]);
    }
}
}
