<?php

// $sname= "localhost";
// $unmae= "root";
// $password = "root";

// $db_name = "fitness";

// $conn = mysqli_connect($sname, $unmae, $password, $db_name);

// if (!$conn) {
// 	echo "Connection failed!";
// }else{
//   echo "Connection successful!";
// }

function db_check() {
  $servername = "localhost";
  $username = "root";
  $password = "";

  $dbname = "fitness";
  
  return  $conn = new mysqli($servername, $username, $password, $dbname);
}

