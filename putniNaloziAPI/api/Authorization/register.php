<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$register = new Authorization($database);

$register->korisnickoIme = $data->username;
$register->lozinka = $data->password;
$register->ime = $data->name;
$register->prezime = $data->lastname;

try {
    $register->register();
    echo json_encode(array("message" => "Registracija uspijesna, biti ce te prebaceni na prijavu."));
} catch (Exception $e) {
    echo json_encode(array(
        "message" => "Doslo je do pogreske kod registracije.",
        "error" => $e->getMessage(),
        "status" => "false"
    ));
}
