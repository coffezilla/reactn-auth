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

// verify
$validInputs = false;

// JWT auth
include "../connect/auth.php";
$token = createJWTAuth($userEmail, $JWTServerkey);

// check input
if( $userEmail != '' && strlen($userEmail) >= 3 ) {
    // pode passar
    $validInputs = true;

} else {
    $dataResponse['message'] = 'Campo em branco';
    $dataResponse['status'] = 2;
}

if($validInputs) {
    $dataResponse['token'] = $token;
    $dataResponse['timestamp'] = $currentTimestamp;
    $dataResponse['status'] = 1;
}


$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
