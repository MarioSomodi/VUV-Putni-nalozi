<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');
    include_once('../helpers\getIdsZaposlenici.php');
    include_once('../helpers/getArrayPutniNalozi.php');

    //Instantiate.
    $zaposlenikObj = new Zaposlenik($database);
    foreach($zaposleniciIds_arr as $zaposlenikId){
        $zaposlenikObj->idzaposlenika = $zaposlenikId;
        $zaposlenikObj->readSingle();
        foreach($putniNalozi as $putniNalog){
            if(in_array($zaposlenikObj->idzaposlenika, array_column($putniNalog['zaposlenici'], 'idzaposlenika'))){
                $endDate = new DateTime($putniNalog['datumOdlaska']);
                $endDate->add(new DateInterval('P'.$putniNalog['brojDana'].'D'));
                if($putniNalog['odobreno'] == 0){
                    $zaposlenikObj->slobodan = 1;
                }else{
                    if($endDate > new DateTime('NOW')){
                        $zaposlenikObj->slobodan = 0;
                    }else{
                        $zaposlenikObj->slobodan = 1;
                    }
                }
            }
        }
        $zaposlenikObj->updateAvailable();
    }
?>