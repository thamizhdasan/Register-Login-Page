<?php
// Establish database connection
$servername = "localhost";

$dbname = "database";

$conn = new mysqli($servername,$bname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute SQL statement
$stmt = $conn->prepare("INSERT INTO users (email, userID, password, age, dob, mobile) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $email, $userID, $password, $age, $dob, $mobile);

$email = $_POST['email'];
$userID = $_POST['userID'];
$password = $_POST['password'];
$age = $_POST['age'];
$dob = $_POST['dob'];
$mobile = $_POST['mobile'];

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>
