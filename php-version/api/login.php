<?php
// =============================================
// LOGIN API — PHP Version
// Receives: { email, password } as JSON
// Does: Finds user → verifies password → returns user data
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

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

// ---- Validation ----
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['message' => 'Email and password are required.']);
    exit;
}

try {
    // Find user by email
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        echo json_encode(['message' => 'No account found with this email.']);
        exit;
    }

    // Verify password against the hash
    // password_verify() is PHP's equivalent of bcrypt.compare()
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Incorrect password.']);
        exit;
    }

    // Send back user data (NEVER send the password!)
    echo json_encode([
        'message' => 'Login successful!',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'created_at' => $user['created_at'],
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Server error: ' . $e->getMessage()]);
}
?>
