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

$userPassword = addslashes(trim($_POST['password']));
$userPassword = str_replace(" ", "", $userPassword);
$userPasswordMd5 = md5($userPassword);

$currentTimestamp = Date('Y-m-d H:i:s');
$currentTimestampClean = str_replace(" ", "", $currentTimestamp);

// verify
$validInputs = false;

// JWT auth 
include "../connect/auth.php";
$isAuth = verifyAuth($clientToken, $JWTServerkey);

if($isAuth) {
    // JWT auth
    // include "../connect/auth.php";
    $token = createJWTAuth($userEmail, $currentTimestampClean, $JWTServerkey);

    // check input
    if(
    $userEmail != '' && strlen($userEmail) >= 3 &&
    $userPassword != '' && strlen($userPassword) >= 3
    ) {
        // pode passar
        $validInputs = true;

    } else {
        $dataResponse['message'] = 'Campo em branco';
        $dataResponse['status'] = 2;
    }

    if($validInputs) {

        // get new token
        $dataResponse['token'] = $token;
        $dataResponse['timestamp'] = $currentTimestamp;

        $dataResponse['user'] = array(
            'id' => 1,
            'email' => $userEmail,
        );
        $dataResponse['status'] = 1;        
        // // query
        // $queryUsers = mysqli_query($connection, "SELECT 
        // usr_id,
        // usr_prestige,
        // usr_nickname
        // FROM users
        // WHERE usr_email = '{$userEmail}' AND usr_status = 1
        // AND usr_password = '{$userPasswordMd5}'
        // ORDER BY usr_id
        // DESC
        // LIMIT 1") or die ("User Not Found");


        // if (mysqli_num_rows ($queryUsers) > 0) {
        //     $dataUser = mysqli_fetch_assoc($queryUsers);
        //     $userId = $dataUser['usr_id'];
              
        //     $dataResponse['token'] = $token;
        //     $dataResponse['timestamp'] = $currentTimestamp;


        //     $queryTeamsContract = mysqli_query($connection, "SELECT
        //     cct.tem_id
        //     FROM coaches_contract AS cct
        //     WHERE cct.usr_id = '{$userId}'
        //     AND cct.cct_status = 2
        //     ORDER BY cct.cct_id DESC
        //     LIMIT 1");
        //     if (mysqli_num_rows($queryTeamsContract)==0) {
        //         $hasTeam = false;
        //         $userTeam = 0;
        //     } else {
        //         $dataTeamContract = mysqli_fetch_assoc($queryTeamsContract);
        //         $hasTeam = true;
        //         $userTeam = $dataTeamContract['tem_id'];
        //     }    

        //     $dataResponse['user'] = array(
        //         'id' => $dataUser['usr_id'],
        //         'email' => $userEmail,
        //         'nickname' => $dataUser['usr_nickname'],
        //         'prestige' => $dataUser['usr_prestige'],
        //         'hasTeam' => $hasTeam,
        //         'team' => $userTeam,
        //     );
        //     $dataResponse['status'] = 1;    

        //     $dataResponse['suplenete'] = $userTeam;

        // } else {
        //     $dataResponse['message'] = 'Usuário ou senha inválido';
        //     $dataResponse['status'] = 3;
        // }
    } else {

    }
}
$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
