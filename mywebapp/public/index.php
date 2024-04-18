<?php
require_once __DIR__ . '/../src/models/users.php';
require_once __DIR__ .'/./router/router.php';
require_once __DIR__ .'/../src/config/logger.php';
$logger = new Logger('../logs/index.log');
$router = new Router();
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];
require_once __DIR__ . '/../src/controllers/RegisterController.php';
require_once __DIR__ . '/../src/controllers/LoginController.php';





switch($action) {
    case 'register':
        if ($method == 'GET') {
            $logger->log('GET /register');
            $router->get('/register', function(){
                $registerController = new RegisterController();
                $registerController->register();
            });
        } elseif ($method == 'POST') {
            $logger->log('POST /register');
            $router->post('/register', function() use ($logger){
                $logger->log('calling');
                $registerController = new RegisterController();
                $registerController->register();
            });
        }
        break;
    case 'login':
        if ($method == 'GET') {
            $logger->log('GET /login');
            $router->get('/login', function(){
                $loginController = new LoginController();
                $loginController->login();
            });
        } elseif ($method == 'POST') {
            $logger->log('POST /login');
            $router->post('/login', function(){
                $loginController = new LoginController();
                $loginController->login();
            });
        }
        break;
    default:
        $logger->log('action not found: '.$action);
        echo json_encode(["message" => "404", "status" => "error"]);
        break;
}
$router->dispatch();