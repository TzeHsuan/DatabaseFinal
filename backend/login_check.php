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
include "db_check.php"; // 确保这里的路径正确，并且 db_check.php 中正确配置数据库

$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

$response = []; // 用于存储调试信息

if (!empty($data) && isset($data['Password']) && isset($data['type'])) {
    $type = $data['type'];
    $response['debug'][] = "Type: $type";

    if ($type === 'diet') {
        if (!isset($data['Diet_ID'])) {
            echo json_encode(["msg" => 1, "debug" => $response]);
            http_response_code(400); // Bad Request
            exit();
        }
        $userId = mysqli_real_escape_string($conn, trim($data['Diet_ID']));
        $response['debug'][] = "Diet_ID: $userId";
        $sql = "SELECT * FROM diet WHERE Diet_ID='$userId'";
    } else {
        if (!isset($data['Email'])) {
            echo json_encode(["msg" => 1, "debug" => $response]);
            http_response_code(400); // Bad Request
            exit();
        }
        $Email = mysqli_real_escape_string($conn, trim($data['Email']));
        $response['debug'][] = "Email: $Email";
        $sql = "SELECT * FROM consultant WHERE Email='$Email'";
    }

    $response['debug'][] = "SQL Query: $sql";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        $inputPassword = $data['Password'];
        $storedHash = $row['Password'];
        $response['debug'][] = "Input password: $inputPassword";
        $response['debug'][] = "Stored hash: $storedHash";

        // 手动测试哈希密码
        if (password_verify($inputPassword, $storedHash)) {
            $response['debug'][] = "Manual password verification success";
        } else {
            $response['debug'][] = "Manual password verification failed";
        }

        if (password_verify($inputPassword, $storedHash)) {
            $sessionID = ($type === 'diet') ? $row['Diet_ID'] : $row['Con_ID'];
            $userType = ($type === 'diet') ? 1 : 0;

            $response = array_merge($response, [
                "msg" => 0,
                "session" => $sessionID,
                "userType" => $userType
            ]);
            echo json_encode($response);
            http_response_code(200);
            exit();
        } else {
            $response['debug'][] = "Password verification failed";
            echo json_encode(["msg" => 88, "debug" => $response]);
            http_response_code(401); // Unauthorized
            exit();
        }
    } else {
        $response['debug'][] = "User not found or multiple users found";
        echo json_encode(["msg" => 1, "debug" => $response]);
        http_response_code(404); // Not Found
        exit();
    }
} else {
    $response['debug'][] = "Invalid input data";
    echo json_encode(["msg" => 1, "debug" => $response]);
    http_response_code(400); // Bad Request
    exit();
}

$conn->close();
?>
