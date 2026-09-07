// =============================================
// FSJP PROJECT — Backend Server
// Express API with MySQL (XAMPP) connection
// =============================================

// ---- Load environment variables from .env file ----
const dotenv = require('dotenv');
dotenv.config();

// ---- Import packages ----
const express = require('express');   // Web framework for creating API routes
const mysql = require('mysql2');       // MySQL database driver
const bcrypt = require('bcrypt');      // Password hashing library
const cors = require('cors');          // Allows frontend to talk to backend

// ---- Create Express app ----
const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
// These run on every request before reaching our routes

app.use(cors());                       // Allow cross-origin requests (frontend → backend)
app.use(express.json());               // Parse JSON request bodies

// ---- MySQL Database Connection ----
// Creates a connection pool (efficient way to manage multiple connections)
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fsjp_project',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// ---- Auto-create Database & Table on startup ----
// This runs when the server starts — creates the database and users table if they don't exist
async function initializeDatabase() {
  // First, connect without specifying a database to create it
  const tempConnection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
  });

  return new Promise((resolve, reject) => {
    // Step 1: Create the database if it doesn't exist
    tempConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'fsjp_project'}\``,
      (err) => {
        if (err) {
          console.error('❌ Failed to create database:', err.message);
          reject(err);
          return;
        }
        console.log('✅ Database ready: ' + (process.env.DB_NAME || 'fsjp_project'));
        tempConnection.end();

        // Step 2: Create the users table if it doesn't exist
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;

        db.query(createTableSQL, (err) => {
          if (err) {
            console.error('❌ Failed to create users table:', err.message);
            reject(err);
            return;
          }
          console.log('✅ Users table ready');
          resolve();
        });
      }
    );
  });
}

// =============================================
// API ROUTES
// =============================================

// ---- REGISTER Route ----
// POST /api/register
// Receives: { name, email, password }
// Does: Validates input → hashes password → saves to database
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Check if email already exists in database
    const [existingUsers] = await db.promise().query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    // Hash the password (never store plain text passwords!)
    // The number 10 is the "salt rounds" — higher = more secure but slower
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.promise().query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    console.log(`✅ New user registered: ${email}`);
    res.status(201).json({ message: 'Registration successful!' });

  } catch (error) {
    console.error('❌ Register error:', error.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ---- LOGIN Route ----
// POST /api/login
// Receives: { email, password }
// Does: Finds user by email → compares password hash → returns user data
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const [users] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'No account found with this email.' });
    }

    const user = users[0];

    // Compare the provided password with the hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    console.log(`✅ User logged in: ${email}`);

    // Send back user data (but NEVER send the password!)
    res.json({
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
    });

  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ---- Start the Server ----
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 ========================================');
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('🚀 ========================================');
      console.log('');
    });
  } catch (error) {
    console.error('');
    console.error('❌ ========================================');
    console.error('❌ Failed to start server!');
    console.error('❌ Make sure XAMPP MySQL is running.');
    console.error('❌ ========================================');
    console.error('');
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

startServer();
