<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $odjelObj = new Odjel($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $odjeli = array();

    //Reading data from DB
    try{
        $resultOdjeli = $odjelObj->read();
        $numOdjeli = $resultOdjeli->rowCount();
        
        //Checking if there is data fill the array if not give an error message.
        if($numOdjeli > 0){
            while($row = $resultOdjeli->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $odjel_item = array(
                    'id' => $id,
                    'odjel' => $odjel
                );
                array_push($odjeli, $odjel_item);
            }
            echo json_encode($odjeli);
        }else{
            echo json_encode(array('message' => 'Nema odijela.'));
        }
    }catch(Exception $e){
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod ucitavanja podataka o odijelima.",
            "error" => $e->getMessage()
        ));
    };
?>