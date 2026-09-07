<?php
// =============================================
// REGISTER API — PHP Version
// Receives: { name, email, password } as JSON
// Does: Validates → hashes password → saves to MySQL
// =============================================

// Tell the browser we're sending JSON back
header('Content-Type: application/json');

// Allow requests from the frontend
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Only POST method is allowed.']);
    exit;
}

// Include database connection
require_once 'db.php';

// Read the JSON data sent from the frontend
$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

// ---- Validation ----
if (empty($name) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['message' => 'All fields are required.']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['message' => 'Password must be at least 6 characters.']);
    exit;
}

try {
    // Check if email already exists
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['message' => 'An account with this email already exists.']);
        exit;
    }

    // Hash the password (PHP has this built-in — no extra package needed!)
    // password_hash() is PHP's equivalent of bcrypt
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert the new user
    $stmt = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$name, $email, $hashedPassword]);

    http_response_code(201);
    echo json_encode(['message' => 'Registration successful!']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Server error: ' . $e->getMessage()]);
}
?>
