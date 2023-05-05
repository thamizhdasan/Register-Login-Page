<?php

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  
  // Get form data
  $email = $_POST['email'];
  $password = $_POST['password'];
  
  // Connect to MySQL database
  $conn = new mysqli('localhost', 'database');
  if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
  }
  
  // Prepare SQL statement
  $stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');
  $stmt->bind_param('s', $email);
  $stmt->execute();
  
  // Get result
  $result = $stmt->get_result();
  
  // Check if user exists
  if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $hashed_password = $row['password'];
    
    // Verify password
    if (password_verify($password, $hashed_password)) {
      // Password is correct, log in user
      session_start();
      $_SESSION['user_id'] = $row['id'];
      echo 'success';
    } else {
      // Password is incorrect
      echo 'Incorrect password';
    }
  } else {
    // User does not exist
    echo 'User does not exist';
  }
  
  // Close database connection
  $stmt->close();
  $conn->close();
  
} else {
  // Redirect to login page
  header('Location: login.php');
  exit;
}
