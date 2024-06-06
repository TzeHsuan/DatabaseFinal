<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_check.php";  // 确保这里的路径正确，并且 db_check.php 中正确配置数据库

if (isset($_GET['session'])) {
    $session = mysqli_real_escape_string($conn, trim($_GET['session']));

    $sql = "SELECT * FROM consultant WHERE Con_ID='$session'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        $userData = [
            "FName" => $row['FName'],
            "LName" => $row['LName'],
            "Diet_ID" => $row['Diet_ID'] // 添加 Diet_ID
        ];
        echo json_encode($userData);
        http_response_code(200);
        exit();
    } else {
        http_response_code(404); // Not Found
        exit();
    }
} else {
    http_response_code(400); // Bad Request
    exit();
}

$conn->close();
?>
