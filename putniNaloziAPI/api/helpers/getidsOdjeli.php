<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Instantiate.
$odjel = new Odjel($database);

//Arrays that are gonna hold all the data recevied from the DB.
$odjeliIds_arr = array();

//Reading data from DB
$resultOdjeli = $odjel->read();
$numOdjeli = $resultOdjeli->rowCount();

//Checking if there is data fill the arrays if not give an error message.
if ($numOdjeli > 0) {
    while ($row = $resultOdjeli->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($odjeliIds_arr, $id);
    }
}
