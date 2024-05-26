<?php

session_start(); 
include "db_check.php";

if (isset($_POST['Diet_ID']) && isset($_POST['Password'])) {

	function validate($data){
    	$data = trim($data);
	  	$data = stripslashes($data);
	  	$data = htmlspecialchars($data);
	  	return $data;
	}

	$Email = validate($_POST['Diet_ID']);
	$Password = validate($_POST['Password']);

	// hashing the password
  	$Password = md5($Password);

	$sql = "SELECT * FROM diet WHERE Diet_ID='$Diet_ID' AND Password='$Password'";

	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) === 1) {
		$row = mysqli_fetch_assoc($result);
          if ($row['Diet_ID'] === $Diet_ID && $row['Password'] === $Password) {
          	$_SESSION['Diet_ID'] = $row['Diet_ID'];
          	header("Location: /HW3/index.php"); //等前端的！
		    exit();
          }else{
            header("Location: /HW3/hw3_php/views/login.php?error=Incorrect Username or Password&$user_data"); //等前端的！
		    exit();
          }
	}else{
    header("Location: /HW3/hw3_php/views/login.php?error=Incorrect Username or Password&$user_data"); //等前端的！
   // echo '<script> alert("Incorrect Username or Password");window.location.href="/HW3/hw3_php/views/login.php"; </script>';
	  exit();
	}
}else{
	header("Location: login.php"); //等前端的！
	exit();
}

$conn->close();
