<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Instantiate.
$odjel = new Odjel($database);

//Get the posted data
$data = json_decode(file_get_contents("php://input"));

$odjel->odjel = $data->odjel;

try {
    $odjel->create();
    echo json_encode(array("message" => "Novi odjel je uspijesno dodan."));
} catch (Exception $e) {
    echo json_encode(array(
        "message" => "Doslo je do pogreske kod dodavanja novoga odjela.",
        "error" => $e->getMessage()
    ));
}
