<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Instantiate.
$odjelObj = new Odjel($database);

//Check if Id of the item to get is set
$odjelObj->id = isset($_GET['id']) ? $_GET['id'] : die();
try {
    $odjelObj->readSingle();
    if ($odjelObj->odjel != null) {
        $odjel = array(
            'id' => $odjelObj->id,
            'odjel' => $odjelObj->odjel,
        );
        echo json_encode($odjel);
    } else {
        echo json_encode(array('message' => 'Odjel sa zatrazenim identifikatorom ne postoji.'));
    }
} catch (Exception $e) {
    echo json_encode(array(
        "message" => "Doslo je do pogreske kod ucitavanja podataka o odjelu.",
        "error" => $e->getMessage()
    ));
};
