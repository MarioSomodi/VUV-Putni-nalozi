<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $zaposlenikObj = new Zaposlenik($database);

    //Check if Id of the item to get is set
    $zaposlenikObj->idZaposlenika = isset($_GET['idZaposlenika']) ? $_GET['idZaposlenika'] : die();
    try{
        $zaposlenikObj->readSingle();
        if($zaposlenikObj->ime != null){ 
            $zaposlenik = array(
                'idZaposlenika' => $zaposlenikObj->idZaposlenika,
                'ime' => $zaposlenikObj->ime,
                'prezime' => $zaposlenikObj->prezime,
                'odjel' => $zaposlenikObj->odjel,
                'uloga' => $zaposlenikObj->uloga,
                'slobodan' => $zaposlenikObj->slobodan,
                'korisnickoIme' => $zaposlenikObj->korisnickoIme,
                'idOdjela' => $zaposlenikObj->idOdjela,                
                'idUloge' => $zaposlenikObj->idUloge,
                'prvaPrijava' => $zaposlenikObj->prvaPrijava,
                'rola' => $zaposlenikObj->role,
            );
            echo json_encode($zaposlenik);
        }else{
            echo json_encode(array('message' => 'Zaposlenik sa zatrazenim identifikatorom ne postoji.'));
        }
    }catch(Exception $e){
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod ucitavanja podataka o zaposleniku.",
            "error" => $e->getMessage()
        ));
    };
?>