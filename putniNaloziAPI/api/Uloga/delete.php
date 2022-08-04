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
$query = $_SERVER['QUERY_STRING'];
parse_str($query, $params);

$uloga->id = $params['id'];

if (in_array($uloga->id, $ulogeIds_arr)) {
    try {
        $uloga->delete();
        echo json_encode(array("message" => "Uloga je uspijesno obrisana te su zaposlenici koji su ju imali prebaceni u zadanu ulogu."));
    } catch (Exception $e) {
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod brisanja uloge.",
            "error" => $e->getMessage()
        ));
    }
} else {
    echo json_encode(array("message" => "Uloga sa odabranim identifikatorom ne postoji."));
}
