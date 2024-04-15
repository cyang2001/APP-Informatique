<?php
require 'database.php'; 
require 'User.php'; 

$pdo = new PDO($dsn, $user, $pass, $options); 
$user = new User($pdo); 


$data = json_decode(file_get_contents('php://input'), true);


$result = $user->register($data['name'], $data['password'], $data['email']);


header('Content-Type: application/json');


echo json_encode($result);
?>