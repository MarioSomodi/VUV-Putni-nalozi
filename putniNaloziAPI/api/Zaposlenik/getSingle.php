<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $zaposlenik = new Zaposlenik($database);

    //Check if Id of the item to get is set
    $zaposlenik->id = isset($_GET['id']) ? $_GET['id'] : die();
    $zaposlenik->readSingle();

    if($zaposlenik->ime != null){ 
        $zaposlenik_item = array(
            'id' => $zaposlenik->id,
            'ime' => $zaposlenik->ime,
            'prezime' => $zaposlenik->prezime,
            'odjel' => $zaposlenik->odjel,
            'uloga' => $zaposlenik->uloga,
        );
        echo json_encode($zaposlenik_item);
    }else{
        echo json_encode(array('message' => 'Zaposlenik sa zatrazenim identifikatorom ne postoji.'));
    }
?>