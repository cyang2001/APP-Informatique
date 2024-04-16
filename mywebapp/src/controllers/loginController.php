<?php
class LoginController {
    private $users;
    private $pdo;
    
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->users = new User();
    }

    function login() {
        $userEmail = $_POST['email'];
        $userPassword = $_POST['password'];
        $response = $this->users->login($userEmail, $userPassword);
        echo json_encode($response);
    }
}