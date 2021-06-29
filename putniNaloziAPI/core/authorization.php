<?php
    include_once('../../vendor/autoload.php');
    use \Firebase\JWT\JWT;
    class Authorization{
        private $connection;
        private $table = 'korisnici';
        private $key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwdXRuaU5hbG96aUFQSSIsImlhdCI6MTYyNDcxMjk5NSwiZXhwIjoyMDY2NDc2MTk5LCJhdWQiOiJwdXRuaU5hbG96aVVJIiwic3ViIjoiYXV0aCJ9.INGw6OpWtCmwRcnOx0Tsp1k7LLOp8c241KAKpWvAse6f7cUG6wLR_DELCEgK1s3KFHXStynA0eNno6FFk2ommw';
        
        public $korisnickoIme;
        public $lozinka;

        public function __construct($db){
            $this->connection = $db;
        }

        public function auth(){
            $query = 'SELECT korisnickoIme, rola FROM '.$this->table.' WHERE korisnickoIme = :korisnickoIme AND lozinka = :lozinka';
            $this->korisnickoIme = htmlspecialchars(strip_tags($this->korisnickoIme));
            $statment = $this->connection->prepare($query);
            $statment->bindParam(':korisnickoIme', $this->korisnickoIme);
            $statment->bindParam(':lozinka', $this->lozinka);
            $statment->execute();
            if($statment->rowCount() == 1){
                $iat = time();
                $exp = $iat + 999 * 999;
                $payload = array(
                    'iss' => "putniNaloziAPI", //Issuer
                    'aud' => "localhost", //Audience
                    'iat' => $iat, //Issued at
                    'exp' => $exp //Expiery date
                );
                $jwt = JWT::encode($payload, $this->key, 'HS512');
                $row = $statment->fetch(PDO::FETCH_ASSOC);
                return array(
                    'username' => $this->korisnickoIme,
                    'role' => $row['rola'],
                    'token'=>$jwt,
                    'expires' => $exp
                );
            }else{
                throw new Exception("Krivo korisnicko ime ili lozinka!");
            }
        }
        public function register(){
            $query = 'SELECT korisnickoIme FROM '.$this->table.' WHERE korisnickoIme = :korisnickoIme';
            $this->korisnickoIme = htmlspecialchars(strip_tags($this->korisnickoIme));
            $statment = $this->connection->prepare($query);
            $statment->bindParam(':korisnickoIme', $this->korisnickoIme);
            $statment->execute();
            if($statment->rowCount() > 0){throw new Exception("Korisnicko ime vec postoji.");}
            $query = 'INSERT INTO '.$this->table.' SET korisnickoIme = :korisnickoIme, lozinka = :lozinka;';
            $statment = $this->connection->prepare($query);
            
            //Sets all properties.
            $this->korisnickoIme = htmlspecialchars(strip_tags($this->korisnickoIme));
            $this->lozinka = htmlspecialchars(strip_tags($this->lozinka));
            
            //Bind all the parameters of the query.
            $statment->bindParam(':korisnickoIme', $this->korisnickoIme);
            $statment->bindParam(':lozinka', $this->lozinka);
            
            //Try to execute the query if it fails return the error/false on success return true.
            if($statment->execute()){
                return true;
            }else{
                throw new Exception("Error \n".$statment->error);
            }
        }
    }
?>