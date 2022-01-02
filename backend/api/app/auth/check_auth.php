<?php 

header('Content-Type: application/json; charset=UTF-8');

include "../connect/bd_connect.php";

//
$dataResponse = array();
$dataResponse['status'] = 0;
$errors = array();

// var
$userEmail = addslashes(trim($_POST['email']));
$currentTimestamp = addslashes(trim($_POST['timestamp']));
// $currentTimestamp = Date('Y-m-d H:i:s');
$currentTimestampClean = str_replace(" ", "", $currentTimestamp);

// JWT auth 
include "../connect/auth.php";
$isAuth = verifyAuth($clientToken, $JWTServerkey);

if($isAuth) {
    
    $emailValidation = createJWTAuth($userEmail, $currentTimestampClean, $JWTServerkey);
    if('Bearer '.$emailValidation === $clientToken) {

        ######################################################################
        
        $dataResponse['status'] = 1;

        ######################################################################

    } else { /* email not valid */ 
        $dataResponse['status'] = 2;
    }


} else { // not authenticated
    $dataResponse['status'] = 3;
}


$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;

