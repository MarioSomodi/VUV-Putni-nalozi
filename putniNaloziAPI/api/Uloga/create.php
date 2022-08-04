<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Instantiate.
$uloga = new Uloga($database);

//Get the posted data
$data = json_decode(file_get_contents("php://input"));

$uloga->uloga = $data->uloga;

try {
    $uloga->create();
    echo json_encode(array("message" => "Nova uloga je uspijesno dodana."));
} catch (Exception $e) {
    echo json_encode(array(
        "message" => "Doslo je do pogreske kod dodavanja nove uloge.",
        "error" => $e->getMessage()
    ));
}
