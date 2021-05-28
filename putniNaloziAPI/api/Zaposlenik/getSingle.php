<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $zaposlenikObj = new Zaposlenik($database);

    //Check if Id of the item to get is set
    $zaposlenikObj->idZaposlenika = isset($_GET['idZaposlenika']) ? $_GET['idZaposlenika'] : die();
    $zaposlenikObj->readSingle();

    if($zaposlenikObj->ime != null){ 
        $zaposlenik = array(
            'idZaposlenika' => $zaposlenikObj->idZaposlenika,
            'ime' => $zaposlenikObj->ime,
            'prezime' => $zaposlenikObj->prezime,
            'odjel' => $zaposlenikObj->odjel,
            'uloga' => $zaposlenikObj->uloga,
        );
        echo json_encode($zaposlenik);
    }else{
        echo json_encode(array('message' => 'Zaposlenik sa zatrazenim identifikatorom ne postoji.'));
    }
?>