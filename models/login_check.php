<?php
require_once dirname(__FILE__)."/db_check.php";

session_start();
if (isset($_GET['submit'])){
  $query = [
    'identity' => htmlspecialchars($_GET["identity"]),
    'name' => htmlspecialchars($_GET["name"]),
    'password' => htmlspecialchars($_GET["password"])
  ];
  $conn = db_check();
  checkData($query['identity'], $query['name'], md5($query['password'], false), $conn);
}

function checkData($identity, $name, $password, $conn) {
  $sql = "SELECT ID, Name FROM $identity WHERE Name = '$name' AND Password = '$password'"; //確認登入資料的SQL
  $result = mysqli_query($conn, $sql);
  if(mysqli_num_rows($result) == 0) {
    echo "帳號或密碼錯誤";
    header("Location: /HW3_110705063/views/login.php?error=帳號密碼錯誤");   
  } else {
    $row = mysqli_fetch_assoc($result);
    echo "登入成功";
    $_SESSION['login'] = true;
    $_SESSION['id'] = $row['ID'];
    $_SESSION['name'] = $row['Name'];
    $_SESSION['LAST_ACTIVITY'] = $_SERVER['REQUEST_TIME'];
    echo "<script>log_sta = true;</script>";
    header("Location: /HW3_110705063/views/index.php");   
  }
}
$conn->close();