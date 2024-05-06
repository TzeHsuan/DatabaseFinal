<?php
require_once dirname(__FILE__)."/db_check.php";

$query = [
  'oldPassword' => htmlspecialchars($_GET["oldPassword"]),
  'newPassword' => htmlspecialchars($_GET["newPassword"])
];
$conn = db_check();
changeData($query['oldPassword'], $query['newPassword'], $conn);

function changeData($oldPassword, $newPassword, $conn) {
  $password_sql = "SELECT password FROM user_account WHERE password = '$oldPassword'";
  $password_result = mysqli_query($conn, $password_sql);
  if(mysqli_num_rows($password_result) == 0) {
    echo "原始密碼錯誤!";   
  }
  if(mysqli_num_rows($password_result) > 0) {
    $sql = "UPDATE user_account SET password='$newPassword' WHERE password = '$oldPassword'";
    if (mysqli_query($conn, $sql)) {
      echo "資料修改成功";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    } 
  }
}
$conn->close();
