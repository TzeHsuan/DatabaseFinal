<?php
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

// 启用错误报告
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['Con_ID']) && isset($data['key'])) {
    $Con_ID = mysqli_real_escape_string($conn, trim($data['Con_ID']));
    $key = mysqli_real_escape_string($conn, $data['key']);

    // 删除记录的 SQL 查询
    $sql = "DELETE FROM record WHERE Con_ID='$Con_ID' AND Record_ID='$key'";

    try {
        if (mysqli_query($conn, $sql)) {
            echo json_encode(["message" => "Record deleted successfully"]);
        } else {
            throw new Exception("Database delete failed: " . mysqli_error($conn));
        }
    } catch (Exception $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["message" => $e->getMessage()]);
    }

    $conn->close();
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Invalid request"]);
}
?>
