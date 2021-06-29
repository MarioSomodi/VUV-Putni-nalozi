<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    $data = json_decode(file_get_contents("php://input"));

    $register = new Authorization($database);

    $register->korisnickoIme = $data->korisnickoIme;
    $register->lozinka = $data->lozinka;

    try{
        $register->register();
        echo json_encode("RegisterSuccess");
    }catch(Exception $e){
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod registracije.",
            "error" => $e->getMessage()
        ));
    }
?>