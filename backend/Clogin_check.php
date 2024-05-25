<?php
require_once dirname(__FILE__)."/db_check.php"; //added by Tsou
session_start(); 
//include "db_check.php";

if (isset($_POST['Email']) && isset($_POST['Password'])) {
	$conn = db_check(); //added by Tsou
	function validate($data){
    	$data = trim($data);
	  	$data = stripslashes($data);
	  	$data = htmlspecialchars($data);
	 	return $data;
	}

	$Email = validate($_POST['Email']);
	$Password = validate($_POST['Password']);

	// hashing the password
 	$Password = md5($Password);

	$sql = "SELECT * FROM consultant WHERE Email='$Email' AND Password='$Password'";

	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) === 1) {
		$row = mysqli_fetch_assoc($result);
          if ($row['Email'] === $Email && $row['Password'] === $Password) {
          	$_SESSION['Email'] = $row['Email'];
          	header("Location: /HW3/index.php"); //等前端的！
		    exit();
          }else{
            header("Location: /HW3/hw3_php/views/login.php?error=Incorrect Username or Password&$user_data"); //等前端的！
		    exit();
          }
	}else{
    	header("Location: /HW3/hw3_php/views/login.php?error=Incorrect Username or Password&$user_data"); //等前端的！
	  	exit();
	}
}else{
	header("Location: login.php"); //等前端的！
	exit();
}

$conn->close();
