<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Include all id's for check if request is valid.
include_once('../helpers\getIdsUloge.php');

//Instantiate.
$uloga = new Uloga($database);

//Get the posted data
$data = json_decode(file_get_contents("php://input"));

$uloga->id = $data->id;
$uloga->uloga = $data->uloga;

if (in_array($uloga->id, $ulogeIds_arr)) {
    try {
        $uloga->update();
        echo json_encode(array("message" => "Podatci o ulozi su uspijesno azurirani."));
    } catch (Exception $e) {
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod azuriranja podataka o ulozi.",
            "error" => $e->getMessage()
        ));
    }
} else {
    echo json_encode(array("message" => "Uloga sa odabranim identifikatorom ne postoji."));
}
