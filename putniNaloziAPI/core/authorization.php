<?php
    include_once('../../vendor/autoload.php');
    use \Firebase\JWT\JWT;
    class Authorization{
        private $connection;
        private $key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwdXRuaU5hbG96aUFQSSIsImlhdCI6MTYyNDcxMjk5NSwiZXhwIjoyMDY2NDc2MTk5LCJhdWQiOiJwdXRuaU5hbG96aVVJIiwic3ViIjoiYXV0aCJ9.INGw6OpWtCmwRcnOx0Tsp1k7LLOp8c241KAKpWvAse6f7cUG6wLR_DELCEgK1s3KFHXStynA0eNno6FFk2ommw';

        public function __construct($db){
            $this->connection = $db;
        }

        public function auth(){
            $iat = time();
            $exp = $iat + 999 * 999;
            $payload = array(
                'iss' => "putniNaloziAPI", //Issuer
                'aud' => "localhost", //Audience
                'iat' => $iat, //Issued at
                'exp' => $exp //Expiery date
            );
            $jwt = JWT::encode($payload, $this->key, 'HS512');
            return array(
                'token'=>$jwt,
                'expires' => $exp      
            );
        }
    }
?>