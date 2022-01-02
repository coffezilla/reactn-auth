<?php 

header('Content-Type: application/json; charset=UTF-8');
include "../connect/bd_connect.php";

//
$dataResponse = array();
$dataResponse['status'] = 0;
$dataResponse['message'] = '';
$errors = array();

// var
$userEmail = addslashes(trim($_POST['auth_email']));
$userEmail = str_replace(" ", "", $userEmail);
// $userEmail = 'daaamn';

$currentTimestamp = Date('Y-m-d H:i:s');
$currentTimestampClean = str_replace(" ", "", $currentTimestamp);

// verify
$validInputs = false;

// JWT auth
include "../connect/auth.php";
$token = createJWTAuth($userEmail, $currentTimestampClean, $JWTServerkey);

// // check input
if( $userEmail == '' || strlen($userEmail) <= 3 ) {
//     // pode passar
    $dataResponse['message'] = 'Campo em branco';
    $dataResponse['status'] = 2;

} else {
    $validInputs = true;
}

if($validInputs) {

    // if is not logged clean the field email
    if($userEmail == 'NOT_LOGGED') {
        $dataResponse['email'] = '';
    } else {
        $dataResponse['email'] = $userEmail;
    }
    $dataResponse['token'] = $token;
    $dataResponse['timestamp'] = $currentTimestamp;
    $dataResponse['status'] = 1;
}


$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
