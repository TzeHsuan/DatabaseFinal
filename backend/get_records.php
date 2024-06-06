<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_check.php";  // 确保这里的路径正确，并且 db_check.php 中正确配置数据库

if (isset($_GET['Con_ID'])) {
    $Con_ID = mysqli_real_escape_string($conn, trim($_GET['Con_ID']));

    $sql = "SELECT * FROM record WHERE Con_ID = ? ORDER BY Date ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $Con_ID);
    $stmt->execute();
    $result = $stmt->get_result();

    $records = [];
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }

    echo json_encode($records);
    $stmt->close();
    $conn->close();
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Invalid request"]);
}
?>
