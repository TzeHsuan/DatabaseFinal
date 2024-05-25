<?php
function db_check() {
  $servername = "localhost";
  $username = "root";
  $password = "";

  $dbname = "user";
  
  return  $conn = new mysqli($servername, $username, $password, $dbname);
}
