<?php
require_once dirname(__FILE__)."/include/head.php";
unset($_SESSION['login']);
unset($_SESSION['id']);
unset($_SESSION['username']);
echo "<script>log_sta = false;</script>";
header("Location: ./index.php");
exit();