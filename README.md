# 🔐 FSJP Project — Dual-Stack Authentication System

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white)](https://www.apachefriends.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A full-stack user authentication system featuring **User Registration**, **Secure Login**, and an **Interactive User Dashboard**, styled with a distinctive **Neo-Brutalist UI** (bold geometric outlines, hard offset shadows, high contrast, and monospace typography).

This project provides **two complete, independent backend implementations**:
1. **Node.js + Express Version**: Modern JavaScript full-stack architecture powered by Express, `mysql2`, `bcrypt`, and Vite dev proxy.
2. **PHP + PDO Version**: Lightweight, zero-dependency Apache backend designed for seamless deployment in XAMPP running directly at `http://localhost/fsjp_project/` with no Node.js runtime needed.

---

## 📑 Table of Contents

- [Features](#-features)
- [Architecture Comparison](#-architecture-comparison)
- [Project Directory Structure](#-project-directory-structure)
- [Database Schema & Auto-Setup](#-database-schema--auto-setup)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Option A: Running the Node.js Version](#option-a-running-the-nodejs-version)
  - [Option B: Running the PHP Version (XAMPP - http://localhost/fsjp_project/)](#option-b-running-the-php-version-xampp---httplocalhostfsjp_project)
- [API Reference](#-api-reference)
- [Security Highlights](#-security-highlights)
- [Troubleshooting](#-troubleshooting)
- [License & Author](#-license--author)

---

## ✨ Features

- **Neo-Brutalist Aesthetic**: Raw, bold, and unapologetic UI with thick geometric borders (`4px solid #111`), hard offset drop shadows (`8px 8px 0px #111`), and the `Space Mono` typeface.
- **Dual Tab Interface**: Fluid sliding tab indicator to switch effortlessly between **Login** and **Register** forms without page reloads.
- **Client & Server-side Validation**: Validates required fields, email formatting, and minimum password lengths (minimum 6 characters).
- **Automated Database Provisioning**: Both backends automatically create the `fsjp_project` database and `users` table on startup if they do not already exist.
- **Secure Password Hashing**: Utilizes industry-standard salted hashing (`bcrypt` with 10 salt rounds in Node.js, `password_hash()` with `PASSWORD_DEFAULT` in PHP). Plain-text passwords are never stored or returned in responses.
- **Protected User Dashboard**: Displays user details (Name, Email, and formatted Registration Date) upon successful authentication, with a session logout action.

---

## ⚖️ Architecture Comparison

| Feature | 🟢 Node.js / Express Version | 🟣 PHP / Apache Version |
| :--- | :--- | :--- |
| **Web App URL** | `http://localhost:5173` | `http://localhost/fsjp_project/` |
| **API Base URL** | `http://localhost:3000/api/` | `http://localhost/fsjp_project/api/` |
| **Backend Framework** | Node.js with Express 4.x | Pure PHP (7.4+ / 8.x) |
| **Web Server** | Express HTTP Server (`localhost:3000`) | Apache Web Server (via XAMPP port 80/443) |
| **Frontend Tooling** | Vite Dev Server + API Proxy | Standalone Static HTML/CSS/JS |
| **Database Driver** | `mysql2` Connection Pool | PHP Data Objects (PDO) |
| **Password Hashing** | `bcrypt` (10 salt rounds) | `password_hash()` (`PASSWORD_DEFAULT`) |
| **Dependencies** | `express`, `mysql2`, `bcrypt`, `cors`, `dotenv` | None (built-in PHP PDO extension) |
| **CORS Support** | `cors` Express middleware | HTTP response headers (`Access-Control-Allow-*`) |
| **XAMPP Requirement** | MySQL only (port 3306) | Apache + MySQL (hosted in `htdocs/fsjp_project`) |

---

## 📁 Project Directory Structure

```text
FSJP_PROJECT/
├── index.html               # Frontend HTML (Node.js/Vite version)
├── main.js                  # Frontend JS (Node.js version, calls /api/*)
├── style.css                # Neo-Brutalist CSS styling
├── vite.config.js           # Vite dev server & proxy configuration
├── package.json             # Frontend Vite scripts and dependencies
│
├── server/                  # --- NODE.JS BACKEND ---
│   ├── .env.example         # Template for environment configuration
│   ├── package.json         # Node backend dependencies (express, mysql2, bcrypt...)
│   └── server.js            # Express server, MySQL connection pool & API routes
│
└── php-version/             # --- PHP BACKEND (XAMPP READY) ---
    ├── index.html           # Frontend HTML for PHP version
    ├── main.js              # Frontend JS (calls api/*.php relative endpoints)
    ├── style.css            # Neo-Brutalist CSS styling
    └── api/                 # PHP Backend Endpoints
        ├── db.php           # PDO database connection & auto-table creation
        ├── login.php        # Login API endpoint (POST)
        └── register.php     # Registration API endpoint (POST)
```

---

## 🗄️ Database Schema & Auto-Setup

Both backends include **built-in auto-initialization**. When the server starts (or when the first PHP request is processed), the database and table are created automatically.

### Database: `fsjp_project`

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> **Note:** No manual `.sql` file importing is required. Just ensure MySQL is running in XAMPP!

---

## 🚀 Getting Started

### Prerequisites

1. **XAMPP**: Download and install [XAMPP](https://www.apachefriends.org/) (for MySQL and Apache).
2. **Node.js**: (Required only for the Node.js version) Download [Node.js](https://nodejs.org/) (v18 or higher recommended).
3. **Git**: Installed on your system.

---

### Option A: Running the Node.js Version

This option runs the frontend with **Vite** and the backend with **Node.js + Express**.

#### Step 1: Start MySQL in XAMPP
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **MySQL** (Default port: `3306`).

#### Step 2: Configure & Start the Backend Server
1. Open a terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Copy the environment variables template:
   ```bash
   # On Windows PowerShell:
   Copy-Item .env.example .env
   # Or on Git Bash / Linux / macOS:
   cp .env.example .env
   ```
   *(Ensure the database settings in `.env` match your MySQL credentials. Default XAMPP credentials use `DB_USER=root` with an empty `DB_PASSWORD`)*.
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Start the backend API:
   ```bash
   npm start
   ```
   *Console output:*
   ```text
   ✅ Database ready: fsjp_project
   ✅ Users table ready
   🚀 Server running on http://localhost:3000
   ```

#### Step 3: Start the Frontend Client
1. Open a **new terminal** and navigate to the project root:
   ```bash
   cd ..
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit:
   ```text
   http://localhost:5173
   ```

---

### Option B: Running the PHP Version (XAMPP - `http://localhost/fsjp_project/`)

This option requires **no Node.js or npm**. It runs completely within XAMPP using **Apache** and **MySQL**, served directly at `http://localhost/fsjp_project/`.

#### Step 1: Deploy to XAMPP `htdocs`
The PHP version is located in the `php-version/` directory. To access it at `http://localhost/fsjp_project/`, place the contents of `php-version/` into a folder named `fsjp_project` inside XAMPP's `htdocs`:

- **Windows Default:** `C:\xampp\htdocs\fsjp_project\`
- **macOS Default:** `/Applications/XAMPP/xamppfiles/htdocs/fsjp_project/`
- **Linux Default:** `/opt/lampp/htdocs/fsjp_project/`

You can deploy the files using either of the following methods:

##### Method 1: Copy Files
Copy all files and folders from `php-version/` into `C:\xampp\htdocs\fsjp_project\`:
```powershell
# In PowerShell from project root:
New-Item -ItemType Directory -Force -Path "C:\xampp\htdocs\fsjp_project"
Copy-Item -Path ".\php-version\*" -Destination "C:\xampp\htdocs\fsjp_project" -Recurse -Force
```

##### Method 2: Directory Junction (Recommended for Live Development)
Create a Windows directory junction so that any code edits made in `php-version/` immediately reflect at `http://localhost/fsjp_project/` without manual copying:
```cmd
cmd /c mklink /J "C:\xampp\htdocs\fsjp_project" "c:\SPACE\FSJP_PROJECT\php-version"
```

#### Step 2: Start Apache and MySQL in XAMPP
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache** (runs on port 80 / 443).
3. Click **Start** next to **MySQL** (runs on port 3306).

#### Step 3: Open in Browser
Open your browser and navigate directly to:
```text
http://localhost/fsjp_project/
```

> **Automatic DB Provisioning**: Upon the first page request or registration attempt, `api/db.php` automatically connects to MySQL, initializes the `fsjp_project` database, and creates the `users` table.

---

## 📡 API Reference

Both backends adhere to the same JSON API specification:

### 1. User Registration

- **Node.js Endpoint:** `POST http://localhost:3000/api/register` (or `/api/register` via Vite proxy)
- **PHP Endpoint:** `POST http://localhost/fsjp_project/api/register.php`
- **Headers:** `Content-Type: application/json`

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secretpassword"
}
```

#### Responses:
- **201 Created**:
  ```json
  { "message": "Registration successful!" }
  ```
- **400 Bad Request**:
  ```json
  { "message": "All fields are required." }
  ```
- **409 Conflict**:
  ```json
  { "message": "An account with this email already exists." }
  ```

---

### 2. User Login

- **Node.js Endpoint:** `POST http://localhost:3000/api/login` (or `/api/login` via Vite proxy)
- **PHP Endpoint:** `POST http://localhost/fsjp_project/api/login.php`
- **Headers:** `Content-Type: application/json`

#### Request Body:
```json
{
  "email": "john@example.com",
  "password": "secretpassword"
}
```

#### Responses:
- **200 OK**:
  ```json
  {
    "message": "Login successful!",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-09-08 02:00:00"
    }
  }
  ```
- **401 Unauthorized**:
  ```json
  { "message": "Incorrect password." }
  ```
  *or*
  ```json
  { "message": "No account found with this email." }
  ```

---

## 🛡️ Security Highlights

- **Password Salt & Hash**: Uses one-way cryptographic hashing algorithms (`bcrypt` with 10 salt rounds / PHP native `PASSWORD_DEFAULT`). Plain-text passwords are never stored in the database.
- **Sanitized Responses**: Password hashes are excluded before returning user records to the client.
- **SQL Injection Prevention**:
  - Node.js uses parameterized prepared queries (`db.promise().query(..., [params])`).
  - PHP uses PDO prepared statements (`$stmt = $pdo->prepare(...); $stmt->execute([params]);`).
- **Input Sanitation & Validation**: Whitespace trimming, email uniqueness verification, and minimum password length constraints (≥ 6 characters).

---

## ❓ Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **"Cannot connect to server" (PHP)** | Apache is stopped or folder name is incorrect | Verify **Apache** is started in XAMPP Control Panel. Ensure the target folder inside `C:\xampp\htdocs\` is named `fsjp_project` and browse to `http://localhost/fsjp_project/`. |
| **"Cannot connect to server" (Node.js)** | Express server is not running | Ensure `node server.js` is running on port 3000 inside the `server/` directory. |
| **"Database connection failed"** | MySQL service is stopped or port is blocked | Open XAMPP Control Panel and verify **MySQL** is running on port 3306. |
| **MySQL Port 3306 in use** | Another MySQL/MariaDB service is running | Stop conflicting local MySQL Windows services or adjust the port in XAMPP & `server/.env`. |
| **404 Not Found at `http://localhost/fsjp_project/`** | Missing folder in `htdocs` | Confirm that `C:\xampp\htdocs\fsjp_project\` contains `index.html`, `main.js`, `style.css`, and the `api/` folder. |
| **CORS / Network errors in browser** | Accessing HTML via `file:///` protocol | Do not open `index.html` via file explorer double-click; always access through `http://localhost/fsjp_project/` (PHP) or `http://localhost:5173` (Node.js). |

---

## 👤 Author

**Rajat Baviskar**  
- GitHub: [@RajatBaviskar72](https://github.com/RajatBaviskar72)
- Repository: [FSJP_PROJECT](https://github.com/RajatBaviskar72/FSJP_PROJECT)
