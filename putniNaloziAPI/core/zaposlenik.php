<?php
    include_once('osoba.php');
    class Zaposlenik extends Osoba{
        private $connection;
        private $table = 'zaposlenici';

        public $id;
        public $odjel;
        public $uloga;

        public function __construct($db){
            $this->connection = $db;
        }

        public function read(){
            $query = 'SELECT * FROM '.$this->table.';';
            $statment = $this->connection->prepare($query);
            $statment->execute();
            return $statment;
        }

        public function readSingle(){
            $query = 'SELECT * FROM '.$this->table.' WHERE id = :id LIMIT 1;';
            $statment = $this->connection->prepare($query);
            $statment->bindParam(':id', $this->id);
            $statment->execute();
            $row = $statment->fetch(PDO::FETCH_ASSOC);
            $this->ime = $row['ime'];
            $this->prezime = $row['prezime'];
            $this->odjel = $row['odjel'];
            $this->uloga = $row['uloga'];
        }

        public function create(){
            $query = 'INSERT INTO '.$this->table.' SET ime = :ime, prezime = :prezime, odjel = :odjel, uloga = :uloga;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->ime = htmlspecialchars(strip_tags($this->ime));
            $this->prezime = htmlspecialchars(strip_tags($this->prezime));
            $this->odjel = htmlspecialchars(strip_tags($this->odjel));
            $this->uloga = htmlspecialchars(strip_tags($this->uloga));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':ime', $this->ime);
            $statment->bindParam(':prezime', $this->prezime);
            $statment->bindParam(':odjel', $this->odjel);
            $statment->bindParam(':uloga', $this->uloga);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                echo "Error \n".$statment->error;
                return false;
            }
        }
        public function update(){
            $query = 'UPDATE '.$this->table.' SET ime = :ime, prezime = :prezime, odjel = :odjel, uloga = :uloga WHERE id = :id;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->ime = htmlspecialchars(strip_tags($this->ime));
            $this->prezime = htmlspecialchars(strip_tags($this->prezime));
            $this->odjel = htmlspecialchars(strip_tags($this->odjel));
            $this->uloga = htmlspecialchars(strip_tags($this->uloga));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':id', $this->id);
            $statment->bindParam(':ime', $this->ime);
            $statment->bindParam(':prezime', $this->prezime);
            $statment->bindParam(':odjel', $this->odjel);
            $statment->bindParam(':uloga', $this->uloga);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                echo "Error \n".$statment->error;
                return false;
            }
        }

        public function delete(){
            $query = 'DELETE FROM '.$this->table.' WHERE id = :id';
            $statment = $this->connection->prepare($query);
            $this->id = htmlspecialchars(strip_tags($this->id));
            $statment->bindParam(':id', $this->id);
            if($statment->execute()){
                return true;
            }else{
                echo "Error \n".$statment->error;
                return false;
            }
        }
    }
?>