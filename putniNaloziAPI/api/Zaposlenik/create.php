<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $zaposlenik = new Zaposlenik($database);

    //Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    $zaposlenik->ime = $data->ime;
    $zaposlenik->prezime = $data->prezime;
    $zaposlenik->odjel = $data->odjel;
    $zaposlenik->uloga = $data->uloga;

    if($zaposlenik->create()){
        echo json_encode(array("message" => "Zaposlenik je uspijesno dodan."));
    }else{
        echo json_encode(array("message" => "Doslo je do pogreske kod dodavanja zaposlenika."));
    }
?>