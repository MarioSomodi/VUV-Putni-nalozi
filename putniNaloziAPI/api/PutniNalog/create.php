<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core\initialize.php');

    //Instantiate.
    $putniNalog = new PutniNalog($database);

    //Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    $putniNalog->polaziste = $data->polaziste;
    $putniNalog->odrediste = $data->odrediste;
    $putniNalog->svrha = $data->svrha;
    $putniNalog->datumOdlaska = $data->datumOdlaska;
    $putniNalog->brojDana = $data->brojDana;
    $putniNalog->zaposlenici = $data->zaposlenici;
    $putniNalog->odobreno = $data->odobreno;

    try{
        $putniNalog->create();
        echo json_encode(array("message" => "Putni nalog je uspijesno kreiran."));
    }catch(Exception $e)
    {
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod kreiranja putnog naloga.",
            "error" => $e->getMessage()
        ));
    }
?>