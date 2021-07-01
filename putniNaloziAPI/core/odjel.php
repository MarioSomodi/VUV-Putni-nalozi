<?php
    include_once('../../vendor/autoload.php');
    use \Firebase\JWT\JWT;
    class Odjel{
        private $connection;
        private $key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwdXRuaU5hbG96aUFQSSIsImlhdCI6MTYyNDcxMjk5NSwiZXhwIjoyMDY2NDc2MTk5LCJhdWQiOiJwdXRuaU5hbG96aVVJIiwic3ViIjoiYXV0aCJ9.INGw6OpWtCmwRcnOx0Tsp1k7LLOp8c241KAKpWvAse6f7cUG6wLR_DELCEgK1s3KFHXStynA0eNno6FFk2ommw';
        private $table = 'odjeli';

        public $id;
        public $odjel;

        public function __construct($db){
            $this->connection = $db;
        }

        public function read(){
            $headers = apache_request_headers();
            if(isset($headers['authorization'])){
                $token = str_replace('Bearer ', '', $headers['authorization']);
                try{
                    $token = JWT::decode($token, $this->key, array('HS512'));
                    $query = 'SELECT * FROM '.$this->table.';';
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
            if(isset($headers['authorization'])){
                $token = str_replace('Bearer ', '', $headers['authorization']);
                try{
                    $token = JWT::decode($token, $this->key, array('HS512'));
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
                    $this->odjel = $row['odjel'];
                }catch(Exception $e){
                    throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
                }
            }else{
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        }

        public function create(){
            $headers = apache_request_headers();
            if(isset($headers['authorization'])){
                $token = str_replace('Bearer ', '', $headers['authorization']);
                try{
                    $token = JWT::decode($token, $this->key, array('HS512'));
                    $query = 'INSERT INTO '.$this->table.' SET odjel = :odjel;';
                    $statment = $this->connection->prepare($query);
                    
                    //Sets all properties.
                    $this->odjel = htmlspecialchars(strip_tags($this->odjel));
                    
                    //Bind all the parameters of the query.
                    $statment->bindParam(':odjel', $this->odjel);
                    
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
            if(isset($headers['authorization'])){
                $token = str_replace('Bearer ', '', $headers['authorization']);
                try{
                    $token = JWT::decode($token, $this->key, array('HS512'));
                    $query = 'UPDATE '.$this->table.' SET odjel = :odjel WHERE id = :id;';
                    $statment = $this->connection->prepare($query);
                    
                    //Sets all properties.
                    $this->odjel = htmlspecialchars(strip_tags($this->odjel));
                    
                    //Bind all the parameters of the query.
                    $statment->bindParam(':id', $this->id);
                    $statment->bindParam(':odjel', $this->odjel);
                    
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
            if(isset($headers['authorization'])){
                $token = str_replace('Bearer ', '', $headers['authorization']);
                try{
                    $token = JWT::decode($token, $this->key, array('HS512'));
                    $query = '
                        DELETE FROM '.$this->table.' WHERE id = :id;
                        UPDATE zaposlenici SET odjel = 1 WHERE odjel = :id;
                    ';
                    $statment = $this->connection->prepare($query);
                    $this->id = htmlspecialchars(strip_tags($this->id));
                    $statment->bindParam(':id', $this->id);
                    if($this->id == 1){
                        throw new Exception("Nije dozvoljeno obrisati zadani odjel.");
                    }
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