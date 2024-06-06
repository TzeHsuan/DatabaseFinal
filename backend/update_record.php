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
    $date = mysqli_real_escape_string($conn, trim($data['date']));
    $protein = mysqli_real_escape_string($conn, trim($data['protein']));
    $carbs = mysqli_real_escape_string($conn, trim($data['carbs']));
    $fat = mysqli_real_escape_string($conn, trim($data['fat']));
    $sports = mysqli_real_escape_string($conn, trim($data['workout']));
    $aero = mysqli_real_escape_string($conn, trim($data['cardio']));
    $weight = mysqli_real_escape_string($conn, trim($data['weight']));

    // 验证数据类型和范围
    if (!is_numeric($protein) || !is_numeric($carbs) || !is_numeric($fat) || !is_numeric($weight) || !is_numeric($aero) || !is_numeric($sports)) {
        http_response_code(400); // Bad Request
        echo json_encode(["message" => "Invalid input data types"]);
        exit();
    }

    if ($sports < 0 || $sports > 5 || $aero < 0) {
        http_response_code(400); // Bad Request
        echo json_encode(["message" => "Invalid input data values"]);
        exit();
    }

    // 打印 SQL 查询以进行调试
    $sql = "UPDATE record SET Date='$date', Protein='$protein', Carb='$carbs', Fat='$fat', Sports='$sports', Aero='$aero', Weight='$weight' WHERE Con_ID='$Con_ID' AND Record_ID='$key'";

    try {
        if (mysqli_query($conn, $sql)) {
            echo json_encode(["message" => "Record updated successfully"]);
        } else {
            throw new Exception("Database update failed: " . mysqli_error($conn));
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
