<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
include "db_check.php";

$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

if (!empty($data) && isset($data['Email']) && isset($data['Password'])) {
    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $Email = validate($data['Email']);
    $Password = validate($data['Password']);
    $Password = md5($Password); 

    $sql = "SELECT * FROM consultant WHERE Email='$Email' AND Password='$Password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['User_ID'] = $row['Email']; 

        $userInfo = array(
            "Email" => $row['Email'],
            "FName" => $row['FName'],
            "LName" => $row['LName'],
            "Age" => $row['Age'],
            "Height" => $row['Height'],
            "Weight" => $ow['Weight'],
            "Ideal_Fat" => $row['Ideal_Fat']
        );

        echo json_encode(["success" => true, "user" => $userInfo,"session" => session_id(), "redirect" => "http://localhost:3000/"]);
        exit();
    } else {
        echo json_encode(["success" => false, "error" => "Incorrect Username or Password"]);
        exit();
    }
} else {
    echo json_encode(["success" => false, "error" => "Missing Email or Password"]);
    exit();
}

$conn->close();
?>
