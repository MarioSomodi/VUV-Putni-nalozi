<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Include all id's for check if request is valid.
include_once('../helpers\getIdsPutniNalozi.php');

//Instantiate.
$putniNalog = new PutniNalog($database);

//Get the posted data
$query = $_SERVER['QUERY_STRING'];
parse_str($query, $params);

$putniNalog->idPutnogNaloga = $params['id'];

if (in_array($putniNalog->idPutnogNaloga, $putniNaloziIds_arr)) {
    try {
        $putniNalog->delete();
        echo json_encode(array("message" => "Putni nalog je uspijesno obrisan."));
    } catch (Exception $e) {
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod brisanja putnog naloga.",
            "error" => $e->getMessage()
        ));
    }
} else {
    echo json_encode(array("message" => "Putni nalog sa odabranim identifikatorom ne postoji."));
}
