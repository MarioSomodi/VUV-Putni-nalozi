<?php
    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $putniNalozi = new PutniNalog($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $putniNalozi_arr = array();

    //Reading data from DB
    $resultPutniNalozi = $putniNalozi->read();
    $numPutniNalozi = $resultPutniNalozi->rowCount();
    
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
    }
?>