<?php
require_once __DIR__ . '/../models/users.php';

class UserController {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
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
        $targetDir = __DIR__ . "/../source/avatars/"; 
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

        // 删除旧头像
        $oldAvatarJpg = $targetDir . $userId . '.jpg';
        $oldAvatarPng = $targetDir . $userId . '.png';
        if (file_exists($oldAvatarJpg)) {
            unlink($oldAvatarJpg);
        }
        if (file_exists($oldAvatarPng)) {
            unlink($oldAvatarPng);
        }

        // 保存新头像
        $targetFile = $targetDir . $userId . '.' . $fileExtension;
        if (move_uploaded_file($file["tmp_name"], $targetFile)) {
            $avatarPath = "source/avatars/" . $userId . '.' . $fileExtension;
            $this->userModel->updateUserAvatar($userId, $avatarPath);

            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $_SESSION['user']['avatarPath'] = $avatarPath;

            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'avatarPath' => $avatarPath]);
        } else {
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
