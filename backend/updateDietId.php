<?php
// Ensure CORS settings are correct
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db_check.php";  // 确保这里的路径正确，并且 db_check.php 中正确配置数据库

$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

if (!empty($data) && isset($data['session']) && isset($data['dietId'])) {
    $session = mysqli_real_escape_string($conn, trim($data['session']));
    $dietId = mysqli_real_escape_string($conn, trim($data['dietId']));

    $sql = "UPDATE consultant SET Diet_ID='$dietId' WHERE Con_ID='$session'";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(["message" => "Diet_ID 更新成功"]);
        http_response_code(200);
    } else {
        echo json_encode(["message" => "Diet_ID 更新失败"]);
        http_response_code(500);
    }
} else {
    echo json_encode(["message" => "请求数据不完整"]);
    http_response_code(400);
}

$conn->close();
?>
