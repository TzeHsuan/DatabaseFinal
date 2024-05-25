<?php
require_once dirname(__FILE__)."/db_check.php";
session_start();
//include "db_check.php";

if (isset($_POST['Email']) && isset($_POST['Password']) && isset($_POST['FName']) && isset($_POST['LName']) && isset($_POST['Age']) && isset($_POST['Height']) && isset($_POST['Weight']) && isset($_POST['Ideal_Fat'])){

	function validate($data){
		$data = trim($data);
	  	$data = stripslashes($data);
	  	$data = htmlspecialchars($data);
	  	return $data;
	}

	$Email = validate($_POST['Email']);
	$Password = validate($_POST['Password']);
	$re_pass = validate($_POST['passwordConfirm']);
	$FName = validate($_POST['FName']);
	$LName = validate($_POST['LName']);
	$Age = validate($_POST['Age']);
	$Height = validate($_POST['Height']);
	$Weight = validate($_POST['Weight']);
	$Ideal_Fat = validate($_POST['Ideal_Fat']);

  	$user_data = 'username='. $username;

	if (empty($Email)) {
		header("Location: /views/registration.php?error=請輸入Email&$user_data");
	  	exit();
	}else if(empty($Password)){
    	header("Location: /views/registration.php?error=請輸入密碼&$user_data");
	  	exit();
	}
	else if(empty($Password !== $re_pass)){
    	header("Location: /views/registration.php?error=兩次輸入的密碼不一致&$user_data");
	  	exit();
	}
  	else if(empty($FName)){
    	header("Location: /HW3/hw3_php/views/registration.php?error=請輸入名字&$user_data");
    	exit();
 	}else if(empty($LName)){
		header("Location: /HW3/hw3_php/views/registration.php?error=請輸入姓氏&$user_data");
		exit();
	}else if(empty($Age)){
		header("Location: /HW3/hw3_php/views/registration.php?error=請輸入年齡&$user_data");
		exit();
	}else if(empty($Height)){
		header("Location: /HW3/hw3_php/views/registration.php?error=請輸入身高&$user_data");
		exit();
	}else if(empty($Weight)){
		header("Location: /HW3/hw3_php/views/registration.php?error=請輸入體重&$user_data");
		exit();
	}else if(empty($Ideal_Fat)){
		header("Location: /HW3/hw3_php/views/registration.php?error=請輸入理想體脂&$user_data");
		exit();
	}
	else{

		// hashing the password
    	$Password = md5($Password);

	  	$sql1 = "SELECT * FROM consultant WHERE Email='$Email' ";
		$result1 = mysqli_query($conn, $sql1);    

		if (mysqli_num_rows($result1) > 0) {
			echo '<script> alert("此Email已註冊過，請嘗試其他Email"); window.location.href="/HW3/hw3_php/views/registration.php"; </script>';
	    	exit();
		}else {
     		$sql3 = "INSERT INTO consultant (FName, LName, Email, Password, Age, Height, Weight, Ideal_Fat) VALUES('$FName', '$LName', '$Email', '$Password', '$Age', '$Height', '$Weight', '$Ideal_Fat)";

     		$result3 = mysqli_query($conn, $sql3);
      		if ($result3) {
        		echo '<script> alert("帳號註冊成功！");window.location.href="/HW3/hw3_php/views/login.php"; </script>';
	      		exit();
      		}else {
        		echo '<script> alert("Unkown error occured");window.location.href="/HW3/hw3_php/views/registration.php"; </script>';
		    	exit();
			}
		}
	}
	
}else{
	header("Location: /views/registration.php");
	exit();
}

$conn->close();
