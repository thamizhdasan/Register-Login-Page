<?php

// Database connection
$servername = "localhost";
$dbname = "database_name";

$conn = new mysqli($servername,$dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve user details
$userID = $_POST['userID'];

$sql = "SELECT * FROM users WHERE userID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $email = $row['email'];
    $age = $row['age'];
    $dob = $row['dob'];
    $mobile = $row['mobile'];
} else {
    echo "User not found";
    exit;
}

// Update user details
$email = $_POST['email'];
$age = $_POST['age'];
$dob = $_POST['dob'];
$mobile = $_POST['mobile'];

$sql = "UPDATE users SET email = ?, age = ?, dob = ?, mobile = ? WHERE userID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sisii", $email, $age, $dob, $mobile, $userID);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "success";
} else {
    echo "error";
}

$stmt->close();
$conn->close();

?>
