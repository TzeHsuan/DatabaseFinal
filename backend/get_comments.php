<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "db_check.php";  // 确保这里的路径正确，并且 db_check.php 中正确配置数据库

// 处理预检请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // No Content
    exit();
}

if (isset($_GET['Con_ID'])) {
    $Con_ID = mysqli_real_escape_string($conn, trim($_GET['Con_ID']));

    // 修改 SQL 查询，使用 JOIN 操作获取评论者的名字
    $sql = "SELECT r.Review_Date, r.Review, r.Diet_ID, d.Diet_Fname, d.Diet_Lname 
            FROM review r
            JOIN diet d ON r.Diet_ID = d.Diet_ID
            WHERE r.Con_ID = ?
            ORDER BY r.Review_Date DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $Con_ID);
    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        $reviews[] = [
            'date' => $row['Review_Date'],
            'comment' => $row['Review'],
            'title' => $row['Diet_Fname'] . ' ' . $row['Diet_Lname']
        ];
    }

    echo json_encode($reviews);
    $stmt->close();
    $conn->close();
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Invalid request"]);
}
?>
