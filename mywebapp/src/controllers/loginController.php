<?php
class LoginController {
    private $users;
    private $pdo;
    private $logger;
    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->users = new User();
        $this->logger = new Logger('../logs/login.log');
    }

    function login() {
        session_start();
        $userEmail = $_POST['email'];
        $userPassword = $_POST['password'];
        $response = $this->users->login($userEmail, $userPassword);
        if ($response['success']) {
            echo json_encode($response);
            $_SESSION['user'] = [
                'id' => $response['user']['ID_USER'],
                'email' => $userEmail,
                'name' => $response['user']['NAME_USER'],
                'access_level' => $response['user']['ID_ACCESS_LEVEL'],
            ];
            $this->logger->log("User {$userEmail} logged in User Access Level: {$_SESSION['user']['access_level']}");
            return;
        } else {
            http_response_code(400);
            echo json_encode($response);
        }
    }
}