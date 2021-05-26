<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Include all id's for check if request is valid.
    include_once('../helpers\getIds.php');

    //Instantiate.
    $putniNalog = new PutniNalog($database);

    //Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    $putniNalog->id = $data->id;

    if($putniNalog->delete() && in_array($putniNalog->id, $putniNaloziIds_arr)){
        echo json_encode(array("message" => "Putni nalog je uspijesno obrisan."));
    }else{
        echo json_encode(array("message" => "Doslo je do pogreske kod brisanja putnog naloga ili putni nalog sa odabranim identifikatorom ne postoji."));
    }
?>