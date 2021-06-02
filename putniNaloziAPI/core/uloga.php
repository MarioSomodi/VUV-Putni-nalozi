<?php
    class Uloga{
        private $connection;
        private $table = 'uloge';

        public $id;
        public $uloga;

        public function __construct($db){
            $this->connection = $db;
        }

        public function read(){
            $query = 'SELECT * FROM '.$this->table.';';
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
                SELECT * FROM '.$this->table.'
                WHERE id = :id 
                LIMIT 1;
            ';
            $statment = $this->connection->prepare($query);
            $statment->bindParam(':id', $this->id);
            if(!$statment->execute()){
                throw new Exception("Error \n".$statment->error);
            }
            $row = $statment->fetch(PDO::FETCH_ASSOC);
            $this->uloga = $row['uloga'];
        }

        public function create(){
            $query = 'INSERT INTO '.$this->table.' SET uloga = :uloga;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->uloga = htmlspecialchars(strip_tags($this->uloga));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':uloga', $this->uloga);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }
        public function update(){
            $query = 'UPDATE '.$this->table.' SET uloga = :uloga WHERE id = :id;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->uloga = htmlspecialchars(strip_tags($this->uloga));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':id', $this->id);
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
                DELETE FROM '.$this->table.' WHERE id = :id;
                UPDATE zaposlenici SET uloga = 1 WHERE uloga = :id;
            ';
            $statment = $this->connection->prepare($query);
            $this->id = htmlspecialchars(strip_tags($this->id));
            $statment->bindParam(':id', $this->id);
            if($this->id == 1){
                throw new Exception("Nije dozvoljeno obrisati zadanu ulogu.");
            }
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }
    }
?>