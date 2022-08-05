<?php
include_once('../../vendor/autoload.php');

use \Firebase\JWT\JWT;

class PutniNalog
{
    private $connection;
    private $table = 'putninalozi';
    private $relationTable = 'zaposlenikputninalog';
    private $key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwdXRuaU5hbG96aUFQSSIsImlhdCI6MTYyNDcxMjk5NSwiZXhwIjoyMDY2NDc2MTk5LCJhdWQiOiJwdXRuaU5hbG96aVVJIiwic3ViIjoiYXV0aCJ9.INGw6OpWtCmwRcnOx0Tsp1k7LLOp8c241KAKpWvAse6f7cUG6wLR_DELCEgK1s3KFHXStynA0eNno6FFk2ommw';

    public $idPutnogNaloga;
    public $polaziste;
    public $odrediste;
    public $svrha;
    public $datumOdlaska;
    public $brojDana;
    public $zaposlenici;
    public $odobreno;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function read()
    {
        $headers = apache_request_headers();
        if (isset($headers['authorization']) || isset($headers['Authorization'])) {
            $token = isset($headers['authorization']) ? str_replace('Bearer ', '', $headers['authorization']) : str_replace('Bearer ', '', $headers['Authorization']);
            try {
                $token = JWT::decode($token, $this->key, array('HS512'));
                $query = '
                        SELECT p.*,z.idZaposlenika, z.ime, z.prezime, o.odjel, u.uloga FROM putninalozi p 
                        LEFT JOIN zaposlenikputninalog zp 
                        ON p.idPutnogNaloga = zp.idPutnogNaloga 
                        LEFT JOIN zaposlenici z 
                        ON z.idZaposlenika = zp.idZaposlenika 
                        LEFT JOIN odjeli o 
                        ON z.odjel = o.id
                        LEFT JOIN uloge u
                        ON z.uloga = u.id;
                    ';
                $statment = $this->connection->prepare($query);
                if ($statment->execute()) {
                    return $statment;
                } else {
                    throw new Exception("Error \n" . $statment->error);
                }
            } catch (Exception $e) {
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        } else {
            throw new Exception("Autorizacijski token nije postavljen. Kontaktirajte administratora.");
        }
    }

    public function readSingle()
    {
        $headers = apache_request_headers();
        if (isset($headers['authorization']) || isset($headers['Authorization'])) {
            $token = isset($headers['authorization']) ? str_replace('Bearer ', '', $headers['authorization']) : str_replace('Bearer ', '', $headers['Authorization']);
            try {
                $token = JWT::decode($token, $this->key, array('HS512'));
                $query = '
                        SELECT p.*,z.idZaposlenika, z.ime, z.prezime, o.odjel, u.uloga FROM putninalozi p 
                        LEFT JOIN zaposlenikputninalog zp 
                        ON p.idPutnogNaloga = zp.idPutnogNaloga 
                        LEFT JOIN zaposlenici z 
                        ON z.idZaposlenika = zp.idZaposlenika 
                        LEFT JOIN odjeli o 
                        ON z.odjel = o.id
                        LEFT JOIN uloge u
                        ON z.uloga = u.id
                        WHERE p.idPutnogNaloga = :idPutnogNaloga
                    ';
                $statment = $this->connection->prepare($query);
                $statment->bindParam(':idPutnogNaloga', $this->idPutnogNaloga);
                if ($statment->execute()) {
                    return $statment;
                } else {
                    throw new Exception("Error \n" . $statment->error);
                }
            } catch (Exception $e) {
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        } else {
            throw new Exception("Autorizacijski token nije postavljen. Kontaktirajte administratora.");
        }
    }

    public function create()
    {
        $headers = apache_request_headers();
        if (isset($headers['authorization']) || isset($headers['Authorization'])) {
            $token = isset($headers['authorization']) ? str_replace('Bearer ', '', $headers['authorization']) : str_replace('Bearer ', '', $headers['Authorization']);
            try {
                $token = JWT::decode($token, $this->key, array('HS512'));
                $query = 'INSERT INTO ' . $this->table . ' SET polaziste = :polaziste, odrediste = :odrediste, svrha = :svrha, datumOdlaska = :datumOdlaska, brojDana = :brojDana, odobreno = :odobreno;';
                $statment = $this->connection->prepare($query);

                //Sets all properties.
                $this->polaziste = htmlspecialchars(strip_tags($this->polaziste));
                $this->odrediste = htmlspecialchars(strip_tags($this->odrediste));
                $this->svrha = htmlspecialchars(strip_tags($this->svrha));
                $this->datumOdlaska = htmlspecialchars(strip_tags($this->datumOdlaska));
                $this->brojDana = htmlspecialchars(strip_tags($this->brojDana));
                $this->odobreno = htmlspecialchars(strip_tags($this->odobreno));

                if (sizeof($this->zaposlenici) == 0) {
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
                if ($statment->execute()) {
                    return true;
                } else {
                    throw new Exception("Error \n" . $statment->error);
                }
            } catch (Exception $e) {
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        } else {
            throw new Exception("Autorizacijski token nije postavljen. Kontaktirajte administratora.");
        }
    }

    public function update()
    {
        $headers = apache_request_headers();
        if (isset($headers['authorization']) || isset($headers['Authorization'])) {
            $token = isset($headers['authorization']) ? str_replace('Bearer ', '', $headers['authorization']) : str_replace('Bearer ', '', $headers['Authorization']);
            try {
                $token = JWT::decode($token, $this->key, array('HS512'));
                $query = 'UPDATE ' . $this->table . ' SET polaziste = :polaziste, odrediste = :odrediste, svrha = :svrha, datumOdlaska = :datumOdlaska, brojDana = :brojDana, odobreno = :odobreno WHERE idPutnogNaloga = :idPutnogNaloga;';
                $statment = $this->connection->prepare($query);

                //Sets all properties.
                $this->idPutnogNaloga = htmlspecialchars(strip_tags($this->idPutnogNaloga));
                $this->polaziste = htmlspecialchars(strip_tags($this->polaziste));
                $this->odrediste = htmlspecialchars(strip_tags($this->odrediste));
                $this->svrha = htmlspecialchars(strip_tags($this->svrha));
                $this->datumOdlaska = htmlspecialchars(strip_tags($this->datumOdlaska));
                $this->brojDana = htmlspecialchars(strip_tags($this->brojDana));
                $this->odobreno = htmlspecialchars(strip_tags($this->odobreno));

                if (sizeof($this->zaposlenici) == 0) {
                    throw new Exception('Putni nalog kod azuriranja mora imati makar jednog zaposlenika.');
                }

                //Bind all the parameters of the query.
                $statment->bindParam(':polaziste', $this->polaziste);
                $statment->bindParam(':odrediste', $this->odrediste);
                $statment->bindParam(':svrha', $this->svrha);
                $statment->bindParam(':datumOdlaska', $this->datumOdlaska);
                $statment->bindParam(':brojDana', $this->brojDana);
                $statment->bindParam(':odobreno', $this->odobreno);
                $statment->bindParam(':idPutnogNaloga', $this->idPutnogNaloga);

                //Try to execute the query if it fails return the error/false on success return true.
                if ($statment->execute()) {
                    return true;
                } else {
                    throw new Exception("Error \n" . $statment->error);
                }
            } catch (Exception $e) {
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        } else {
            throw new Exception("Autorizacijski token nije postavljen. Kontaktirajte administratora.");
        }
    }

    public function delete()
    {
        $headers = apache_request_headers();
        if (isset($headers['authorization']) || isset($headers['Authorization'])) {
            $token = isset($headers['authorization']) ? str_replace('Bearer ', '', $headers['authorization']) : str_replace('Bearer ', '', $headers['Authorization']);
            try {
                $token = JWT::decode($token, $this->key, array('HS512'));
                $query = '
                        DELETE FROM ' . $this->table . ' WHERE idPutnogNaloga = :idPutnogNaloga1;
                        DELETE FROM ' . $this->relationTable . ' WHERE idPutnogNaloga = :idPutnogNaloga2;
                    ';
                $statment = $this->connection->prepare($query);
                $this->idPutnogNaloga = htmlspecialchars(strip_tags($this->idPutnogNaloga));
                $statment->bindParam(':idPutnogNaloga1', $this->idPutnogNaloga);
                $statment->bindParam(':idPutnogNaloga2', $this->idPutnogNaloga);
                if ($statment->execute()) {
                    return true;
                } else {
                    throw new Exception("Error \n" . $statment->error);
                }
            } catch (Exception $e) {
                throw new Exception("Autorizacijski token je neispravan ili niste autorizirani. Kontaktirajte administratora.");
            }
        } else {
            throw new Exception("Autorizacijski token nije postavljen. Kontaktirajte administratora.");
        }
    }

    public function getIds()
    {
        $query = 'SELECT idPutnogNaloga FROM ' . $this->table . ';';
        $statment = $this->connection->prepare($query);
        if ($statment->execute()) {
            return $statment;
        } else {
            throw new Exception("Error \n" . $statment->error);
        }
    }
}
