<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$token = new Authorization($database);

$token->korisnickoIme = $data->username;
$token->lozinka = $data->password;

try {
    $loginResult = $token->auth();
    echo json_encode($loginResult);
} catch (Exception $e) {
    echo json_encode(array(
        "message" => "Doslo je do pogreske kod prijave.",
        "error" => $e->getMessage(),
        "status" => "false"
    ));
}
