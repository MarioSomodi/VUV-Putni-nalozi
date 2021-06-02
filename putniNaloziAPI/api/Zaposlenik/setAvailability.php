<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');

    //Include init file.
    include_once('../../core/initialize.php');
    include_once('../helpers\getIdsZaposlenici.php');
    include_once('../helpers/getArrayPutniNalozi.php');

    //Instantiate.
    $zaposlenik = new Zaposlenik($database);
    foreach($zaposleniciIds_arr as $zaposlenikId){
        $zaposlenik->idZaposlenika = $zaposlenikId;
        $zaposlenik->readSingle();
        foreach($putniNalozi as $putniNalog){
            if(in_array($zaposlenik->idZaposlenika, array_column($putniNalog['zaposlenici'], 'idZaposlenika'))){
                $endDate = new DateTime($putniNalog['datumOdlaska']);
                $endDate->add(new DateInterval('P'.$putniNalog['brojDana'].'D'));
                if($endDate > new DateTime('NOW')){
                    $zaposlenik->slobodan = 0;
                }else{
                    $zaposlenik->slobodan = 1;
                }
            }
        }
        $zaposlenik->updateAvailable();
    }
?>