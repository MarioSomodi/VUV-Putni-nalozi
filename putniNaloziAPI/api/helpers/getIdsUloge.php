<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Instantiate.
$uloga = new Uloga($database);

//Arrays that are gonna hold all the data recevied from the DB.
$ulogeIds_arr = array();

//Reading data from DB
$resultUloge = $uloga->read();
$numUloge = $resultUloge->rowCount();

//Checking if there is data fill the arrays if not give an error message.
if ($numUloge > 0) {
    while ($row = $resultUloge->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($ulogeIds_arr, $id);
    }
}
