CREATE DATABASE futhub;

USE futhub;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    team VARCHAR(100),
    role ENUM('manager', 'coach', 'player', 'scout', 'analyst'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);