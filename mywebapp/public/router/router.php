<?php 
require_once __DIR__ . '/../../src/config/logger.php';

class Router{
    private $routerMap = array();
    private $logger;

    public function __construct(){
        $this->logger = new Logger('../logs/router.log');
    }

    public function get($patternStr, $fn){
        $this->logger->log('GET patternStr: '.$patternStr);
        $pattern = $this->routerTemplateToReg($patternStr);
        $this->logger->log('GET pattern: '.$pattern);
        $this->register('GET', $patternStr, $pattern, $fn);
    }

    public function post($patternStr, $fn) {
        $this->logger->log('POST patternStr: '.$patternStr);
        $pattern = $this->routerTemplateToReg($patternStr);
        $this->logger->log('POST pattern: '.$pattern);
        $this->register('POST', $patternStr, $pattern, $fn);
    }

    public function register($method, $patternStr, $pattern, $fn) {

        $this->routerMap[$method][] = array(
            'pattern' => $pattern,
            'patternStr' => $patternStr,
            'callback' => $fn
        );
        $this->logger->log('register: '.$method.' '.$patternStr);
    }

    public function dispatch(){
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $routerArr = $this->routerMap[$requestMethod];
        $this->handleUri($routerArr);
        $this->logger->log('dispatch: '.$requestMethod);
    }

    private function handleUri($routerArr) {
        $uri = $this->getCurrentUri();
        foreach($routerArr as $v) {
            $matchRes = preg_match_all($v['pattern'], $uri, $matches, PREG_OFFSET_CAPTURE);
            if($matchRes) {
                $this->logger->log('handleUri: '.$v['patternStr']);
                $matches = array_slice($matches, 1);
                $callbackParam = array_map(function ($item,$index) {
                    return $item[0][0];
                },$matches,array_keys($matches));
                $fn = $v['callback'];
            } 
        }
        call_user_func_array($fn, $callbackParam);
    }

    private function getCurrentUri() {
        $uri = $_SERVER['REQUEST_URI'];
        $scriptNameArr = explode('/', $_SERVER['SCRIPT_NAME']);
        $this->logger->log('getCurrentUri: '.$uri);
        foreach($scriptNameArr as $v) {
            if($v !== '') {
                $uri = str_replace('/'.$v,'',$uri);
            }
        }
        $uriArr = explode('?',$uri);
        return $uriArr[0];
    }

    private function routerTemplateToReg($patternStr) {
        $txt = preg_replace('~{\w*}~','(\w*)',$patternStr);
        return '~^'.$txt.'$~';
    }
}