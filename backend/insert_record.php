<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start(); // 启用会话

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

if (isset($data['Con_ID']) && isset($data['date']) && isset($data['protein']) && isset($data['carbs']) && isset($data['fat']) && isset($data['workout']) && isset($data['cardio']) && isset($data['weight'])) {
    $Con_ID = mysqli_real_escape_string($conn, trim($data['Con_ID']));
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

    // 查询 Diet_ID
    $dietIdSql = "SELECT Diet_ID FROM consultant WHERE Con_ID = '$Con_ID' LIMIT 1";
    $dietIdResult = mysqli_query($conn, $dietIdSql);

    if ($dietIdResult && mysqli_num_rows($dietIdResult) > 0) {
        $dietIdRow = mysqli_fetch_assoc($dietIdResult);
        $diet_id = $dietIdRow['Diet_ID'];
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(["message" => "Diet_ID not found for given Con_ID"]);
        exit();
    }

    // 检查相关的 Diet_ID 是否存在
    $dietCheckSql = "SELECT Diet_ID FROM diet WHERE Diet_ID = '$diet_id' LIMIT 1";
    $dietCheckResult = mysqli_query($conn, $dietCheckSql);

    if (mysqli_num_rows($dietCheckResult) == 0) {
        http_response_code(400); // Bad Request
        echo json_encode(["message" => "Diet_ID does not exist"]);
        exit();
    }

    // 插入新记录的 SQL 查询
    $sql = "INSERT INTO record (Con_ID, Date, Protein, Carb, Fat, Sports, Aero, Weight, Diet_ID) VALUES ('$Con_ID', '$date', '$protein', '$carbs', '$fat', '$sports', '$aero', '$weight', '$diet_id')";

    try {
        if (mysqli_query($conn, $sql)) {
            $recordId = mysqli_insert_id($conn); // 获取新插入记录的 ID
            echo json_encode(["success" => true, "recordId" => $recordId]);
        } else {
            throw new Exception("Database insert failed: " . mysqli_error($conn));
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
