<?php

$sname= "localhost";
$unmae= "root";
$password = "root";

$db_name = "fitness";

$conn = mysqli_connect($sname, $unmae, $password, $db_name);

if (!$conn) {
	echo "Connection failed!";
}else{
  echo "Connection successful!";
}