<?php

/**
 * Class PokeLogManager
 *
 * Manages logging operations to a specified log file.
 */
class PokeLogManager
{
    private $poke_log_file;

    /*
     * Constructor for PokeLogManager class.
     *
     * Initializes a PokeLogManager instance with the specified log file path.
     * If the file doesn't exist, it creates an empty file.
     */
    public function __construct($poke_log_path)
    {
        if (!file_exists($poke_log_path)) {
            file_put_contents($poke_log_path, '');
        } else {
            $this->poke_log_file = $poke_log_path;
        }
    }

    /*
     * Writes a log message to the log file with current timestamp.
     */
    public function write_pokelog($message)
    {
        date_default_timezone_set('America/Mexico_City');
        $date = date('d/m/Y H:i:s');
        $logMessage = "[$date] $message" . PHP_EOL;
        if (file_put_contents($this->poke_log_file, $logMessage, FILE_APPEND)) {
            return array(
                "status" => 200,
                "information" => null,
                "msg" => "Log was updated successfully"
            );
        }
        return array(
            "status" => 400,
            "information" => null,
            "msg" => "Error trying to write in the log file"
        );
    }

    /*
     * Reads the contents of the log file and returns it as HTML-formatted text.
     */
    public function read_pokelog()
    {
        $logfile_content = "";
        if (file_exists($this->poke_log_file)) {
            $logfile_content = file_get_contents($this->poke_log_file);
        }
        return array(
            "status" => 200,
            "information" => $logfile_content,
            "msg" => ""
        );
    }
}
