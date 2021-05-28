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
    $zaposlenik = new Zaposlenik($database);

    //Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    $zaposlenik->idZaposlenika = $data->idZaposlenika;
    $zaposlenik->ime = $data->ime;
    $zaposlenik->prezime = $data->prezime;
    $zaposlenik->odjel = $data->odjel;
    $zaposlenik->uloga = $data->uloga;

    if(in_array($zaposlenik->idZaposlenika, $zaposleniciIds_arr)){
        $result = $zaposlenik->update();
        if($result){
            echo json_encode(array("message" => "Podatci o zaposleniku su uspijesno azurirani."));
        }else{
            echo json_encode(array("message" => $result));
        }
    }else{
        echo json_encode(array("message" => "Zaposlenik sa odabranim identifikatorom ne postoji."));
    }
?>