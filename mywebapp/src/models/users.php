<?php
class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function register($name, $passwordHashed, $email) {
        // Check if email already exists
        $sql = "SELECT * FROM users WHERE EMAIL = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            return ['success' => false, 'message' => 'Email already exists'];
        }
        // register new user
        $sql = "INSERT INTO users (NAME, PASSWORD_HASH, EMAIL) VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $passwordHashed, $email]);
        return $this->pdo->lastInsertId(); 
    }

    public function login($email, $passwordHashed) {
        // Check if email and password match
        $sql = "SELECT * FROM users WHERE EMAIL = ? AND PASSWORD_HASH = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email, $passwordHashed]);
        // If user exists, return user data
        $user = $stmt->fetch();
        if ($user) {
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
?>
