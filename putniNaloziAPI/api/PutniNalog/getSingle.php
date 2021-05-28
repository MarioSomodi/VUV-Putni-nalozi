<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $putniNalog = new PutniNalog($database);
    $putniNalozi = array();
    //Check if Id of the item to get is set
    $putniNalog->idPutnogNaloga = isset($_GET['idPutnogNaloga']) ? $_GET['idPutnogNaloga'] : die();
    $resultPutniNalozi = $putniNalog->readSingle();
    $numPutniNalozi = $resultPutniNalozi->rowCount();
    //Checking if there is data fill the array if not give an error message.
    if($numPutniNalozi > 0){
        $index = -1;
        while($row = $resultPutniNalozi->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            if(!in_array($idPutnogNaloga, array_column($putniNalozi, 'idPutnogNaloga'))){
                $putniNalog = array(
                    'idPutnogNaloga' => $idPutnogNaloga,
                    'polaziste' => $polaziste,
                    'odrediste' => $odrediste,
                    'svrha' => $svrha,
                    'datumOdlaska' => $datumOdlaska,
                    'brojDana' => $brojDana,
                    'zaposlenici' => array(),
                    'odobreno' => $odobreno
                );
                array_push($putniNalozi, $putniNalog);
                $index++;
            }
            $zaposlenik = array(
                'idZaposlenika' => $idZaposlenika,
                'ime' => $ime,
                'prezime' => $prezime,
                'odjel' => $odjel,
                'uloga' => $uloga,
            );
            array_push($putniNalozi[$index]['zaposlenici'], $zaposlenik);
        }
        echo json_encode($putniNalozi[0]);
    }else{
        echo json_encode(array('message' => "Putni nalog sa odabranim identifikatorom ne postoji."));
    }
?>