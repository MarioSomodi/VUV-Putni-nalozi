<?php
    include_once('osoba.php');
    include_once('../../vendor/autoload.php');
    use \Firebase\JWT\JWT;
    class Zaposlenik extends Osoba{
        private $connection;
        private $table = 'zaposlenici';
        private $relationTable = 'zaposlenikputninalog';
        private $key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwdXRuaU5hbG96aUFQSSIsImlhdCI6MTYyNDcxMjk5NSwiZXhwIjoyMDY2NDc2MTk5LCJhdWQiOiJwdXRuaU5hbG96aVVJIiwic3ViIjoiYXV0aCJ9.INGw6OpWtCmwRcnOx0Tsp1k7LLOp8c241KAKpWvAse6f7cUG6wLR_DELCEgK1s3KFHXStynA0eNno6FFk2ommw';

        public $idZaposlenika;
        public $odjel;
        public $uloga;
        public $slobodan;

        public function __construct($db){
            $this->connection = $db;
        }

        public function read(){
            $headers = apache_request_headers();
            if(isset($headers['Authorization'])){
                $token = str_replace('Bearer ', '', $headers['Authorization']);
                try{
                    $query = '
                        SELECT z.idZaposlenika, z.ime, z.prezime, z.slobodan, o.odjel, u.uloga FROM zaposlenici z
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
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }

        public function readSingle(){
            $headers = apache_request_headers();
            if(isset($headers['Authorization'])){
                $token = str_replace('Bearer ', '', $headers['Authorization']);
                try{
                    $query = '
                        SELECT z.idZaposlenika, z.ime, z.prezime, z.slobodan, o.odjel, u.uloga FROM zaposlenici z
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
                    $this->slobodan = $row['slobodan'];
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }

        public function create(){
            $headers = apache_request_headers();
            if(isset($headers['Authorization'])){
                $token = str_replace('Bearer ', '', $headers['Authorization']);
                try{
                    $query = 'INSERT INTO '.$this->table.' SET ime = :ime, prezime = :prezime, odjel = :odjel, uloga = :uloga, slobodan = 1;';
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
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }
        public function update(){
            $headers = apache_request_headers();
            if(isset($headers['Authorization'])){
                $token = str_replace('Bearer ', '', $headers['Authorization']);
                try{
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
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }

        public function delete(){
            $headers = apache_request_headers();
            if(isset($headers['Authorization'])){
                $token = str_replace('Bearer ', '', $headers['Authorization']);
                try{
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
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }

        public function addToPutniNalog($idPutnogNaloga){
            $headers = apache_request_headers();
            if(isset($headers['Authorization'])){
                $token = str_replace('Bearer ', '', $headers['Authorization']);
                try{
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
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }
        public function removeFromPutniNalog($idPutnogNaloga){
            $headers = apache_request_headers();
            if(isset($headers['Authorization'])){
                $token = str_replace('Bearer ', '', $headers['Authorization']);
                try{
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
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }
        public function updateAvailable(){
            $headers = apache_request_headers();
            if(isset($headers['Authorization'])){
                $token = str_replace('Bearer ', '', $headers['Authorization']);
                try{
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
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }
    }
?>