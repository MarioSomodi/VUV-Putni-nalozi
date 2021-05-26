<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $zaposlenici = new Zaposlenik($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $zaposlenici_arr = array();

    //Reading data from DB
    $resultZaposlenici = $zaposlenici->read();
    $numZaposlenici = $resultZaposlenici->rowCount();
    
    //Checking if there is data fill the array if not give an error message.
    if($numZaposlenici > 0){
        while($row = $resultZaposlenici->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $zaposlenik_item = array(
                'id' => $id,
                'ime' => $ime,
                'prezime' => $prezime,
                'odjel' => $odjel,
                'uloga' => $uloga,
            );
            array_push($zaposlenici_arr, $zaposlenik_item);
        }
        echo json_encode($zaposlenici_arr);
    }else{
        echo json_encode(array('message' => 'Nema zaposlenika.'));
    }
?>