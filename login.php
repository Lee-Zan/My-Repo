<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize input data
    $email = sanitizeInput($_POST['email']);
    $password = sanitizeInput($_POST['password']);
    
    // Validate input
    if (empty($email) || empty($password)) {
        sendResponse(false, 'Please fill in all fields');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, 'Please enter a valid email address');
    }
    
    // Check user credentials
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT id, name, email, password, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password (in a real application, use password_verify with hashed passwords)
        if ($password === $user['password']) { // This should be password_verify($password, $user['password'])
            // Start session and store user data
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];
            $_SESSION['logged_in'] = true;
            
            sendResponse(true, 'Login successful', [
                'redirect' => 'dashboard.php'
            ]);
        } else {
            sendResponse(false, 'Invalid email or password');
        }
    } else {
        sendResponse(false, 'Invalid email or password');
    }
    
    $stmt->close();
    $conn->close();
} else {
    sendResponse(false, 'Invalid request method');
}
?>