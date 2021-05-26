<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Methods: PUT');
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
    $putniNalog->polaziste = $data->polaziste;
    $putniNalog->odrediste = $data->odrediste;
    $putniNalog->svrha = $data->svrha;
    $putniNalog->datumOdlaska = $data->datumOdlaska;
    $putniNalog->brojDana = $data->brojDana;
    $putniNalog->zaposlenici = $data->zaposlenici;
    $putniNalog->odobreno = $data->odobreno;

    if($putniNalog->update() && in_array($putniNalog->id, $putniNaloziIds_arr)){
        echo json_encode(array("message" => "Putni nalog je uspijesno azuriran."));
    }else{
        echo json_encode(array("message" => "Doslo je do pogreske kod azuriranja putnog naloga ili putni nalog sa odabranim identifikatorom ne postoji."));
    }
?>