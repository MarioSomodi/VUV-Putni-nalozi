<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Include all id's for check if request is valid.
    include_once('../helpers\getIdsOdjeli.php');

    //Instantiate.
    $odjel = new Odjel($database);

    //Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    $odjel->id = $data->id;
    
    if(in_array($odjel->id, $odjeliIds_arr)){
        try{
            $odjel->delete();
            echo json_encode(array("message" => "Odjel je uspijesno obrisan te su zaposlenici koji su bili u njemu prebaceni u zadani odjel."));
        }catch(Exception $e)
        {
            echo json_encode(array(
                "message" => "Doslo je do pogreske kod brisanja odjela.",
                "error" => $e->getMessage()
            ));
        }
    }else{
        echo json_encode(array("message" => "Odjel sa odabranim identifikatorom ne postoji."));
    }
?>