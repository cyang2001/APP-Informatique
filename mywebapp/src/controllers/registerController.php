<?php

require_once __DIR__ . '/../models/users.php'; 
require_once __DIR__ .'/../config/logger.php';
header('Content-Type: application/json');
class RegisterController{
    private $users;
    
    private $logger;
    public function __construct(){

        $this->users = new User();
        $this->logger = new Logger('../../logs/register.log');
    }

    function register(){
        $userName = $_POST['name'];
        $userPassword = $_POST['password'];
        $userEmail = $_POST['email'];
        $confirmPassword = $_POST['confirmPassword'];
        if($userPassword != $confirmPassword){
            $response = [
                'status' => 'error',
                'message' => 'Password and comfirmPassword do not match'
            ];
            $this->logger->log("Password and comfirmPassword do not match: {$userEmail}");
            echo json_encode($response);
        }
        $this->users->register($userName, $userPassword, $userEmail);
        $this->logger->log("User registered: {$userEmail} - {$userName}");
        $response = [
            'status' => 'success',
            'message' => 'User registered successfully'
        ];
        echo json_encode($response);
    }
}

