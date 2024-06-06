<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_check.php"; // 确保路径正确

$session = $_GET['session'];
$userType = $_GET['userType']; // 获取 userType 参数

if ($userType == 1) {
    // 如果 userType 为 1，从 diet 表获取数据
    $sql = "SELECT Diet_Fname, Diet_Lname FROM diet WHERE Diet_ID = '$session'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $dietData = $row;

        // 从 consultant 表中获取所有 Diet_ID 相同的数据
        $consultantSql = "SELECT * FROM consultant WHERE Diet_ID = '$session'";
        $consultantResult = mysqli_query($conn, $consultantSql);

        $consultants = [];
        while ($consultantRow = mysqli_fetch_assoc($consultantResult)) {
            $consultants[] = $consultantRow;
        }

        // 返回 dietData 和 consultants 数据
        echo json_encode([
            'dietData' => $dietData,
            'consultants' => $consultants,
        ]);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode([]);
}

$conn->close();
?>
