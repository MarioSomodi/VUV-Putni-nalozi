<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $putniNalozi = new PutniNalog($database);
    $zaposlenici = new Zaposlenik($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $zaposlenici_arr = array();
    $putniNalozi_arr = array();
    $putniNaloziSaZaposlenicima_arr = array();

    //Reading data from DB
    $resultPutniNalozi = $putniNalozi->read();
    $resultZaposlenici = $zaposlenici->read();
    $numPutniNalozi = $resultPutniNalozi->rowCount();
    $numZaposlenici = $resultZaposlenici->rowCount();
    
    //Checking if there is data fill the arrays if not give an error message.
    if($numPutniNalozi > 0){
        while($row = $resultPutniNalozi->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $putniNalog_item = array(
                'id' => $id,
                'polaziste' => $polaziste,
                'odrediste' => $odrediste,
                'svrha' => $svrha,
                'datumOdlaska' => $datumOdlaska,
                'brojDana' => $brojDana,
                'zaposlenici' => $zaposlenici,
                'odobreno' => $odobreno,
            );
            array_push($putniNalozi_arr, $putniNalog_item);
        }
    }else{
        echo json_encode(array('message' => 'Nema putnih naloga.'));
    }
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
    }else{
        echo json_encode(array('message' => 'Nema zaposlenika.'));
    }
    if(sizeof($putniNalozi_arr) > 0 && sizeof($zaposlenici_arr) > 0){
        foreach($putniNalozi_arr as $putniNalog){
            extract($putniNalog);
            $putniNalogSaZaposlenik_item = array(
                'id' => $id,
                'polaziste' => $polaziste,
                'odrediste' => $odrediste,
                'svrha' => $svrha,
                'datumOdlaska' => $datumOdlaska,
                'brojDana' => $brojDana,
                'zaposlenici' => array(),
                'odobreno' => $odobreno,
            );
            $zaposlenici_single = array();
            if(strlen($zaposlenici) > 1){
                $zaposlenici_single = explode(",", $zaposlenici);
            }else{
                array_push($zaposlenici_single, $zaposlenici);
            }
            foreach($zaposlenici_arr as $zaposlenik){
                if(in_array($zaposlenik['id'], $zaposlenici_single)){
                    array_push($putniNalogSaZaposlenik_item['zaposlenici'], $zaposlenik);
                }
            }
            array_push($putniNaloziSaZaposlenicima_arr, $putniNalogSaZaposlenik_item);
        }
        echo json_encode($putniNaloziSaZaposlenicima_arr);
    }else{
        echo json_encode(array('message' => 'Doslo je do problema kod spajanja zaposlenika sa putnim nalozima.'));
    }
?>