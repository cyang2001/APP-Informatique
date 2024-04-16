<?php
class Logger {
    private $logFile;

    public function __construct($fileName) {
        $this->logFile = $fileName;
    }

    public function log($message) {
        $time = date('Y-m-d H:i:s');
        $msg = "[{$time}] - {$message}\n";
        file_put_contents($this->logFile, $msg, FILE_APPEND);
    }
}


