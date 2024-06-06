<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_check.php"; // 确保这里的路径正确，并且 db_check.php 中正确配置数据库

$con_id = $_GET['con_id'];

// 获取顾问信息
$consultantSql = "SELECT Age, Height, Weight AS TargetWeight FROM consultant WHERE Con_ID = '$con_id'";
$consultantResult = mysqli_query($conn, $consultantSql);
$consultantInfo = mysqli_fetch_assoc($consultantResult);

// 获取最新的体重记录
$recordSql = "SELECT Weight FROM record WHERE Con_ID = '$con_id' ORDER BY Date DESC LIMIT 1";
$recordResult = mysqli_query($conn, $recordSql);
$currentWeight = mysqli_fetch_assoc($recordResult);
if ($currentWeight) {
    $consultantInfo['CurrentWeight'] = $currentWeight['Weight'];
} else {
    $consultantInfo['CurrentWeight'] = null;
}

// 获取评论回复
$reviewSql = "SELECT Review_Date, Review, Diet_ID FROM review WHERE Con_ID = '$con_id'";
$reviewResult = mysqli_query($conn, $reviewSql);

$reviews = [];
while($row = mysqli_fetch_assoc($reviewResult)) {
    // 获取Diet_Fname和Diet_Lname
    $dietId = $row['Diet_ID'];
    $dietSql = "SELECT Diet_Fname, Diet_Lname FROM diet WHERE Diet_ID = '$dietId'";
    $dietResult = mysqli_query($conn, $dietSql);
    $dietInfo = mysqli_fetch_assoc($dietResult);
    
    $review = [
        'title' => $dietInfo['Diet_Fname'] . ' ' . $dietInfo['Diet_Lname'],
        'date' => $row['Review_Date'],
        'comment' => $row['Review']
    ];
    array_push($reviews, $review);
}

// 整合信息
$response = [
    'consultantInfo' => $consultantInfo,
    'reviews' => $reviews
];

echo json_encode($response);

$conn->close();
?>
