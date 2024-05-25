<?php
require_once dirname(__FILE__)."/db_check.php";

session_start();
if (isset($_GET['submit'])){
  $query = [
    'username' => htmlspecialchars($_GET["username"]),
    'email' => htmlspecialchars($_GET["email"])
  ];
  $conn = db_check();
  checkData($query['username'], $query['email'], $conn);
}

function checkData($username, $email, $conn) {
  $sql = "SELECT id, username FROM user_account WHERE username = '$username' AND email = '$email'"; //確認登入資料的SQL
  $result = mysqli_query($conn, $sql);
  if(mysqli_num_rows($result) == 0) {
    echo "帳號或email不存在";
    header("Location: /HW3_110705063/views/forgetPassword.php?error=帳號或email不存在");   
  } else {
    $username=$username . "請重設密碼";
    $message="請點擊連結重設密碼：\nhttp://127.0.0.1/HW3_110705063/views/resetPassword.php";
    mail($email,$subject,$message);  //調用 mail() 函式將此封信件發送出去

    echo "Check your email."; 
    header("Location: /HW3_110705063/views/forgetPassword.php?message=請檢查信箱");   
  }
}
$conn->close();