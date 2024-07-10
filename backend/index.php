<?php
/*
 * POKEMON MIDDLEWARE V1.0 
 *
 * Simple PHP script that handles operations like write/read log and add/query users
 * 
 */

header('Content-Type: application/json');
//Declaration classes
require_once "classes/PokeDbQueryManager.php";
require_once "classes/PokeLogManager.php";

//In productive environments this should be added on a env file, this case will be used here
define("POKE_SQLITE_PATH", "pokedb.sqlite");
define("POKE_LOG_PATH", "poke.log");


//default response:
$server_response = array(
    "status" => 500,
    "data" => null,
    "msg" => "Internal server error"
);

//This middleware allows only POST methods:
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "POST") {
    //Let's start
    $db = new PokeDbQueryManager(POKE_SQLITE_PATH);
    $log = new PokeLogManager(POKE_LOG_PATH);
    $action = filter_input(INPUT_POST, 'action');

    switch ($action) {
        case "login":
            $user_name = filter_input(INPUT_POST, 'user_name');
            $user_password = filter_input(INPUT_POST, 'user_password');
            $server_response = $db->get_user_login($user_name, $user_password);
            break;
        case "signup":
            $user_name = filter_input(INPUT_POST, 'user_name');
            $user_password = filter_input(INPUT_POST, 'user_password');
            $server_response = $db->register_user($user_name, $user_password);
            if ($server_response["status"] == 200) {
                $server_response = $db->get_user_login($user_name, $user_password);
            }
            break;
        case "log-read":
            $server_response = $log->read_pokelog();
            break;
        case "log-write":
            $message_log = filter_input(INPUT_POST, 'message_log');
            $server_response = $log->write_pokelog($message_log);
            break;
        default:
            $server_response['msg'] = "Method not allowed";
            $server_response['status'] = 405;
    }
} else {
    $server_response['msg'] = "Method not allowed";
    $server_response['status'] = 405;
}
http_response_code($server_response['status']);
echo json_encode($server_response);
exit();
