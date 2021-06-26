<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    $token = new Authorization($database);
    if($token->auth()){
        echo json_encode(
            $token->auth()
        );
    }else{
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod kreiranje JWT tokena. Kontaktirajte administratora."
        ));
    }
?>