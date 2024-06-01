<?php
require_once __DIR__ . '/../models/users.php';
require_once __DIR__ . '/../config/logger.php';

class getUserInfo {
    private $logger;
    private $userModel;

    public function __construct() {
        $this->logger = new Logger('../logs/getUserInfo.log');
        $this->userModel = new User(); 
        $this->logger->log('getUserInfo constructor initialized');
    }

    public function getUserInfo() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        header('Content-Type: application/json');
    
        if (isset($_SESSION['user'])) {
            $userId = $_SESSION['user']['id'];
            $userInfo = $this->userModel->getUser($userId);
    
            if ($userInfo) {
                $avatarPathJpg = 'source/avatars/' . $userId . '.jpg';
                $avatarPathPng = 'source/avatars/' . $userId . '.png';
                if (file_exists(__DIR__ . '/../../public/' . $avatarPathJpg)) {
                    $avatarPath = $avatarPathJpg;
                } elseif (file_exists(__DIR__ . '/../../public/' . $avatarPathPng)) {
                    $avatarPath = $avatarPathPng;
                } else {
                    $avatarPath = 'source/avatars/default.jpg';
                }
    
                $response = [
                    'id' => $userInfo['ID_USER'],
                    'name' => $userInfo['NAME_USER'],
                    'email' => $userInfo['EMAIL'],
                    'avatarPath' => $avatarPath
                ];
    
                $_SESSION['user']['name'] = $userInfo['NAME_USER'];
                $_SESSION['user']['email'] = $userInfo['EMAIL'];
                $_SESSION['user']['avatarPath'] = $avatarPath;
    
                echo json_encode($response);
                $this->logger->log("User info retrieved: " . json_encode($response));
            } else {
                echo json_encode(['message' => 'User not found']);
                $this->logger->log('User not found');
            }
        } else {
            echo json_encode(['message' => 'Unauthorized']);
            $this->logger->log('Unauthorized access attempt');
        }
    }
    
    
}

