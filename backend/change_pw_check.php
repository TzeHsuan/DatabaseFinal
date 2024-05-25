<?php
require_once dirname(__FILE__)."/db_check.php";
session_start();

if (isset($_SESSION['Email'])) {

    //include "db_check.php";

	if (isset($_POST['oldPassword']) && isset($_POST['newPassword'])
    && isset($_POST['rePassword'])) {

		function validate($data){
    		$data = trim($data);
		 	$data = stripslashes($data);
		  	$data = htmlspecialchars($data);
		  	return $data;
		}

		$oldPassword = validate($_POST['oldPassword']);
		$newPassword = validate($_POST['newPassword']);
		$rePassword = validate($_POST['rePassword']);
    
  		if(empty($oldPassword)){
			header("Location: ../views/change_pw.php?error=Old Password is required");
	  		exit();
		}else if(empty($newPassword)){
			header("Location: ../views/change_pw.php?error=New Password is required");
	  		exit();
		}else if($newPassword !== $rePassword){
			header("Location: ../views/change_pw.php?error=The confirmation password  does not match");
	  		exit();
		}else {
    		// hashing the password
    		$oldPassword = md5($oldPassword);
    		$newPassword = md5($newPassword);
      		$Email = $_SESSION['Email'];

      		$sql = "SELECT Password FROM consultant WHERE Email='$Email' AND Password='$oldPassword'";
      	  	$result = mysqli_query($conn, $sql);
        	if(mysqli_num_rows($result) === 1){
        		$sql_2 = "UPDATE consultant SET Password='$newPassword'WHERE Email='$Email'";
        		mysqli_query($conn, $sql_2);
          		echo '<script> alert("密碼更改成功"); window.location.href="/HW3/index.php"; </script>';
	        	exit();
       		}else {
        		header("Location: ../views/change_pw.php?error=Incorrect password");
	       		exit();
			}
		}
	}else{
		header("Location: ../views/change_pw.php");
		exit();
	}
}else{
     header("Location: /HW3/index.php");
     exit();
}

$conn->close();
