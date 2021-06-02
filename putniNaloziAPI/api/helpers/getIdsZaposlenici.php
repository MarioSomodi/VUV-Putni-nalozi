<?php
    //Instantiate.
    $zaposlenici = new Zaposlenik($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $zaposleniciIds_arr = array();

    //Reading data from DB
    $resultZaposlenici = $zaposlenici->read();
    $numZaposlenici = $resultZaposlenici->rowCount();
    
    //Checking if there is data fill the arrays if not give an error message.
    if($numZaposlenici > 0){
        while($row = $resultZaposlenici->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($zaposleniciIds_arr, $idZaposlenika);
        }
    }
?>