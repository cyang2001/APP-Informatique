<?php
require_once __DIR__ . '/../src/models/music.php';
require_once __DIR__ . '/../src/models/playlist.php';
require_once __DIR__ . '/../src/models/meetings.php';
require_once __DIR__ . '/../src/models/users.php';
require_once __DIR__ .'/./router/router.php';
require_once __DIR__ .'/../src/config/logger.php';
require_once __DIR__ .'/../src/controllers/renewPasswordController.php';
$logger = new Logger('../logs/index.log');
$router = new Router();
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];
require_once __DIR__ . '/../src/controllers/RegisterController.php';
require_once __DIR__ . '/../src/controllers/LoginController.php';
require_once __DIR__ . '/../src/controllers/MeetingController.php';
require_once __DIR__ . '/../src/controllers/showDatabaseController.php';
require_once __DIR__ . '/../src/controllers/getUserInfo.php';
require_once __DIR__ . '/../src/controllers/logout.php';
require_once __DIR__ . '/../src/controllers/createPlaylistController.php';
require_once __DIR__ . '/../src/controllers/addMusicController.php';






switch($action) {
    case 'register':
        if ($method == 'GET') {
            $logger->log('GET /register');
            $router->get('/register', function() use($logger){
                $logger->log('GET /register');
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
    case 'addMeeting':
        if ($method == 'POST') {
            $logger->log('POST /addMeeting');
            $router->post('/addMeeting', function() {
                $meetingController = new MeetingController();
                $meetingController->ajouterEvenement();
            });
        }
        break;
    case 'deleteMeeting':
        if ($method == 'DELETE') {
            $logger->log('DELETE /deleteMeeting');
            $router->delete('/deleteMeeting', function() {
                $meetingController = new MeetingController();
                $data = json_decode(file_get_contents('php://input'), true);
                $idMeeting = $data['idMeeting'];
                $meetingController->supprimerEvenement($idMeeting);
            });
        }
        break;
    case 'renewPassword1':
        if ($method == 'GET') {
            $logger->log('GET /renewPassword1');
            $router->get('/renewPassword1', function(){
                $renewPasswordController = new renewPasswordController();
                $renewPasswordController->verification();
            });
        } elseif ($method == 'POST') {
            $logger->log('POST /renewPassword1');
            $router->post('/renewPassword1', function(){
                $renewPasswordController = new renewPasswordController();
                $renewPasswordController->verification();
            });
        }
    case 'renewPassword2':
        if ($method == 'GET') {
            $logger->log('GET /renewPassword2');
            $router->get('/renewPassword2', function(){
                $renewPasswordController = new renewPasswordController();
                $renewPasswordController->renewPassword();
            });
        } elseif ($method == 'POST') {
            $logger->log('POST /renewPassword2');
            $router->post('/renewPassword2', function(){
                $renewPasswordController = new renewPasswordController();
                $renewPasswordController->renewPassword();
            });
        }
        break;
    case 'showDatabase':
        if ($method == 'GET') {
            $logger->log('GET /showDatabase');
            $router->get('/showDatabase', function(){
                $showDatabaseController = new showDatabaseController();
                $showDatabaseController->showDatabase();
            });
        }
        break;
    case 'getUserInfo':
        if ($method == 'GET') {
            $logger->log('GET /getUserInfo');
            $router->get('/getUserInfo', function(){
                $getUserInfo = new getUserInfo();
                $getUserInfo->getUserInfo();
            });
        }
        break;
    case 'logout':
        if ($method == 'GET') {
            $logger->log('GET /logout');
            $router->get('/logout', function(){
                $logoutController = new logoutController();
                $logoutController->logout();
            });
        }
        break;

    case 'createPlaylist':
        if ($method == 'POST') {
            $logger->log('POST /createPlaylist');
            $router->post('/createPlaylist', function() {
                $createPlaylistController = new CreatePlaylistController();
                $createPlaylistController->ajouterPlaylist();
            });
        }
        break;

    case 'deletePlaylist':
        if ($method == 'DELETE') {
            $logger->log('DELETE /deletePlaylist');
            $router->delete('/deletePlaylist', function() {
                $deletePlaylistController = new DeletePlaylistController();
                $data = json_decode(file_get_contents('php://input'), true);
                $idPlaylist = $data['idPlaylist'];
                $deletePlaylistController->supprimerPlaylist($idPlaylist);
            });
        }
        break;
    
    case 'addMusic':
        if ($method == 'POST') {
            $logger->log('POST /addMusic');
            $router->post('/addMusic', function() {
                $addMusicController = new AddMusicController();
                $addMusicController->ajouterMusic();
            });
        }
        break;

    case 'deleteMusic':
        if ($method == 'DELETE') {
            $logger->log('DELETE /deleteMusic');
            $router->delete('/deleteMusic', function() {
                $deleteMusicController = new DeleteMusicController();
                $data = json_decode(file_get_contents('php://input'), true);
                $idMusic = $data['idMusic'];
                $deleteMusicController->supprimerMusic($idMusic);
            });
        }
        break;

    default:
        $logger->log('action not found: '.$action);
        echo json_encode(["message" => "404", "status" => "error"]);
        break;
}
$router->dispatch();