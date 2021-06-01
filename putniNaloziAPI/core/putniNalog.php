<?php
    class PutniNalog{
        private $connection;
        private $table = 'putninalozi';
        private $relationTable = 'zaposlenikputninalog';

        public $idPutnogNaloga;
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
            $query = '
                SELECT p.*, z.* FROM putninalozi p 
                JOIN zaposlenikputninalog zp
                ON p.idPutnogNaloga = zp.idPutnogNaloga
                JOIN zaposlenici z
                ON z.idZaposlenika = zp.idZaposlenika;
            ';
            $statment = $this->connection->prepare($query);
            if($statment->execute()){
                return $statment;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }

        public function readSingle(){
            $query = '
                SELECT p.*, z.* FROM putninalozi p 
                JOIN zaposlenikputninalog zp 
                ON p.idPutnogNaloga = zp.idPutnogNaloga 
                JOIN zaposlenici z 
                ON z.idZaposlenika = zp.idZaposlenika 
                WHERE zp.idPutnogNaloga = :idPutnogNaloga
            ';
            $statment = $this->connection->prepare($query);
            $statment->bindParam(':idPutnogNaloga', $this->idPutnogNaloga);
            if($statment->execute()){
                return $statment;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }

        public function create(){
            $query = 'INSERT INTO '.$this->table.' SET polaziste = :polaziste, odrediste = :odrediste, svrha = :svrha, datumOdlaska = :datumOdlaska, brojDana = :brojDana, odobreno = :odobreno;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->polaziste = htmlspecialchars(strip_tags($this->polaziste));
            $this->odrediste = htmlspecialchars(strip_tags($this->odrediste));
            $this->svrha = htmlspecialchars(strip_tags($this->svrha));
            $this->datumOdlaska = htmlspecialchars(strip_tags($this->datumOdlaska));
            $this->brojDana = htmlspecialchars(strip_tags($this->brojDana));
            $this->odobreno = htmlspecialchars(strip_tags($this->odobreno));

            if(sizeof($this->zaposlenici) == 0){
                throw new Exception('Putni nalog mora imati makar jednog zaposlenika.');
            }
            
            //Bind all the parameters of the query.
            $statment->bindParam(':polaziste', $this->polaziste);
            $statment->bindParam(':odrediste', $this->odrediste);
            $statment->bindParam(':svrha', $this->svrha);
            $statment->bindParam(':datumOdlaska', $this->datumOdlaska);
            $statment->bindParam(':brojDana', $this->brojDana);
            $statment->bindParam(':odobreno', $this->odobreno);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }

        public function update(){
            $query = 'UPDATE '.$this->table.' SET polaziste = :polaziste, odrediste = :odrediste, svrha = :svrha, datumOdlaska = :datumOdlaska, brojDana = :brojDana, odobreno = :odobreno WHERE idPutnogNaloga = :idPutnogNaloga;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->idPutnogNaloga = htmlspecialchars(strip_tags($this->idPutnogNaloga));
            $this->polaziste = htmlspecialchars(strip_tags($this->polaziste));
            $this->odrediste = htmlspecialchars(strip_tags($this->odrediste));
            $this->svrha = htmlspecialchars(strip_tags($this->svrha));
            $this->datumOdlaska = htmlspecialchars(strip_tags($this->datumOdlaska));
            $this->brojDana = htmlspecialchars(strip_tags($this->brojDana));
            $this->odobreno = htmlspecialchars(strip_tags($this->odobreno));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':polaziste', $this->polaziste);
            $statment->bindParam(':odrediste', $this->odrediste);
            $statment->bindParam(':svrha', $this->svrha);
            $statment->bindParam(':datumOdlaska', $this->datumOdlaska);
            $statment->bindParam(':brojDana', $this->brojDana);
            $statment->bindParam(':odobreno', $this->odobreno);
            $statment->bindParam(':idPutnogNaloga', $this->idPutnogNaloga);

            if(sizeof($this->zaposlenici) == 0){
                throw new Exception('Putni nalog mora imati makar jednog zaposlenika.');
            }
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
               throw new Exception("Error \n".$statment->error);
            }
        }

        public function delete(){
            $query = '
                DELETE FROM '.$this->table.' WHERE idPutnogNaloga = :idPutnogNaloga1;
                DELETE FROM '.$this->relationTable.' WHERE idPutnogNaloga = :idPutnogNaloga2;
            ';
            $statment = $this->connection->prepare($query);
            $this->idPutnogNaloga = htmlspecialchars(strip_tags($this->idPutnogNaloga));
            $statment->bindParam(':idPutnogNaloga1', $this->idPutnogNaloga);
            $statment->bindParam(':idPutnogNaloga2', $this->idPutnogNaloga);
            if($statment->execute()){
                return true;
            }else{
               throw new Exception("Error \n".$statment->error);
            }
        }

        public function getIds(){
            $query = 'SELECT idPutnogNaloga FROM '.$this->table.';';
            $statment = $this->connection->prepare($query);
            if($statment->execute()){
                return $statment;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }
    }
?>