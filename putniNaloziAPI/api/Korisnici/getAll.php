<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $korisniciObj = new Korisnik($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $korisnici = array();

    //Reading data from DB
    try{
        $resultKorisnici = $korisniciObj->read();
        $numKorisnici = $resultKorisnici->rowCount();
        
        //Checking if there is data fill the array if not give an error message.
        if($numKorisnici > 0){
            while($row = $resultKorisnici->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $korisnik = array(
                    'idKorisnika' => $idKorisnika,
                    'korisnickoIme' => $korisnickoIme,
                    'role' => $rola
                );
                array_push($korisnici, $korisnik);
            }
            echo json_encode($korisnici);
        }else{
            echo json_encode(array('message' => 'Nema korisnika.'));
        }
    }catch(Exception $e){
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod dohvacanja svih korisnika.",
            "error" => $e->getMessage()
        ));
    };
?>