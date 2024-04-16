<?php
require_once __DIR__ . '/../config/logger.php';
require_once __DIR__ . '/../config/database.php';
class User {
    private $pdo;
    private $logger;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../../logs/user.log');
    }

    public function register($name, $password, $email) {
        // Check if email already exists
        $passwordHashed = password_hash($password, PASSWORD_DEFAULT);
        $sql = "SELECT * FROM users WHERE EMAIL = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $this->logger->log("Email already exists: {$email}");
            return ['success' => false, 'message' => 'Email already exists'];
        }
        // register new user
        $sql = "INSERT INTO users (NAME, PASSWORD_HASH, EMAIL) VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $passwordHashed, $email]);
        $this->logger->log("User registered: {$email} - {$name}");
        return ['success' => true, 'userId' => $this->pdo->lastInsertId()];
    }

    
    public function login($email, $password) {
        $sql = "SELECT * FROM users WHERE EMAIL = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['PASSWORD_HASH'])) {
            return ['success' => true, 'user' => $user];
        }
        return ['success' => false, 'message' => 'Invalid email or password'];
    }
    // We have to add a function that verifies if the email exists in the database by sending code to the email address
    public function verifyEmail() {
        // i dont know how to do this part
        // ask master GPT!
    }
    public function renewPassword($email, $passwordHashed) {
        $sql = "UPDATE users SET PASSWORD_HASH = ? WHERE EMAIL = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$passwordHashed, $email]);
        return ['success' => true];
    }
}
