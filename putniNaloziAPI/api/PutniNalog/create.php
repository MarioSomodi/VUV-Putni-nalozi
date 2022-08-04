<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Include init file.
include_once('../../core\initialize.php');

//Instantiate.
$putniNalog = new PutniNalog($database);
$zaposlenik = new Zaposlenik($database);

//Get the posted data
$data = json_decode(file_get_contents("php://input"));

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
    if ($noDuplicates == true) {
        foreach ($putniNalog->zaposlenici as $zaposlenikId) {
            $zaposlenik->idZaposlenika = $zaposlenikId;
            $zaposlenik->readSingle();
            if ($zaposlenik->slobodan == 0) {
                $allExist = false;
                $allFree = false;
                break;
            }
        }
    }
}
try {
    if ($allExist) {
        $putniNalog->create();
        include_once('../helpers\getIdsPutniNalozi.php');
        foreach ($putniNalog->zaposlenici as $zaposlenikId) {
            $zaposlenik->idZaposlenika = $zaposlenikId;
            try {
                $zaposlenik->addToPutniNalog(end($putniNaloziIds_arr));
            } catch (Exception $e) {
                echo json_encode(array(
                    "message" => "Doslo je do pogreske kod dodavanja zaposlenika putnom nalogu.",
                    "error" => $e->getMessage()
                ));
            }
        }
        echo json_encode(array("message" => "Putni nalog je uspijesno kreiran."));
    } else {
        if ($noDuplicates == false) {
            echo json_encode(array("message" => "Putni nalog ne smije imati dva ili vise istih zaposlenika."));
        } else if ($allFree == false) {
            echo json_encode(array("message" => "Jedan od zaposlenika kojeg zelite dodati nije slobodan, putni nalog nije kreiran."));
        } else {
            echo json_encode(array("message" => "Jedan od zaposlenika kojeg zelite dodati ne postoji, putni nalog nije kreiran."));
        }
    }
} catch (Exception $e) {
    echo json_encode(array(
        "message" => "Doslo je do pogreske kod kreiranja putnog naloga",
        "error" => $e->getMessage()
    ));
}
