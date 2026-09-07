# 🔐 FSJP Project — Full Stack Authentication System

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![XAMPP](https://img.shields.io/badge/XAMPP-MySQL-FB7A24?style=for-the-badge&logo=xampp&logoColor=white)](https://www.apachefriends.org/)

A modern, full-stack user authentication system featuring **User Registration**, **Secure Login**, and an **Interactive User Dashboard**, styled with a distinctive **Neo-Brutalist UI** (bold geometric outlines, hard offset drop shadows, high contrast, and monospace typography).

Built with **Node.js**, **Express**, **MySQL (via XAMPP)**, and **Vite**.

> 💡 **Looking for the pure PHP version?**  
> A standalone, zero-dependency PHP + MySQL version of this project is maintained in its own dedicated repository:  
> 👉 [**FSJP_PROJECT_PHP**](https://github.com/RajatBaviskar72/FSJP_PROJECT_PHP)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Database Schema & Auto-Setup](#-database-schema--auto-setup)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Step 1: Start MySQL in XAMPP](#step-1-start-mysql-in-xampp)
  - [Step 2: Configure & Start Backend Server](#step-2-configure--start-backend-server)
  - [Step 3: Start Frontend Client](#step-3-start-frontend-client)
- [API Reference](#-api-reference)
- [Security Highlights](#-security-highlights)
- [Troubleshooting](#-troubleshooting)
- [Author & License](#-author--license)

---

## ✨ Features

- **Neo-Brutalist Aesthetic**: Raw, bold, and unapologetic UI with thick geometric borders (`4px solid #111`), hard offset drop shadows (`8px 8px 0px #111`), and the `Space Mono` typeface.
- **Dual Tab Interface**: Fluid sliding tab indicator to switch effortlessly between **Login** and **Register** forms without page reloads.
- **Client & Server-side Validation**: Validates required fields, email formatting, and minimum password lengths (minimum 6 characters).
- **Automated Database Provisioning**: Automatically creates the `fsjp_project` database and `users` table upon backend startup if they do not already exist.
- **Secure Password Hashing**: Utilizes industry-standard salted hashing with `bcrypt` (10 salt rounds). Plain-text passwords are never stored in the database or returned in responses.
- **Vite Dev Proxy**: Vite dev server forwards `/api/*` requests to the Express backend running on port 3000, eliminating CORS issues during development.
- **Protected User Dashboard**: Displays user details (Name, Email, and formatted Registration Date) upon successful authentication, with a session logout action.

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 & CSS3**: Custom Neo-Brutalist styling with Flexbox and CSS variables.
- **JavaScript (ES6+)**: Asynchronous `fetch()` API, DOM manipulation, and dynamic validation.
- **Vite**: Ultra-fast frontend development server and bundler.

### Backend
- **Node.js & Express.js**: REST API server handling authentication endpoints.
- **mysql2**: High-performance MySQL driver with connection pooling.
- **bcrypt**: Cryptographic password hashing.
- **cors**: Cross-Origin Resource Sharing middleware.
- **dotenv**: Environment variable management.

### Database & Server Environment
- **MySQL**: Relational database storage (running locally via XAMPP on port 3306).

---

## 📁 Project Directory Structure

```text
FSJP_PROJECT/
├── index.html               # Frontend HTML structure
├── main.js                  # Frontend JS (tab toggle, form validation & API fetch)
├── style.css                # Neo-Brutalist CSS design system
├── vite.config.js           # Vite dev server & backend API proxy configuration
├── package.json             # Frontend dependencies & scripts
│
└── server/                  # --- BACKEND SERVER ---
    ├── .env                 # Environment variables (DB credentials & port)
    ├── .env.example         # Template for environment configuration
    ├── package.json         # Backend dependencies (express, mysql2, bcrypt, cors, dotenv)
    └── server.js            # Express server, MySQL connection pool & API routes
```

---

## 🗄️ Database Schema & Auto-Setup

The backend includes **built-in auto-initialization**. When `server.js` starts, it automatically executes:

```sql
CREATE DATABASE IF NOT EXISTS `fsjp_project`;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> **Note:** No manual `.sql` script import is required! Just make sure MySQL is running in XAMPP before starting the server.

---

## 🚀 Getting Started

### Prerequisites

1. **Node.js**: Installed on your system ([Download Node.js](https://nodejs.org/) — v18 or higher recommended).
2. **XAMPP**: Installed for MySQL database services ([Download XAMPP](https://www.apachefriends.org/)).
3. **Git**: Installed on your system.

---

### Step 1: Start MySQL in XAMPP
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **MySQL** (Status: running on port `3306`).
*(Apache is not required for this Node.js version, but can remain running without conflict).*

---

### Step 2: Configure & Start Backend Server

1. Open your terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Set up your `.env` file from the example template:
   ```bash
   # Windows PowerShell:
   Copy-Item .env.example .env
   # Or on Git Bash / Linux / macOS:
   cp .env.example .env
   ```
   *(By default, XAMPP uses `DB_USER=root` with an empty `DB_PASSWORD`, which matches `.env.example`)*.

3. Install backend dependencies:
   ```bash
   npm install
   ```

4. Start the Express backend server:
   ```bash
   npm start
   ```

   *Expected console output:*
   ```text
   ✅ Database ready: fsjp_project
   ✅ Users table ready
   🚀 ========================================
   🚀 Server running on http://localhost:3000
   🚀 ========================================
   ```

---

### Step 3: Start Frontend Client

1. Open a **second terminal window** and navigate to the project root:
   ```bash
   cd c:\SPACE\FSJP_PROJECT
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

You are ready! Test registering a user, logging in to view your dashboard card, and logging out.

---

## 📡 API Reference

All requests and responses use `Content-Type: application/json`.

### 1. User Registration

- **Endpoint:** `POST /api/register` (e.g. `http://localhost:3000/api/register` or proxied via `http://localhost:5173/api/register`)
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
  *or*
  ```json
  { "message": "Password must be at least 6 characters." }
  ```
- **409 Conflict**:
  ```json
  { "message": "An account with this email already exists." }
  ```

---

### 2. User Login

- **Endpoint:** `POST /api/login` (e.g. `http://localhost:3000/api/login` or proxied via `http://localhost:5173/api/login`)
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

1. **One-Way Salted Cryptographic Hashing**: Passwords are hashed with `bcrypt` using 10 salt rounds. Plain-text passwords are never saved to the database.
2. **Prepared Queries (SQL Injection Prevention)**: Parameterized queries (`db.promise().query('... WHERE email = ?', [email])`) ensure user inputs cannot alter SQL query logic.
3. **Password Redaction**: Password hashes are stripped before returning user records in API responses.
4. **Input Sanitization**: Client and server-side whitespace trimming and validation prevent empty entries or malformed submissions.

---

## ❓ Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **"Cannot connect to server" in browser** | Express backend server is not running | Ensure `npm start` is active in your `server/` terminal and running on port 3000. |
| **"Failed to start server! Make sure XAMPP MySQL is running"** | MySQL service stopped or port blocked | Open XAMPP Control Panel and ensure **MySQL** is started on port `3306`. |
| **MySQL Port 3306 Conflict** | Another local MySQL service is running | Stop the conflicting Windows MySQL service via `services.msc`, or update the port in `server/.env`. |
| **Port 3000 already in use** | Another Node process is running on port 3000 | Change `PORT=3001` in `server/.env` and update the proxy target in `vite.config.js`. |

---

## 👤 Author & License

**Rajat Baviskar**  
- GitHub: [@RajatBaviskar72](https://github.com/RajatBaviskar72)
- Repository: [FSJP_PROJECT](https://github.com/RajatBaviskar72/FSJP_PROJECT)
- Standalone PHP Version: [FSJP_PROJECT_PHP](https://github.com/RajatBaviskar72/FSJP_PROJECT_PHP)

Distributed under the **MIT License**.
