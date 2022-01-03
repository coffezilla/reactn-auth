<?php 

header('Content-Type: application/json; charset=UTF-8');

include "../connect/bd_connect.php";

//
$dataResponse = array();
$dataResponse['status'] = 0;
$dataResponse['message'] = '';
$errors = array();

// var
$authTimestamp = addslashes(trim($_POST['auth_timestamp']));
$currentTimestampClean = str_replace(" ", "", $authTimestamp);

$authUserEmail = addslashes(trim($_POST['auth_email']));
$authUserEmail = str_replace(" ", "", $authUserEmail);

$userPassword = addslashes(trim($_POST['password']));
$userPassword = str_replace(" ", "", $userPassword);
$userPasswordMd5 = md5($userPassword);

// verify
$validInputs = false;

// check input
if(
$userPassword != '' && strlen($userPassword) >= 3 && 
$authTimestamp != '' && strlen($authTimestamp) >= 3 &&
$authUserEmail != '' && strlen($authUserEmail) >= 3
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

        // check if pin is correct
        $queryUsers = mysqli_query($connection, "SELECT 
        usr_id
        FROM users
        WHERE usr_email = '{$authUserEmail}' 
        AND usr_status = 1 
        AND  usr_password = '{$userPasswordMd5}'
        ORDER BY usr_id
        DESC
        LIMIT 1") or die ("User Not Found");
        if (mysqli_num_rows ($queryUsers) > 0) {
            $dataUser = mysqli_fetch_assoc($queryUsers);
            $userId = $dataUser['usr_id'];
            $pinRecovery = substr(rand(111111,999999), 0, 6);            

            // exclui usuario
            mysqli_query($connection, "UPDATE users SET
            usr_pin_recovery = '{$pinRecovery}'
            WHERE usr_id = '{$userId}'") or die("update error");             

            $dataResponse['status'] = 1;
            $dataResponse['pin'] = $pinRecovery;
            $dataResponse['email'] = $authUserEmail;
        } else {
            $dataResponse['message'] = 'Usuário ou password';
            $dataResponse['status'] = 4;
        }

    }

} else {
    // nao autehnticado
    $dataResponse['status'] = 2;
}

$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
