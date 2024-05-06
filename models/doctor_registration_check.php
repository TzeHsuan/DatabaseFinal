<?php
require_once dirname(__FILE__)."/db_check.php";

$query = [
  'name' => htmlspecialchars($_GET["name"]),
  'sex' => htmlspecialchars($_GET["sex"]),
  'birth' => htmlspecialchars($_GET["birth"]),
  'dept' => htmlspecialchars($_GET["dept"]),
  'ID' => htmlspecialchars($_GET["ID"]),
  'email' => htmlspecialchars($_GET["email"]),
  'phonenum' => htmlspecialchars($_GET["phonenum"]),
  'password' => htmlspecialchars($_GET["password"])
];
$conn = db_check();
insertData($query['name'], $query['sex'], $query['birth'], $query['dept'], $query['ID'], $query['email'], $query['phonenum'], $query['password'], $conn);

function insertData($name, $sex, $birth, $dept, $ID, $email, $phonenum, $password, $conn) {
  $ID_sql = "SELECT ID FROM doctor WHERE ID = '$ID'";
  $email_sql = "SELECT Email FROM doctor WHERE Email = '$email'";
  $phonenum_sql = "SELECT PhoneNum FROM doctor WHERE PhoneNum = '$phonenum'";
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
    $sql = "INSERT INTO doctor (Name, Sex, Birth, Dept, ID, Email, PhoneNum, Password)
    VALUES ('$name', '$sex', '$birth', '$dept', '$ID', '$email', '$phonenum', '$password')";
    if (mysqli_query($conn, $sql)) {
      echo "資料新增成功";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }  
  }
}
$conn->close();
