<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $ulogaObj = new Uloga($database);

    //Check if Id of the item to get is set
    $ulogaObj->id = isset($_GET['id']) ? $_GET['id'] : die();
    try{
        $ulogaObj->readSingle();
        if($ulogaObj->uloga != null){ 
            $uloga = array(
                'id' => $ulogaObj->id,
                'uloga' => $ulogaObj->uloga,
            );
            echo json_encode($uloga);
        }else{
            echo json_encode(array('message' => 'Uloga sa zatrazenim identifikatorom ne postoji.'));
        }
    }catch(Exception $e){
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod ucitavanja podataka o ulozi.",
            "error" => $e->getMessage()
        ));
    };
?>