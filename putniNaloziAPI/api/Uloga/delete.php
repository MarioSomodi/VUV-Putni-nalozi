<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Include all id's for check if request is valid.
    include_once('../helpers\getIdsUloge.php');

    //Instantiate.
    $uloga = new Uloga($database);

    //Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    $uloga->id = $data->id;
    
    if(in_array($uloga->id, $ulogeIds_arr)){
        try{
            $uloga->delete();
            echo json_encode(array("message" => "Uloga je uspijesno obrisana te su zaposlenici koji su ju imali prebaceni u zadanu ulogu."));
        }catch(Exception $e)
        {
            echo json_encode(array(
                "message" => "Doslo je do pogreske kod brisanja uloge.",
                "error" => $e->getMessage()
            ));
        }
    }else{
        echo json_encode(array("message" => "Uloga sa odabranim identifikatorom ne postoji."));
    }
?>