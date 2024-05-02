<?php
require '../../../vendor/autoload.php';
use Ramsey\Uuid\Uuid;
class UUIDGenerator{
    private function __construct()
    {
    }
    private function __clone()
    {
    }
    public static function generate()
    {
        $UUID = Uuid::uuid4();
        preg_match_all('/\d/', $UUID->toString(), $matches);
        $digits = implode('', $matches[0]);
        $shortUUID = substr($digits, 0, 8);
        return $shortUUID;
    }
}