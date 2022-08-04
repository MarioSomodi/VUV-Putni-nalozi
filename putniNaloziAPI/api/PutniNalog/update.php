<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core/initialize.php');

//Include all id's for check if request is valid.
include_once('../helpers\getIdsPutniNalozi.php');

//Instantiate.
$putniNalog = new PutniNalog($database);
$zaposlenik = new Zaposlenik($database);
$putniNalozi = array();

//Get the posted data
$data = json_decode(file_get_contents("php://input"));

$putniNalog->idPutnogNaloga = $data->idPutnogNaloga;
$putniNalog->polaziste = $data->polaziste;
$putniNalog->odrediste = $data->odrediste;
$putniNalog->svrha = $data->svrha;
$putniNalog->datumOdlaska = $data->datumOdlaska;
$putniNalog->brojDana = $data->brojDana;
$putniNalog->zaposlenici = $data->zaposlenici;
$putniNalog->odobreno = $data->odobreno;

$allExist = true;
$allFree = true;
$noDuplicates = true;
include_once('../helpers\getIdsZaposlenici.php');
foreach ($putniNalog->zaposlenici as $zaposlenikId) {
    if (!in_array($zaposlenikId, $zaposleniciIds_arr)) {
        $allExist = false;
        break;
    }
}
if ($allExist == true) {
    if (count($putniNalog->zaposlenici) != count(array_unique($putniNalog->zaposlenici))) {
        $noDuplicates = false;
    }
    if ($noDuplicates == false) {
        $allExist = false;
    }
}
if (in_array($putniNalog->idPutnogNaloga, $putniNaloziIds_arr)) {
    if ($allExist) {
        try {
            $putniNalog->update();
            $zaposlenik->removeFromPutniNalog($putniNalog->idPutnogNaloga);
            foreach ($putniNalog->zaposlenici as $zaposlenikId) {
                $zaposlenik->idZaposlenika = $zaposlenikId;
                try {
                    $zaposlenik->addToPutniNalog($putniNalog->idPutnogNaloga);
                } catch (Exception $e) {
                    echo json_encode(array(
                        "message" => "Doslo je do pogreske kod azuriranja zaposlenika putnog naloga.",
                        "error" => $e->getMessage()
                    ));
                }
            }
            echo json_encode(array("message" => "Putni nalog je uspijesno azuriran."));
        } catch (Exception $e) {
            echo json_encode(array(
                "message" => "Doslo je do pogreske kod azuriranja putnog naloga.",
                "error" => $e->getMessage()
            ));
        }
    } else {
        if ($noDuplicates == false) {
            echo json_encode(array("message" => "Putni nalog ne smije imati dva ili vise istih zaposlenika."));
        } else if ($allFree == false) {
            echo json_encode(array("message" => "Jedan od zaposlenika kojeg zelite dodati nije slobodan, putni nalog nije azuriran."));
        } else {
            echo json_encode(array("message" => "Jedan od zaposlenika kojeg zelite dodati ne postoji, putni nalog nije azuriran."));
        }
    }
} else {
    echo json_encode(array("message" => "Putni nalog sa odabranim identifikatorom ne postoji."));
}
