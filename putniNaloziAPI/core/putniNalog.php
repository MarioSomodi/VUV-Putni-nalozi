<?php
    class PutniNalog{
        private $connection;
        private $table = 'putninalozi';

        public $id;
        public $polaziste;
        public $odrediste;
        public $svrha;
        public $datumOdlaska;
        public $brojDana;
        public $zaposlenici;
        public $odobreno;

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
            $this->polaziste = $row['polaziste'];
            $this->odrediste = $row['odrediste'];
            $this->svrha = $row['svrha'];
            $this->datumOdlaska = $row['datumOdlaska'];
            $this->brojDana = $row['brojDana'];
            $this->zaposlenici = $row['zaposlenici'];
            $this->odobreno = $row['odobreno'];
        }

        public function create(){
            $query = 'INSERT INTO '.$this->table.' SET polaziste = :polaziste, odrediste = :odrediste, svrha = :svrha, datumOdlaska = :datumOdlaska, brojDana = :brojDana, zaposlenici = :zaposlenici, odobreno = :odobreno;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->polaziste = htmlspecialchars(strip_tags($this->polaziste));
            $this->odrediste = htmlspecialchars(strip_tags($this->odrediste));
            $this->svrha = htmlspecialchars(strip_tags($this->svrha));
            $this->datumOdlaska = htmlspecialchars(strip_tags($this->datumOdlaska));
            $this->brojDana = htmlspecialchars(strip_tags($this->brojDana));
            $this->zaposlenici = htmlspecialchars(strip_tags($this->zaposlenici));
            $this->odobreno = htmlspecialchars(strip_tags($this->odobreno));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':polaziste', $this->polaziste);
            $statment->bindParam(':odrediste', $this->odrediste);
            $statment->bindParam(':svrha', $this->svrha);
            $statment->bindParam(':datumOdlaska', $this->datumOdlaska);
            $statment->bindParam(':brojDana', $this->brojDana);
            $statment->bindParam(':zaposlenici', $this->zaposlenici);
            $statment->bindParam(':odobreno', $this->odobreno);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                echo "Error \n".$statment->error;
                return false;
            }
        }

        public function update(){
            $query = 'UPDATE '.$this->table.' SET polaziste = :polaziste, odrediste = :odrediste, svrha = :svrha, datumOdlaska = :datumOdlaska, brojDana = :brojDana, zaposlenici = :zaposlenici, odobreno = :odobreno WHERE id = :id;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->polaziste = htmlspecialchars(strip_tags($this->polaziste));
            $this->odrediste = htmlspecialchars(strip_tags($this->odrediste));
            $this->svrha = htmlspecialchars(strip_tags($this->svrha));
            $this->datumOdlaska = htmlspecialchars(strip_tags($this->datumOdlaska));
            $this->brojDana = htmlspecialchars(strip_tags($this->brojDana));
            $this->zaposlenici = htmlspecialchars(strip_tags($this->zaposlenici));
            $this->odobreno = htmlspecialchars(strip_tags($this->odobreno));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':polaziste', $this->polaziste);
            $statment->bindParam(':odrediste', $this->odrediste);
            $statment->bindParam(':svrha', $this->svrha);
            $statment->bindParam(':datumOdlaska', $this->datumOdlaska);
            $statment->bindParam(':brojDana', $this->brojDana);
            $statment->bindParam(':zaposlenici', $this->zaposlenici);
            $statment->bindParam(':odobreno', $this->odobreno);
            $statment->bindParam(':id', $this->id);
            
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