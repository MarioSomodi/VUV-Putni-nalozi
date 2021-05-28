<?php
    //Database info
    $databaseUser = 'root';
    $databasePassword = '';
    $databaseName = 'vuvputninalozi';

    //Connection to the database
    $database = new PDO('mysql:host=localhost;dbname='.$databaseName.';charset=utf8', $databaseUser, $databasePassword);

    //Database attributes
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
    $database->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //Defining app name
    define('APP_NAME', 'VUV Putni nalozi REST API');
?>