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
        if ($response['success']) {
            echo json_encode($response);
            session_start();
            $_SESSION['user'] = [
                'email' => $userEmail,
                'name' => $response['user']['NAME'],
            ];
            return;
        } else {
            http_response_code(400);
            echo json_encode($response);
        }
    }
}