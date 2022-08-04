<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Instantiate.
$zaposlenikObj = new Zaposlenik($database);

//Arrays that are gonna hold all the data recevied from the DB.
$zaposlenici = array();

//Reading data from DB
try {
    $resultZaposlenici = $zaposlenikObj->read();
    $numZaposlenici = $resultZaposlenici->rowCount();

    //Checking if there is data fill the array if not give an error message.
    if ($numZaposlenici > 0) {
        while ($row = $resultZaposlenici->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $zaposlenik = array(
                'idZaposlenika' => $idZaposlenika,
                'ime' => $ime,
                'prezime' => $prezime,
                'korisnickoIme' => $korisnickoIme,
                'odjel' => $odjel,
                'uloga' => $uloga,
                'slobodan' => $slobodan,
                'role' => $rola
            );
            array_push($zaposlenici, $zaposlenik);
        }
        echo json_encode($zaposlenici);
    } else {
        echo json_encode(array('message' => 'Nema zaposlenika.'));
    }
} catch (Exception $e) {
    echo json_encode(array(
        "message" => "Doslo je do pogreske kod ucitavanja podataka o zaposlenicima.",
        "error" => $e->getMessage()
    ));
};
