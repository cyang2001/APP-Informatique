<?php
require_once __DIR__ . '/../models/users.php';

class UserController {
    private $userModel;
    private $logger;

    public function __construct() {
        $this->userModel = new User();
        $this->logger = new Logger('../logs/user.log');
    }

    public function updateProfile($userId, $userName, $email) {
        $currentUser = $this->userModel->getUser($userId);
        if (!$currentUser) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'User not found']);
            return;
        }

        $userName = $userName ?? $currentUser['NAME_USER'];
        $email = $email ?? $currentUser['EMAIL'];

        $this->userModel->updateUserName($userId, $userName);
        $this->userModel->updateUserEmail($userId, $email);

        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user']['name'] = $userName;
        $_SESSION['user']['email'] = $email;

        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }
    public function uploadAvatar($userId, $file) {
        $targetDir = __DIR__ . "/../../public/source/avatars/"; 
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
    
        $fileExtension = pathinfo($file["name"], PATHINFO_EXTENSION);
        $allowedExtensions = ['jpg', 'jpeg', 'png'];
    
        if (!in_array($fileExtension, $allowedExtensions)) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Invalid file format. Only jpg and png are allowed.']);
            return;
        }
    
        $targetFile = $targetDir . $userId . '.' . $fileExtension;
    

        $this->logger->log("Attempting to move uploaded file to: " . $targetFile);
        if (move_uploaded_file($file["tmp_name"], $targetFile)) {

            if (!file_exists($targetFile)) {
                $this->logger->log("File was not successfully moved to the target directory.");
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'message' => 'File not found after upload']);
                return;
            }
    

            $avatarPath = "source/avatars/" . $userId . '.' . $fileExtension;
            $this->userModel->updateUserAvatar($userId, $avatarPath);
    

            $oldAvatarJpg = $targetDir . $userId . '.jpg';
            $oldAvatarPng = $targetDir . $userId . '.png';
            if (file_exists($oldAvatarJpg) && $oldAvatarJpg != $targetFile) {
                unlink($oldAvatarJpg);
            }
            if (file_exists($oldAvatarPng) && $oldAvatarPng != $targetFile) {
                unlink($oldAvatarPng);
            }
    

            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $_SESSION['user']['avatarPath'] = $avatarPath;
    

            $this->logger->log("Avatar uploaded successfully. Path: " . $avatarPath);
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'avatarPath' => $avatarPath]);
        } else {

            $this->logger->log("Failed to move uploaded file to target directory.");
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
        }
    }
    
    
    
    

    public function deleteUser($userId) {
        $this->userModel->deleteUser($userId);
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        session_destroy(); 
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }
}
