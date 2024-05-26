<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
include "db_check.php";

// 读取输入流
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true); // 解码 JSON 数据为 PHP 数组

if (!empty($data) && isset($data['Email']) && isset($data['Password']) && isset($data['confirmPassword']) && isset($data['FName']) && isset($data['LName']) && isset($data['Age']) && isset($data['Height']) && isset($data['Weight']) && isset($data['Ideal_Fat'])) {
    function validate($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $Email = validate($data['Email']);
    $Password = validate($data['Password']);
    $confirmPassword = validate($data['confirmPassword']);
    $FName = validate($data['FName']);
    $LName = validate($data['LName']);
    $Age = validate($data['Age']);
    $Height = validate($data['Height']);
    $Weight = validate($data['Weight']);
    $Ideal_Fat = validate($data['Ideal_Fat']);
    $Diet_ID = isset($data['Diet_ID']) ? validate($data['Diet_ID']) : null;

    if (empty($Email)) {
        echo json_encode(["error" => "請輸入Email"]);
        exit();
    } else if (empty($Password)) {
        echo json_encode(["error" => "請輸入密碼"]);
        exit();
    } else if ($Password !== $confirmPassword) {
        echo json_encode(["error" => "兩次輸入的密碼不一致"]);
        exit();
    } else if (empty($FName)) {
        echo json_encode(["error" => "請輸入名字"]);
        exit();
    } else if (empty($LName)) {
        echo json_encode(["error" => "請輸入姓氏"]);
        exit();
    } else if (empty($Age)) {
        echo json_encode(["error" => "請輸入年齡"]);
        exit();
    } else if (empty($Height)) {
        echo json_encode(["error" => "請輸入身高"]);
        exit();
    } else if (empty($Weight)) {
        echo json_encode(["error" => "請輸入體重"]);
        exit();
    } else if (empty($Ideal_Fat)) {
        echo json_encode(["error" => "請輸入理想體脂"]);
        exit();
    } else {
        $Password = md5($Password);

        $sql1 = "SELECT * FROM consultant WHERE Email='$Email'";
        $result1 = mysqli_query($conn, $sql1);

        if (mysqli_num_rows($result1) > 0) {
            echo json_encode(["error" => "此Email已註冊過，請嘗試其他Email"]);
            exit();
        } else {
            $sql2 = "INSERT INTO consultant (FName, LName, Email, Password, Age, Height, Weight, Ideal_Fat, Diet_ID, Reg_Date) VALUES('$FName', '$LName', '$Email', '$Password', '$Age', '$Height', '$Weight', '$Ideal_Fat', " . ($Diet_ID ? "'$Diet_ID'" : "NULL") . ", CURRENT_TIMESTAMP)";
            $result2 = mysqli_query($conn, $sql2);
            if ($result2) {
                echo json_encode(["success" => "帳號註冊成功！"]);
                exit();
            } else {
                echo json_encode(["error" => "未知错误发生"]);
                exit();
            }
        }
    }
} else {
    echo json_encode(["error" => "請填寫所有必填欄位"]);
    exit();
}

$conn->close();
?>
