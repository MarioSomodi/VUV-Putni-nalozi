<?php
    //Headers.
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/JSON');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //Include init file.
    include_once('../../core/initialize.php');

    //Instantiate.
    $ulogaObj = new Uloga($database);

    //Arrays that are gonna hold all the data recevied from the DB.
    $uloge = array();

    //Reading data from DB
    try{
        $resultUloge = $ulogaObj->read();
        $numUloge = $resultUloge->rowCount();
        
        //Checking if there is data fill the array if not give an error message.
        if($numUloge > 0){
            while($row = $resultUloge->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $uloga_item = array(
                    'id' => $id,
                    'uloga' => $uloga
                );
                array_push($uloge, $uloga_item);
            }
            echo json_encode($uloge);
        }else{
            echo json_encode(array('message' => 'Nema uloga.'));
        }
    }catch(Exception $e){
        echo json_encode(array(
            "message" => "Doslo je do pogreske kod ucitavanja podataka o ulogama.",
            "error" => $e->getMessage()
        ));
    };
?>