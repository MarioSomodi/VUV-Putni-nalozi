<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Include all id's for check if request is valid.
include_once('../helpers\getIdsZaposlenici.php');

//Instantiate.
$zaposlenik = new Zaposlenik($database);

//Get the posted data
$query = $_SERVER['QUERY_STRING'];
parse_str($query, $params);

$zaposlenik->idZaposlenika = $params['id'];

if (in_array($zaposlenik->idZaposlenika, $zaposleniciIds_arr)) {
    try {
        $zaposlenik->delete();
        echo json_encode(array("message" => "Zaposlenik je uspijesno obrisan."));
    } catch (Exception $e) {
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod brisanja zaposlenika.",
            "error" => $e->getMessage()
        ));
    }
} else {
    echo json_encode(array("message" => "Zaposlenik sa odabranim identifikatorom ne postoji."));
}
