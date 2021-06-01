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
    
    $putniNalog->idPutnogNaloga = $data->idPutnogNaloga;

    if(in_array($putniNalog->idPutnogNaloga, $putniNaloziIds_arr)){
        try{
            $putniNalog->delete();
            echo json_encode(array("message" => "Putni nalog je uspijesno obrisan."));
        }catch(Exception $e)
        {
            echo json_encode(array(
                "message" => "Doslo je do pogreske kod brisanja putnog naloga.",
                "error" => $e->getMessage()
            ));
        }
    }else{
        echo json_encode(array("message" => "Putni nalog sa odabranim identifikatorom ne postoji."));
    }
?>