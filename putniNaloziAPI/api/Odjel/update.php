<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Include all id's for check if request is valid.
include_once('../helpers\getIdsOdjeli.php');

//Instantiate.
$odjel = new Odjel($database);

//Get the posted data
$data = json_decode(file_get_contents("php://input"));

$odjel->id = $data->id;
$odjel->odjel = $data->odjel;

if (in_array($odjel->id, $odjeliIds_arr)) {
    try {
        $odjel->update();
        echo json_encode(array("message" => "Podatci o odjelu su uspijesno azurirani."));
    } catch (Exception $e) {
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod azuriranja podataka o odjelu.",
            "error" => $e->getMessage()
        ));
    }
} else {
    echo json_encode(array("message" => "Odjel sa odabranim identifikatorom ne postoji."));
}
