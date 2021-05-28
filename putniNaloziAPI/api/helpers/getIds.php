<?php
    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $putniNalozi = new PutniNalog($database);
    $zaposlenici = new Zaposlenik($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $zaposleniciIds_arr = array();
    $putniNaloziIds_arr = array();

    //Reading data from DB
    $resultPutniNalozi = $putniNalozi->read();
    $resultZaposlenici = $zaposlenici->read();
    $numPutniNalozi = $resultPutniNalozi->rowCount();
    $numZaposlenici = $resultZaposlenici->rowCount();
    
    //Checking if there is data fill the arrays if not give an error message.
    if($numPutniNalozi > 0){
        while($row = $resultPutniNalozi->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($putniNaloziIds_arr, $idPutnogNaloga);
        }
    }
    if($numZaposlenici > 0){
        while($row = $resultZaposlenici->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($zaposleniciIds_arr, $idZaposlenika);
        }
    }
?>