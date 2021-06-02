<?php
    include_once('osoba.php');
    class Zaposlenik extends Osoba{
        private $connection;
        private $table = 'zaposlenici';
        private $relationTable = 'zaposlenikputninalog';

        public $idZaposlenika;
        public $odjel;
        public $uloga;
        public $slobodan;

        public function __construct($db){
            $this->connection = $db;
        }

        public function read(){
            $query = '
                SELECT z.idZaposlenika, z.ime, z.prezime, o.odjel, u.uloga FROM zaposlenici z
                JOIN odjeli o 
                ON z.odjel = o.id
                JOIN uloge u
                ON z.uloga = u.id
            ';
            $statment = $this->connection->prepare($query);
            $statment->execute();
            if($statment->execute()){
                return $statment;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }

        public function readSingle(){
            $query = '
                SELECT z.idZaposlenika, z.ime, z.prezime, o.odjel, u.uloga FROM zaposlenici z
                JOIN odjeli o 
                ON z.odjel = o.id
                JOIN uloge u
                ON z.uloga = u.id
                WHERE idZaposlenika = :idZaposlenika 
                LIMIT 1;
            ';
            $statment = $this->connection->prepare($query);
            $statment->bindParam(':idZaposlenika', $this->idZaposlenika);
            if(!$statment->execute()){
                throw new Exception("Error \n".$statment->error);
            }
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
                throw new Exception("Error \n".$statment->error);
            }
        }
        public function update(){
            $query = 'UPDATE '.$this->table.' SET ime = :ime, prezime = :prezime, odjel = :odjel, uloga = :uloga WHERE idZaposlenika = :idZaposlenika;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->idZaposlenika = htmlspecialchars(strip_tags($this->idZaposlenika));
            $this->ime = htmlspecialchars(strip_tags($this->ime));
            $this->prezime = htmlspecialchars(strip_tags($this->prezime));
            $this->odjel = htmlspecialchars(strip_tags($this->odjel));
            $this->uloga = htmlspecialchars(strip_tags($this->uloga));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':idZaposlenika', $this->idZaposlenika);
            $statment->bindParam(':ime', $this->ime);
            $statment->bindParam(':prezime', $this->prezime);
            $statment->bindParam(':odjel', $this->odjel);
            $statment->bindParam(':uloga', $this->uloga);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }

        public function delete(){
            $query = '
                DELETE FROM '.$this->table.' WHERE idZaposlenika = :idZaposlenika;
                DELETE FROM '.$this->relationTable.' WHERE idZaposlenika = :idZaposlenika;
                DELETE FROM putninalozi 
                WHERE (
                    SELECT COUNT(putninalozi.idPutnogNaloga) FROM zaposlenikputninalog 
                    WHERE zaposlenikputninalog.idPutnogNaloga = putninalozi.idPutnogNaloga
                ) = 0;
            ';
            $statment = $this->connection->prepare($query);
            $this->idZaposlenika = htmlspecialchars(strip_tags($this->idZaposlenika));
            $statment->bindParam(':idZaposlenika', $this->idZaposlenika);
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }

        public function addToPutniNalog($idPutnogNaloga){
            $query = 'INSERT INTO '.$this->relationTable.' SET idPutnogNaloga = :idPutnogNaloga, idZaposlenika = :idZaposlenika;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->idZaposlenika = htmlspecialchars(strip_tags($this->idZaposlenika));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':idPutnogNaloga', $idPutnogNaloga);
            $statment->bindParam(':idZaposlenika', $this->idZaposlenika);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }
        public function removeFromPutniNalog($idPutnogNaloga){
            $query = 'DELETE FROM '.$this->relationTable.' WHERE idPutnogNaloga = :idPutnogNaloga';
            $statment = $this->connection->prepare($query);
            
            //Bind all the parameters of the query.
            $statment->bindParam(':idPutnogNaloga', $idPutnogNaloga);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }
        public function updateAvailable(){
            $query = 'UPDATE '.$this->table.' SET slobodan = :slobodan WHERE idZaposlenika = :idZaposlenika;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->idZaposlenika = htmlspecialchars(strip_tags($this->idZaposlenika));
            $this->slobodan = htmlspecialchars(strip_tags($this->slobodan));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':idZaposlenika', $this->idZaposlenika);
            $statment->bindParam(':slobodan', $this->slobodan);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }
    }
?>