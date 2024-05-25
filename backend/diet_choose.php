<?php
require_once dirname(__FILE__)."/db_check.php";
session_start(); 
//include "db_check.php";

// 檢查請求方法是不是用POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = db_check(); //added by Tsou
    $diet_id = $_POST['diet_id'];
    $consultant_id = $_SESSION['consultant_id'];
    // 更新已登入諮詢者的 Diet_ID 為 diet_id
    $sql = "UPDATE consultant SET Diet_ID = $diet_id WHERE ID = $consultant_id";

    if ($conn->query($sql) === TRUE) {
        echo "Diet ID updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

$conn->close();
?>
