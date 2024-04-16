<?php
require 'database.php'; 
require 'User.php'; 

header('Content-Type: application/json');

$pdo = new PDO($dsn, $user, $pass, $options); 
$user = new User($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['userName'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    $result = $user->register($name, $password, $email);
    if ($result['success']) {
        http_response_code(201); // Created
        echo json_encode(['message' => 'User created', 'userId' => $result['userId']]);
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => $result['message']]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['message' => 'Method not allowed']);
}
?>