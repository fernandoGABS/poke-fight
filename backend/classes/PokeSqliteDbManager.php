<?php

/**
 * Class PokeSqliteDbManager
 *
 * Manages SQLite database operations including executing queries, fetching data,
 * and transaction management.
 */
class PokeSqliteDbManager
{
    private $pdo;

    /*
     * PokeSqliteDbManager constructor.
     *
     * Initializes a PDO connection to the SQLite database using the provided database file.
     */
    public function __construct($dbFile)
    {
        if (!file_exists($dbFile)) {
            throw new Exception("Database file not found: $dbFile");
        }
        try {
            $this->pdo = new PDO("sqlite:" . $dbFile);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            throw new Exception("PDO Connection Error: " . $e->getMessage());
        }
    }

    /*
     * Executes a prepared statement query with optional parameters.
     */
    public function execute($query, $params = [])
    {
        try {
            $stmt = $this->pdo->prepare($query);
            $success = $stmt->execute($params);
            return array(
                "status" => 200,
                "data" => $success,
                "msg" => "Successful"
            );
        } catch (PDOException $e) {
            return array(
                "status" => 400,
                "data" => null,
                "msg" => "PDOException: " . $e->getMessage()
            );
        } catch (Exception $e) {
            return array(
                "status" => 500,
                "data" => null,
                "msg" => "Exception: " . $e->getMessage()
            );
        }
    }

    /*
     * Executes a prepared statement query with optional parameters and fetches all rows.
     */
    public function query($query, $params = [])
    {
        try {
            $stmt = $this->pdo->prepare($query);
            $stmt->execute($params);
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return array(
                "status" => 200,
                "data" => $results,
                "msg" => "Successful"
            );
        } catch (PDOException $e) {
            return array(
                "status" => 400,
                "data" => null,
                "msg" => "PDOException: " . $e->getMessage()
            );
        } catch (Exception $e) {
            return array(
                "status" => 500,
                "data" => null,
                "msg" => "Exception: " . $e->getMessage()
            );
        }
    }

    /*
     * Executes a prepared statement query with optional parameters and fetches a single row.
     */
    public function query_single($query, $params = [])
    {
        try {
            $stmt = $this->pdo->prepare($query);
            $stmt->execute($params);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result === false) {
                return array(
                    "status" => 404,
                    "data" => null,
                    "msg" => "No record found"
                );
            }
            return array(
                "status" => 200,
                "data" => $result,
                "msg" => "Successful"
            );
        } catch (PDOException $e) {
            return array(
                "status" => 400,
                "data" => null,
                "msg" => "PDOException: " . $e->getMessage()
            );
        } catch (Exception $e) {
            return array(
                "status" => 500,
                "data" => null,
                "msg" => "Exception: " . $e->getMessage()
            );
        }
    }

    /*
     * Retrieves the ID of the last inserted row.
     */
    public function last_inserted_id()
    {
        try {
            return $this->pdo->lastInsertId();
        } catch (PDOException $e) {
            return null;
        } catch (Exception $e) {
            return null;
        }
    }
}
