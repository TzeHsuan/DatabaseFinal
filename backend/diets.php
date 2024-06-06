<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_check.php";  // 确保这里的路径正确，并且 db_check.php 中正确配置数据库

$sql = "SELECT Diet_ID, Diet_Fname, Diet_Lname, img_url, Intro FROM diet";
$result = mysqli_query($conn, $sql);

$diets = [];
while ($row = mysqli_fetch_assoc($result)) {
    $diets[] = $row;
}

echo json_encode($diets);
$conn->close();
?>
