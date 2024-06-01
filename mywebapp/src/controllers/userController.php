<?php
require_once __DIR__ . '/../models/users.php';

class UserController {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    public function updateProfile($userId, $userName, $email) {
        $this->userModel->updateUserName($userId, $userName);
        $this->userModel->updateUserEmail($userId, $email);
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }

    public function uploadAvatar($userId, $file) {
        $targetDir = __DIR__ . "/../source/avatars/"; 
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        $fileName = basename($file["name"]);
        $targetFile = $targetDir . $fileName;
        if (move_uploaded_file($file["tmp_name"], $targetFile)) {
            $avatarPath = "source/avatars/" . $fileName; 
            $this->userModel->updateUserAvatar($userId, $avatarPath);
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'avatarPath' => $avatarPath]);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
        }
    }

    public function deleteUser($userId) {
        $this->userModel->deleteUser($userId);
        session_start();
        session_destroy(); 
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }
}
?>
