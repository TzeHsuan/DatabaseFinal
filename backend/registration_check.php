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
require "db_check.php"; // 确保这里正确包含了数据库连接文件

// 读取输入流
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true); // 解码 JSON 数据为 PHP 数组

if (!empty($data) && isset($data['Email']) && isset($data['Password']) && isset($data['confirmPassword']) && isset($data['FName']) && isset($data['LName']) && isset($data['Age']) && isset($data['Height']) && isset($data['Weight']) && isset($data['Ideal_Fat'])) {
    $Con_ID = uniqid();
    $Email = mysqli_real_escape_string($conn, trim($data['Email']));
    $Password = mysqli_real_escape_string($conn, trim($data['Password']));
    $confirmPassword = mysqli_real_escape_string($conn, trim($data['confirmPassword']));
    $FName = mysqli_real_escape_string($conn, trim($data['FName']));
    $LName = mysqli_real_escape_string($conn, trim($data['LName']));
    $Age = mysqli_real_escape_string($conn, trim($data['Age']));
    $Height = mysqli_real_escape_string($conn, trim($data['Height']));
    $Weight = mysqli_real_escape_string($conn, trim($data['Weight']));
    $Ideal_Fat = mysqli_real_escape_string($conn, trim($data['Ideal_Fat']));
    $Diet_ID = isset($data['Diet_ID']) ? mysqli_real_escape_string($conn, trim($data['Diet_ID'])) : null;

    if (empty($Email) || empty($Password) || empty($confirmPassword) || empty($FName) || empty($LName) || empty($Age) || empty($Height) || empty($Weight) || empty($Ideal_Fat)) {
        echo json_encode(["error" => "请填写所有必填字段"]);
        exit();
    }

    if ($Password !== $confirmPassword) {
        echo json_encode(["error" => "两次输入的密码不一致"]);
        exit();
    }

    // Hash the password
    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT Email FROM consultant WHERE Email = ?");
    $stmt->bind_param("s", $Email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["error" => "此Email已注册过，请尝试其他Email"]);
        exit();
    } else {
        $insert_stmt = $conn->prepare("INSERT INTO consultant (Con_ID, FName, LName, Email, Password, Age, Height, Weight, Ideal_Fat, Diet_ID, Reg_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)");
        $insert_stmt->bind_param("sssssiiisi", $Con_ID, $FName, $LName, $Email, $hashedPassword, $Age, $Height, $Weight, $Ideal_Fat, $Diet_ID);
        $success = $insert_stmt->execute();

        if ($success) {
            echo json_encode(["success" => "账号注册成功！"]);
        } else {
            echo json_encode(["error" => "未知错误发生，无法注册账号"]);
        }
    }
    $stmt->close();
    $insert_stmt->close();
} else {
    echo json_encode(["error" => "请填写所有必填字段"]);
}
$conn->close();
?>
