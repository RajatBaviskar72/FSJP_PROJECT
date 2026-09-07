<?php
// =============================================
// DATABASE CONNECTION FILE
// This file connects PHP to MySQL (XAMPP)
// Other PHP files include this file to use $pdo
// =============================================

// Database settings (same as XAMPP defaults)
$DB_HOST = 'localhost';
$DB_USER = 'root';        // XAMPP default user
$DB_PASS = '';             // XAMPP default has no password
$DB_NAME = 'fsjp_project';
$DB_PORT = 3306;

try {
    // Step 1: Connect to MySQL (without selecting a database first)
    $pdo = new PDO(
        "mysql:host=$DB_HOST;port=$DB_PORT",
        $DB_USER,
        $DB_PASS
    );
    // Make PDO throw errors so we can catch them
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Step 2: Create the database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$DB_NAME`");

    // Step 3: Select the database
    $pdo->exec("USE `$DB_NAME`");

    // Step 4: Create the users table if it doesn't exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

} catch (PDOException $e) {
    // If connection fails, send error as JSON
    http_response_code(500);
    echo json_encode(['message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>
