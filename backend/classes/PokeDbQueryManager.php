<?php
require "PokeSqliteDbManager.php";

/*
 * Class PokeDbQueryManager
 *
 * Manages database queries and operations using SQLite.
 */
class PokeDbQueryManager
{
    private $pokeSqlite;

    /*
     * PokeDbQueryManager constructor.
     * Initializes a PokeDbQueryManager instance with the specified SQLite database path.
     * If the database file doesn't exist, it creates an empty file and installs necessary tables.
     */
    public function __construct($poke_sqlite_path)
    {
        if (!file_exists($poke_sqlite_path)) {
            file_put_contents($poke_sqlite_path, '');
            $this->pokeSqlite = new PokeSqliteDbManager($poke_sqlite_path);
            $this->install();
        } else {
            $this->pokeSqlite = new PokeSqliteDbManager($poke_sqlite_path);
        }
    }

    /*
     * Installs the necessary tables in the SQLite database if they do not exist
     */
    private function install()
    {
        try {
            $this->pokeSqlite->execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, user_password TEXT, user_email TEXT)");
            $this->register_user("ash@pokemon.com", "123456");
            return array(
                "status" => 200,
                "msg" => "Installation was successful"
            );
        } catch (Exception $e) {
            return array(
                "status" => 500,
                "msg" => $e->getMessage()
            );
        }
    }

    /*
     * Registers a new user in the database
     */
    public function register_user($user, $password)
    {
        try {
            if ($this->is_user_registered($user)) {
                return array(
                    "status" => 400,
                    "information" => null,
                    "msg" => "User already exists"
                );
            } else {
                return $this->pokeSqlite->execute("INSERT INTO users (user_email, user_password) VALUES (?, ?)", [$user, $password]);
            }
        } catch (Exception $e) {
            return array(
                "status" => 500,
                "information" => null,
                "msg" => $e->getMessage()
            );
        }
    }

    /*
     * Checks if a user is registered in the database.
     */
    public function is_user_registered($user)
    {
        try {
            $found = $this->pokeSqlite->query_single("SELECT id, user_email, user_password FROM users WHERE user_email=?", [$user]);
            if (is_null($found["information"])) {
                return false;
            }
            return (count($found) > 0);
        } catch (Exception $e) {
            return false;
        }
    }

    /*
     * Retrieves user information for login validation.
     */
    public function get_user_login($user, $password)
    {
        return $this->pokeSqlite->query_single("SELECT id, user_email FROM users WHERE user_email=? AND user_password=?;", [$user, $password]);
    }
}
