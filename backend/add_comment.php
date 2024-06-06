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

include "db_check.php";  // 确保这里的路径正确，并且 db_check.php 中正确配置数据库

$data = json_decode(file_get_contents("php://input"));

if (isset($data->Con_ID) && isset($data->comment) && isset($data->Diet_ID)) {
    $Con_ID = mysqli_real_escape_string($conn, trim($data->Con_ID));
    $comment = mysqli_real_escape_string($conn, trim($data->comment));
    $Diet_ID = mysqli_real_escape_string($conn, trim($data->Diet_ID));
    $review_date = date('Y-m-d H:i:s');

    $sql = "INSERT INTO review (Con_ID, Review, Review_Date, Diet_ID) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $Con_ID, $comment, $review_date, $Diet_ID);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to add comment']);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Invalid input']);
}
?>
