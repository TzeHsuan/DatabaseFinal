<?php
//確認登入狀態，if未登入or滿30分鐘，就跳回到登入頁
require_once dirname(__FILE__) . "/include/head.php";
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;  // 設定30分鐘為timeout
if (!isset($_SESSION['login']) || ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
  header("Location: ./login.php");
  exit();
}
?>