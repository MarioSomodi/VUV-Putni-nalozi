<?php
//Headers.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//Instantiate.
$putniNalozi = new PutniNalog($database);

//Arrays that are gonna hold all the data recevied from the DB.
$putniNaloziIds_arr = array();

//Reading data from DB
$resultPutniNalozi = $putniNalozi->getIds();
$numPutniNalozi = $resultPutniNalozi->rowCount();

//Checking if there is data fill the arrays if not give an error message.
if ($numPutniNalozi > 0) {
    while ($row = $resultPutniNalozi->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($putniNaloziIds_arr, $idPutnogNaloga);
    }
}
