$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($request) {
    case '/register' :
        require __DIR__ . '/src/controllers/RegisterController.php';
        $controller = new RegisterController();
        if ($method == 'POST') {
            $controller->register();
        }
        break;
    case '/login' :
        require __DIR__ . '/src/controllers/LoginController.php';
        $controller = new LoginController();
        if ($method == 'POST') {
            $controller->login();
        }
        break;
    // add more 
    default:
        // default response
        header("HTTP/1.0 404 Not Found");
        // add a not found page
        break;
}
