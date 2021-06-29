<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $korisniciObj = new Korisnik($database);

    //Check if Id of the item to get is set
    $korisniciObj->idKorisnika = isset($_GET['id']) ? $_GET['id'] : die();
    try{
        $korisniciObj->readSingle();
        if($korisniciObj->korisnickoIme != null){ 
            $odjel = array(
                'idKorisnika' => $korisniciObj->idKorisnika,
                'role' => $korisniciObj->role,
            );
            echo json_encode($odjel);
        }else{
            echo json_encode(array('message' => 'Korisnik sa zatrazenim identifikatorom ne postoji.'));
        }
    }catch(Exception $e){
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod ucitavanja podataka o odabranom korisniku.",
            "error" => $e->getMessage()
        ));
    };
?>