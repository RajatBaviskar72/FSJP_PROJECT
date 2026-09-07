# 🔐 PHP & MySQL Authentication System

[![PHP](https://img.shields.io/badge/PHP-7.4%2B%20%7C%208.x-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-5.7%2B%20%7C%208.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Apache](https://img.shields.io/badge/Apache-HTTPD-D22128?style=for-the-badge&logo=apache&logoColor=white)](https://httpd.apache.org/)
[![XAMPP](https://img.shields.io/badge/XAMPP-Ready-FB7A24?style=for-the-badge&logo=xampp&logoColor=white)](https://www.apachefriends.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A clean, standalone, zero-dependency user authentication system built with **PHP (PDO)**, **MySQL**, and a bold **Neo-Brutalist UI** (retro monospace typography, heavy geometric borders, and hard drop shadows).

Designed specifically for **XAMPP** — runs natively via Apache with **no Node.js, npm, or Composer dependencies required**.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Directory Structure](#-directory-structure)
- [Database Auto-Setup](#-database-auto-setup)
- [Quick Start Guide](#-quick-start-guide)
- [API Reference](#-api-reference)
- [Security Highlights](#-security-highlights)
- [Troubleshooting](#-troubleshooting)
- [License & Author](#-license--author)

---

## ✨ Features

- **Neo-Brutalist UI**: Distinct high-contrast aesthetic with thick borders (`4px solid #111`), offset drop shadows (`8px 8px 0px #111`), and Google Fonts `Space Mono`.
- **Zero External Dependencies**: Pure PHP + PDO and Vanilla JavaScript. No Node.js runtime, no `package.json`, and no package manager required.
- **Automated Database & Table Provisioning**: Connects to MySQL and auto-creates both the `fsjp_project` database and `users` table on the first request if they don't already exist.
- **Secure Password Hashing**: Utilizes PHP's native `password_hash()` (Bcrypt) and `password_verify()` algorithms. Passwords are never stored in plain text or returned in responses.
- **Dual Tab Interface**: Interactive tab-switching with smooth animations between Login and Registration forms without page reloads.
- **Form Validation**: Real-time client-side checks and robust server-side validation (field completeness, email uniqueness, minimum 6-character passwords).
- **Interactive User Dashboard**: Authenticated state displays user name, email address, and formatted registration date with logout capability.

---

## 🛠️ Tech Stack

- **Backend**: PHP 7.4+ / PHP 8.x (uses native `PDO` and `pdo_mysql`)
- **Database**: MySQL / MariaDB (via XAMPP default port `3306`)
- **Server**: Apache HTTP Server (via XAMPP default port `80`)
- **Frontend**: HTML5, Vanilla CSS3 (Custom Neo-Brutalist design), Vanilla JavaScript (ES6+ `fetch` API)

---

## 📁 Directory Structure

```text
fsjp_project/
├── index.html        # Main HTML interface (Auth card & Dashboard)
├── main.js           # Client-side validation, UI state & fetch API calls
├── style.css         # Neo-Brutalist CSS styling & animations
└── api/              # Backend REST Endpoints
    ├── db.php        # PDO connection pool & automatic database/table creation
    ├── login.php     # User login & password verification endpoint
    └── register.php  # User registration & password hashing endpoint
```

---

## 🗄️ Database Auto-Setup

When any API endpoint is called (e.g., when the app loads or on register/login), [`api/db.php`](api/db.php) executes automatically:

1. Connects to MySQL server (`localhost:3306`).
2. Runs:
   ```sql
   CREATE DATABASE IF NOT EXISTS `fsjp_project`;
   ```
3. Creates the `users` table if not existing:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

> 💡 **No manual SQL imports required!** As long as MySQL is running in XAMPP, the system configures itself.

---

## 🚀 Quick Start Guide

### Prerequisites
- [XAMPP](https://www.apachefriends.org/) (with Apache & MySQL)
- Git (optional, for cloning)

---

### Step 1: Place Project in XAMPP `htdocs`

Clone or copy this repository into your XAMPP `htdocs` directory under a folder named `fsjp_project`:

- **Windows:** `C:\xampp\htdocs\fsjp_project`
- **macOS:** `/Applications/XAMPP/xamppfiles/htdocs/fsjp_project`
- **Linux:** `/opt/lampp/htdocs/fsjp_project`

#### Using Git:
```bash
# In your terminal:
cd C:\xampp\htdocs
git clone https://github.com/RajatBaviskar72/FSJP_PROJECT_PHP.git fsjp_project
```

---

### Step 2: Start Services in XAMPP

1. Launch the **XAMPP Control Panel**.
2. Click **Start** next to **Apache** (Status: running on port 80/443).
3. Click **Start** next to **MySQL** (Status: running on port 3306).

---

### Step 3: Open in Browser

Navigate directly to:
```text
http://localhost/fsjp_project/
```

Test registering a new account, logging in, viewing your user dashboard, and logging out!

---

## 📡 API Reference

All requests and responses use `Content-Type: application/json`.

### 1. Register User

- **URL:** `POST /api/register.php` (e.g. `http://localhost/fsjp_project/api/register.php`)
- **Request Body:**
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "password": "mypassword123"
  }
  ```
- **Responses:**
  - `201 Created`:
    ```json
    { "message": "Registration successful!" }
    ```
  - `400 Bad Request`:
    ```json
    { "message": "All fields are required." }
    ```
    *or*
    ```json
    { "message": "Password must be at least 6 characters." }
    ```
  - `409 Conflict`:
    ```json
    { "message": "An account with this email already exists." }
    ```

---

### 2. Login User

- **URL:** `POST /api/login.php` (e.g. `http://localhost/fsjp_project/api/login.php`)
- **Request Body:**
  ```json
  {
    "email": "alex@example.com",
    "password": "mypassword123"
  }
  ```
- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Login successful!",
      "user": {
        "id": 1,
        "name": "Alex Mercer",
        "email": "alex@example.com",
        "created_at": "2026-09-08 02:00:00"
      }
    }
    ```
  - `401 Unauthorized`:
    ```json
    { "message": "Incorrect password." }
    ```
    *or*
    ```json
    { "message": "No account found with this email." }
    ```

---

## 🛡️ Security Highlights

1. **One-Way Cryptographic Hashing**: Passwords are hashed using PHP's native `password_hash($password, PASSWORD_DEFAULT)` which applies the industry-standard bcrypt algorithm with randomized salting.
2. **Prepared Statements**: All database operations use PDO prepared statements with bound parameters (`$stmt->execute([$email])`), preventing SQL injection attacks.
3. **Password Redaction**: Password hashes are never returned to the client in login or user info responses.
4. **Input Sanitization**: User inputs are trimmed and validated before processing.

---

## ❓ Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **"Cannot connect to server"** | Apache is not running in XAMPP | Open XAMPP Control Panel and verify **Apache** is green / started. |
| **"Database connection failed"** | MySQL service stopped | Verify **MySQL** is started in XAMPP Control Panel (default port: `3306`). |
| **404 Not Found (`/fsjp_project/`)** | Incorrect folder path in `htdocs` | Confirm files are placed inside `C:\xampp\htdocs\fsjp_project\`. |
| **MySQL Port Conflict** | Port 3306 is already bound | Stop any background Windows MySQL services or change the MySQL port in XAMPP `my.ini` and update `$DB_PORT` in `api/db.php`. |
| **CORS Error** | Opened file directly in browser | Do not double-click `index.html` (which opens as `file:///...`). Always open `http://localhost/fsjp_project/`. |

---

## 👤 Author

**Rajat Baviskar**
- GitHub: [@RajatBaviskar72](https://github.com/RajatBaviskar72)
- Repository: [FSJP_PROJECT_PHP](https://github.com/RajatBaviskar72/FSJP_PROJECT_PHP)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
