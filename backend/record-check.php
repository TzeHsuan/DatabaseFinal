<?php 
require_once dirname(__FILE__)."/db_check.php";
session_start();

if (isset($_SESSION['ID']) && isset($_SESSION['Email'])) {

    //include "db_conn.php";

		if (isset($_POST['Protein']) && isset($_POST['Fat']) && isset($_POST['Carb']) && isset($_POST['Weight'])) {

		function validate($data){
			$data = trim($data);
			$data = stripslashes($data);
			$data = htmlspecialchars($data);
			return $data;
		}

		$Protein = validate($_POST['Protein']);
		$Fat = validate($_POST['Fat']);
		$Carb = validate($_POST['Carb']);
		$Weight = validate($_POST['Weight']);

		if(empty($Protein)){
			header("Location: record.php?error=請輸入蛋白質克數");
			exit();
		}else if(empty($Fat)){
			header("Location: record.php?error=請輸入脂肪克數");
			exit();
		}else if(empty($Carb)){
			header("Location: record.php?error=請輸入碳水化合物克數");
			exit();
		}else if(empty($Weight)){
			header("Location: record.php?error=請輸入您的體重");
			exit();
		}else {
			//準備SQL查詢
			$ID = $_SESSION['ID'];
			$Diet_ID =  "SELECT Diet_ID FROM consultant WHERE ID='$ID'";
			$sql = "INSERT INTO record (ID, Protein, Fat, Carb, Weight, Diet_ID) VALUES ('$ID', '$Protein', '$Fat', '$Carb', '$Weight', '$Diet_ID')";

			//執行查詢
			if($conn->query($sql) === TRUE){
				header("Location: record.php?success=紀錄已新增成功!");
				exit();
			}else {
				header("Location: record.php?error=紀錄新增失敗");
				exit();
			}
		}
	}else{
		header("Location: record.php");
		exit();
	}
}else{
	header("Location: login.php");
	exit();
}

//$conn->close();

