<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize input data
    $firstName = sanitizeInput($_POST['firstname']);
    $lastName = sanitizeInput($_POST['lastname']);
    $email = sanitizeInput($_POST['email']);
    $password = sanitizeInput($_POST['password']);
    $confirmPassword = sanitizeInput($_POST['confirm_password']);
    $team = isset($_POST['team']) ? sanitizeInput($_POST['team']) : '';
    $role = isset($_POST['role']) ? sanitizeInput($_POST['role']) : '';
    
    // Validate input
    if (empty($firstName) || empty($lastName) || empty($email) || empty($password) || empty($confirmPassword)) {
        sendResponse(false, 'Please fill in all required fields');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, 'Please enter a valid email address');
    }
    
    if ($password !== $confirmPassword) {
        sendResponse(false, 'Passwords do not match');
    }
    
    if (strlen($password) < 8) {
        sendResponse(false, 'Password must be at least 8 characters long');
    }
    
    // Check if user already exists
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        sendResponse(false, 'An account with this email already exists');
    }
    
    $stmt->close();
    
    // Hash password (in a real application)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    // For demo purposes, we'll use the plain password
    // $hashedPassword = $password;
    
    // Insert new user
    $fullName = $firstName . ' ' . $lastName;
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, team, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("sssss", $fullName, $email, $hashedPassword, $team, $role);
    
    if ($stmt->execute()) {
        sendResponse(true, 'Account created successfully. You can now login.', [
            'redirect' => 'login.html'
        ]);
    } else {
        sendResponse(false, 'Error creating account. Please try again.');
    }
    
    $stmt->close();
    $conn->close();
} else {
    sendResponse(false, 'Invalid request method');
}
?>