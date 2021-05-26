<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Include all id's for check if request is valid.
    include_once('../helpers\getIds.php');
    //Get arr of all putni nalozi so we can delete the deleted zaposlenik from putni nalog.
    include_once('../helpers\getPutniNaloziArr.php');

    //Instantiate.
    $putniNalog = new PutniNalog($database);
    $zaposlenik = new Zaposlenik($database);

    //Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    $zaposlenik->id = $data->id;

    if($zaposlenik->delete() && in_array($zaposlenik->id, $zaposleniciIds_arr)){
        foreach($putniNalozi_arr as $putniNalogArr){
            $zaposlenici = array();
            if(strlen($putniNalogArr['zaposlenici']) > 1){
                $zaposlenici = explode(",", $putniNalogArr['zaposlenici']);
            }else{
                array_push($zaposlenici, $putniNalogArr['zaposlenici']);
            }
            if (($key = array_search($zaposlenik->id, $zaposlenici)) !== false) {
                unset($zaposlenici[$key]);
                $zaposlenici = array_values($zaposlenici);
            }
            if(sizeof($zaposlenici) == 0){
                $putniNalog->id = $putniNalogArr['id'];
                if($putniNalog->delete() && in_array($putniNalog->id, $putniNaloziIds_arr)){
                    echo json_encode(array("message" => "Putni nalog je uspijesno obrisan zato sto su svi zaposlenici na njemu takoder obrisani."));
                }else{
                    echo json_encode(array("message" => "Doslo je do pogreske kod brisanja putnog naloga ili putni nalog sa odabranim identifikatorom ne postoji."));
                }
            }else{
                $putniNalogArr['zaposlenici'] = '';
                foreach($zaposlenici as $index => $value){
                    if(sizeof($zaposlenici) == 1){
                        $putniNalogArr['zaposlenici'] = $value;
                    }else if ($index == 0){
                        $putniNalogArr['zaposlenici'] = $value.',';
                    }else if ($index + 1 == sizeof($zaposlenici)){
                        $putniNalogArr['zaposlenici'] = $putniNalogArr['zaposlenici'].$value;  
                    }else{
                        $putniNalogArr['zaposlenici'] = $putniNalogArr['zaposlenici'].$value.',';
                    }
                }
                $putniNalog->id = $putniNalogArr['id'];
                $putniNalog->polaziste = $putniNalogArr['polaziste'];
                $putniNalog->odrediste = $putniNalogArr['odrediste'];
                $putniNalog->svrha = $putniNalogArr['svrha'];
                $putniNalog->datumOdlaska = $putniNalogArr['datumOdlaska'];
                $putniNalog->brojDana = $putniNalogArr['brojDana'];
                $putniNalog->zaposlenici = $putniNalogArr['zaposlenici'];
                $putniNalog->odobreno = $putniNalogArr['odobreno'];
                if($putniNalog->update() && in_array($putniNalog->id, $putniNaloziIds_arr)){
                    echo json_encode(array("message" => "Putni nalog je uspijesno azuriran."));
                }else{
                    echo json_encode(array("message" => "Doslo je do pogreske kod azuriranja putnog naloga ili putni nalog sa odabranim identifikatorom ne postoji."));
                }
            }
        }
        echo json_encode(array("message" => "Zaposlenik je uspijesno obrisan."));
    }else{
        echo json_encode(array("message" => "Doslo je do pogreske kod brisanja zaposlenika ili zaposlenik sa odabranim identifikatorom ne postoji."));
    }
?>