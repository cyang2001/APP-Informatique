<?php
require_once __DIR__ . '/../config/logger.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../tools/UUIDGenerator.php';
class User {
    private $pdo;
    private $logger;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/user.log');
    }

    public function register($name, $password, $email) {
        // Check if email already exists
        $passwordHashed = password_hash($password, PASSWORD_DEFAULT);
        $idAccessLevel = 0;
        $idUser = UUIDGenerator::generate();
        $sql = "SELECT * FROM USER WHERE EMAIL = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $this->logger->log("Email already exists: {$email}");
            return ['success' => false, 'message' => 'Email already exists'];
        }
        // register new user
        $sql = "INSERT INTO USER (ID_USER, NAME_USER, PASSWORD_HASH, EMAIL, ID_ACCESS_LEVEL) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idUser, $name, $passwordHashed, $email, $idAccessLevel]);
        $this->logger->log("User registered: {$email} - {$name} - {$idUser}");
        return ['success' => true, 'userId' => $idUser];
    }

    
    public function login($email, $password) {
        $sql = "SELECT * FROM USER WHERE EMAIL = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if (!$user) {
            return ['success' => false, 'message' => 'Email not found'];
        }
        if ($user && password_verify($password, $user['PASSWORD_HASH'])) {
            return ['success' => true, 'user' => $user];
        }
        return ['success' => false, 'message' => 'Invalid password'];
    }
    // We have to add a function that verifies if the email exists in the database by sending code to the email address
    public function verifyEmail($code) {
        // i dont know how to do this part
        // ask master GPT!
        if ($code == '1234') {
            return ['success' => true];
        }
        // only for test
    }
    public function renewPassword($email, $password) {
        $passwordHashed = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE USER SET PASSWORD_HASH = ? WHERE EMAIL = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$passwordHashed, $email]);
        return ['success' => true];
    }

    public function getUser($userId) {
        $sql = "SELECT * FROM USER WHERE ID_USER = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$userId]);
        return $stmt->fetch();
    }

    public function getUsers() {
        $sql = "SELECT * FROM USER";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    public function deleteUser($userId) {
        $sql = "DELETE FROM USER WHERE ID_USER = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$userId]);
        $userName = $this->getUser($userId)['NAME_USER'];
        $this->logger->log("User deleted: {$userId} - {$userName}");
        return ['success' => true];
    }

    public function updateUserName($userId, $userName) {
        $sql = "UPDATE USER SET NAME_USER = ? WHERE ID_USER = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$userName, $userId]);
        $this->logger->log("User name updated: {$userId} - {$userName}");
        return ['success' => true];
    }

    public function updateUserEmail($userId, $email) {
        $sql = "UPDATE USER SET EMAIL = ? WHERE ID_USER = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email, $userId]);
        $this->logger->log("User email updated: {$userId} - {$email}");
        return ['success' => true];
    }
}
