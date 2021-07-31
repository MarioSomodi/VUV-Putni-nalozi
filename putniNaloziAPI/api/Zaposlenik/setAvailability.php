<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');
    include_once('../helpers\getIdsZaposlenici.php');
    include_once('../helpers/getArrayPutniNalozi.php');

    //Instantiate.
    $zaposlenikObj = new Zaposlenik($database);
    foreach($zaposleniciIds_arr as $zaposlenikId){
        $zaposlenikObj->idZaposlenika = $zaposlenikId;
        foreach($putniNalozi as $putniNalog){
            $zaposlenikExist = false;
            foreach($putniNalog['zaposlenici'] as $zaposlenik){
                if($zaposlenik['idZaposlenika'] == $zaposlenikObj->idZaposlenika){
                    $zaposlenikExist = true;
                }
            }
            if($zaposlenikExist)
            {
                $startDate = new DateTime($putniNalog['datumOdlaska']);
                $endDate = new DateTime($putniNalog['datumOdlaska']);
                $endDate->add(new DateInterval('P'.$putniNalog['brojDana'].'D'));
                if($putniNalog['odobreno'] == 0){
                    $zaposlenikObj->slobodan = 1;
                    $zaposlenikObj->updateAvailable();
                }else{
                    if(new DateTime('NOW') >= $startDate && new DateTime('NOW') <= $endDate){
                        $zaposlenikObj->slobodan = 0;
                        $zaposlenikObj->updateAvailable();
                        break;
                    }else{
                        $zaposlenikObj->slobodan = 1;
                        $zaposlenikObj->updateAvailable();
                    }
                }
            }
        }
    }
?>