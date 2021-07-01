<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $putniNalogObj = new PutniNalog($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $putniNalozi = array();

    //Reading data from DB
    try{
        $resultPutniNalozi = $putniNalogObj->read();
        $numPutniNalozi = $resultPutniNalozi->rowCount();
        //Checking if there is data fill the arrays if not give an error message.
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
            echo json_encode($putniNalozi);
        }else{
            echo json_encode(array('message' => 'Nema putnih naloga.'));
        }
    }catch(Exception $e){
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod ucitavanja putnih naloga.",
            "error" => $e->getMessage()
        ));
    };
?>