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
    $zaposlenik->lozinka = $data->lozinka;
    $zaposlenik->korisnickoIme = $data->korisnickoIme;
    $zaposlenik->role = $data->rola;

    try{
        $zaposlenik->create();
        echo json_encode(array("message" => "Novi zaposlenik je uspijesno dodan."));
    }catch(Exception $e)
    {
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod dodavanja novoga zaposlenika.",
            "error" => $e->getMessage()
        ));
    }
?>