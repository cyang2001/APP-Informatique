<?php
require_once __DIR__ . '/../models/users.php';
require_once __DIR__ .'/../config/logger.php';
header('Content-Type: application/json');
class renewPasswordController {
    private $logger;
    private $users;
    public function __construct() {
        $this->logger = new Logger('../logs/renewPassword.log'); 
        $this->logger->log('renewPasswordController initialized');
        $this->users = new User();
    }
    function verification() {
        $this->logger->log('Verifying email');
        $code = $_POST['code'];
        $verifyEmailResult = $this->users->verifyEmail($code);
        if ($verifyEmailResult['success']) {
            http_response_code(200);
            $this->logger->log('Email verified');
            $response = [
                'success' => true,
                'message' => 'Email verified successfully'
            ];
            echo json_encode($response);
        } else {
            http_response_code(400); 
            echo json_encode([
                'success' => false,
                'message' => 'Invalid code'
            ]);
        }
    }
    function renewPassword() {
        $this->logger->log('Renewing password');
        $userEmail = $_POST['email'];
        $newPassword = $_POST['newPassword'];
        $confirmPassword = $_POST['confirmPassword'];
        if ($newPassword != $confirmPassword) {
            http_response_code(400); 
            $response = [
                'success' => false,
                'message' => 'Password and confirmPassword do not match'
            ];
            $this->logger->log("Password and confirmPassword do not match: {$userEmail}");
            echo json_encode($response);
            return; 
        }
        $renewPasswordResult = $this->users->renewPassword($userEmail, $newPassword);
        if ($renewPasswordResult['success']) {
            http_response_code(200);
            $this->logger->log("Password renewed: {$userEmail}");
            $response = [
                'success' => true,
                'message' => 'Password renewed successfully'
            ];
            echo json_encode($response);
        } else {
            http_response_code(400); 
            echo json_encode([
                'success' => false,
                'message' => $renewPasswordResult['message']
            ]);
        }
    }
}