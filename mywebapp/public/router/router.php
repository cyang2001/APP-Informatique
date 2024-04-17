<?php 
require_once __DIR__ . '/../../src/config/logger.php';

class Router{
    private $routerMap = array();
    private $logger;

    public function __construct(){
        $this->logger = new Logger('../logs/router.log');
    }

    public function get($patternStr, $fn){
        $pattern = $this->routerTemplateToReg($patternStr);
        $this->register('GET', $patternStr, $pattern, $fn);
    }

    public function post($patternStr, $fn) {
        $pattern = $this->routerTemplateToReg($patternStr);
        $this->register('POST', $patternStr, $pattern, $fn);
    }

    public function register($method, $patternStr, $pattern, $fn) {
        $this->routerMap[$method][] = array(
            'pattern' => $pattern,
            'patternStr' => $patternStr,
            'callback' => $fn
        );
        $this->logger->log('Register: '.$method.' '.$patternStr);
    }

    public function dispatch(){
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $this->logger->log('Dispatching request: '.$requestMethod);
        if (isset($this->routerMap[$requestMethod])) {
            $routerArr = $this->routerMap[$requestMethod];
            $this->handleUri($routerArr);
        } else {
            $this->logger->log('No routes registered for method: '.$requestMethod);
        }
    }

    private function handleUri($routerArr) {
        $uri = $this->getCurrentUri();
        $this->logger->log('Handling URI: '.$uri);
    
        $callbackParam = []; // Initialize $callbackParam variable
    
        foreach($routerArr as $v) {
            $this->logger->log('Checking pattern: '.$v['pattern']);
            $matchRes = preg_match_all($v['pattern'], $uri, $matches, PREG_OFFSET_CAPTURE);
    
            if($matchRes) {
                $this->logger->log('Pattern matched: '.$v['pattern']);
                $this->logger->log('Matches: '.json_encode($matches));
                $callbackParam = array_map(function ($item) {
                    return $item[0]; // Accessing the matched string directly
                }, $matches[0]);
                $fn = $v['callback'];
                break; // Exit the loop after the first match
            } else {
                $this->logger->log('Pattern not matched: '.$v['pattern']);
            }
        }
    
        if(isset($fn)) {
            $this->logger->log('Calling callback function');
            call_user_func_array($fn, $callbackParam);
        } else {
            $this->logger->log('No matching route found for URI: '.$uri);
        }
    }
    
    

    private function getCurrentUri() {
        $uri = $_SERVER['REQUEST_URI'];
        $this->logger->log('Current URI: '.$uri);
        $scriptNameArr = explode('/', $_SERVER['SCRIPT_NAME']);
        foreach($scriptNameArr as $v) {
            if($v !== '') {
                $uri = str_replace('/'.$v,'',$uri);
            }
        }
        $uriArr = explode('?action=',$uri);
        if ($uriArr[1] !== '/') {
            $uriArr[1] = '/'.$uriArr[1];
        }
        return $uriArr[1];
    }
    private function routerTemplateToReg($patternStr) {
        $txt = preg_replace('~{\w*}~','(\w*)',$patternStr);
        return '~^'.$txt.'$~';
    }
}