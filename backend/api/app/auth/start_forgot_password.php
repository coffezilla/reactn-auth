<?php 

header('Content-Type: application/json; charset=UTF-8');

include "../connect/bd_connect.php";

//
$dataResponse = array();
$dataResponse['status'] = 0;
$dataResponse['message'] = '';
$errors = array();

// var
$userEmail = addslashes(trim($_POST['email']));
$userEmail = str_replace(" ", "", $userEmail);

$currentTimestamp = Date('Y-m-d H:i:s');
$currentTimestampClean = str_replace(" ", "", $currentTimestamp);

// verify
$validInputs = false;

// check input
if(
$userEmail != '' && strlen($userEmail) >= 3
) {
    // pode passar
    $validInputs = true;

} else {
    $dataResponse['message'] = 'Campo em branco';
    $dataResponse['status'] = 2;
}

// JWT auth 
include "../connect/auth.php";
$isAuth = verifyAuth($clientToken, $JWTServerkey);

if($isAuth) {

    if($validInputs) {

        // get user id
        $queryUsers = mysqli_query($connection, "SELECT 
        usr_id,
        usr_name
        FROM users
        WHERE usr_email = '{$userEmail}' AND usr_status = 1
        ORDER BY usr_id
        DESC
        LIMIT 1") or die ("User Not Found");
        // get user data
        if (mysqli_num_rows ($queryUsers) > 0) {        
            $dataUser = mysqli_fetch_assoc($queryUsers);
            $userId = $dataUser['usr_id'];
            $pinRecovery = substr(rand(111111,999999), 0, 6);

            // exclui usuario
            mysqli_query($connection, "UPDATE users SET
            usr_pin_recovery = '{$pinRecovery}'
            WHERE usr_id = '{$userId}'") or die("update error"); 

            $dataResponse['status'] = 1;  
            $dataResponse['message'] = 'roo '.$userId;

        } else {
    
            $dataResponse['message'] = 'Usuário nao encontrado';
            $dataResponse['status'] = 3;

        }

    }

} else {
    // nao autehnticado
    $dataResponse['status'] = 2;
}

$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
