<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $putniNalog = new PutniNalog($database);

    //Check if Id of the item to get is set
    $putniNalog->id = isset($_GET['id']) ? $_GET['id'] : die();
    $putniNalog->readSingle();

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
    }else{
        echo json_encode(array('message' => 'Nema zaposlenika.'));
    }
    if(sizeof($zaposlenici_arr) > 0 && $putniNalog->polaziste != null){ 
        $putniNalogSaZaposlenik = array(
            'id' => $putniNalog->id,
            'polaziste' => $putniNalog->polaziste,
            'odrediste' => $putniNalog->odrediste,
            'svrha' => $putniNalog->svrha,
            'datumOdlaska' => $putniNalog->datumOdlaska,
            'brojDana' => $putniNalog->brojDana,
            'zaposlenici' => array(),
            'odobreno' => $putniNalog->odobreno,
        );
        $zaposlenici_single = explode(',', $putniNalog->zaposlenici);
        foreach($zaposlenici_arr as $zaposlenik){
            if(in_array($zaposlenik['id'], $zaposlenici_single)){
                array_push($putniNalogSaZaposlenik['zaposlenici'], $zaposlenik);
            }
        }
        echo json_encode($putniNalogSaZaposlenik);
    }else{
        echo json_encode(array('message' => 'Putni nalog sa zatrazenim identifikatorom ne postoji.'));
    }
?>