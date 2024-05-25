<?php
require_once dirname(__FILE__)."/db_check.php";

$query = [
  'name' => htmlspecialchars($_GET["name"]),
  'sex' => htmlspecialchars($_GET["sex"]),
  'bloodtype' => htmlspecialchars($_GET["bloodtype"]),
  'birth' => htmlspecialchars($_GET["birth"]),
  'ID' => htmlspecialchars($_GET["ID"]),
  'email' => htmlspecialchars($_GET["email"]),
  'phonenum' => htmlspecialchars($_GET["phonenum"]),
  'password' => htmlspecialchars($_GET["password"]),
  'height' => htmlspecialchars($_GET["height"]),
  'weight' => htmlspecialchars($_GET["weight"])
];
$conn = db_check();
insertData($query['name'], $query['sex'], $query['bloodtype'], $query['birth'], $query['ID'], $query['email'], $query['phonenum'], $query['password'], $query['height'], $query['weight'], $conn);

function insertData($name, $sex, $bloodtype, $birth, $ID, $email, $phonenum, $password, $height, $weight, $conn) {
  $ID_sql = "SELECT ID FROM patient WHERE ID = '$ID'";
  $email_sql = "SELECT Email FROM patient WHERE Email = '$email'";
  $phonenum_sql = "SELECT PhoneNum FROM patient WHERE PhoneNum = '$phonenum'";
  $ID_result = mysqli_query($conn, $ID_sql);
  $email_result = mysqli_query($conn, $email_sql);
  $phonenum_result = mysqli_query($conn, $phonenum_sql);
  if(mysqli_num_rows($ID_result) > 0) {
    echo "該身分證字號已註冊過";
    echo '<br>';
  }
  if(mysqli_num_rows($email_result) > 0) {
    echo "該email已註冊過";
    echo '<br>';
  }
  if(mysqli_num_rows($phonenum_result) > 0) {
    echo "該電話號碼已註冊過";
  }
  if(mysqli_num_rows($ID_result) === 0 && mysqli_num_rows($email_result) === 0 && mysqli_num_rows($phonenum_result) === 0) {
    $sql = "INSERT INTO patient (Name, Sex, Bloodtype, Birth, ID, Email, PhoneNum, Height, Weight, Password)
    VALUES ('$name', '$sex', '$bloodtype', '$birth', '$ID', '$email', '$phonenum', '$height', '$weight', '$password')";
    if (mysqli_query($conn, $sql)) {
      echo "資料新增成功";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }  
  }
}
$conn->close();
