<?php
require_once __DIR__ . '/../src/models/meetings.php';
require_once __DIR__ . '/../src/models/users.php';
require_once __DIR__ . '/../src/models/pages.php';
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
require_once __DIR__ . '/../src/controllers/pageController.php';



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
            $userAccessLevel = $_SESSION['user']['access_level'] ?? 0;
            echo json_encode(['access_level' => $userAccessLevel]);
            exit();
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
        case 'getPages':
            if ($method == 'GET') {
                $userAccessLevel = $_SESSION['user']['access_level'] ?? 0;
                $logger->log('GET /getPages');
                $logger->log('User access level: '.$userAccessLevel);
                $router->get('/getPages', function() use ($userAccessLevel) {
                    $pageController = new PageController();
                    $pageController->getPages($userAccessLevel);
                });
            }
            break;
        case 'addPage':
            if ($method == 'POST') {
                $logger->log('POST /addPage');
                $router->post('/addPage', function() {
                    $pageName = $_POST['page_name'];
                    $pageUrl = $_POST['page_url'];
                    $parentId = isset($_POST['parent_id']) ? (int)$_POST['parent_id'] : null;
                    $accessLevel = isset($_POST['access_level']) ? (int)$_POST['access_level'] : 0;
                    $pageController = new pageController();
                    $pageController->addPage($pageName, $pageUrl, $parentId, $accessLevel);
                });
            }
            break;
        case 'updatePage':
            if ($method == 'POST') {
                $logger->log('POST /updatePage');
                $router->post('/updatePage', function() {
                    $pageId = $_POST['page_id'];
                    $pageName = $_POST['page_name'];
                    $pageUrl = $_POST['page_url'];
                    $parentId = isset($_POST['parent_id']) ? (int)$_POST['parent_id'] : null;
                    $accessLevel = isset($_POST['access_level']) ? (int)$_POST['access_level'] : 0;
                    $pageController = new pageController();
                    $pageController->updatePage($pageId, $pageName, $pageUrl, $parentId, $accessLevel);
                });
            }
            break;
        case 'deletePage':
            if ($method == 'POST') {
                $logger->log('POST /deletePage');
                $router->post('/deletePage', function() {
                    $pageId = $_POST['page_id'];
                    $pageController = new pageController();
                    $pageController->deletePage($pageId);
                });
            }
            break;
        case 'getPage':
            if ($method == 'GET') {
                $logger->log('GET /getPage');
                $router->get('/getPage', function() {
                    $pageId = $_GET['page_id'];
                    $pageController = new pageController();
                    $pageController->getPage($pageId);
                });
            }
            break;
        case 'getChildPages':
            if ($method == 'GET') {
                $logger->log('GET /getChildPages');
                $router->get('/getChildPages', function() {
                    $parentId = $_GET['parent_id'];
                    $pageController = new pageController();
                    $pageController->getChildPages($parentId);
                });
            }
            break;
    default:
        $logger->log('action not found: '.$action);
        echo json_encode(["message" => "404", "status" => "error"]);
        break;
}
$router->dispatch();