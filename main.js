// =============================================
// FSJP PROJECT — Frontend JavaScript
// Handles: Tab toggle, Form submission, API calls
// =============================================

// ---- DOM Elements ----
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const tabIndicator = document.getElementById('tabIndicator');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authContainer = document.getElementById('authContainer');
const dashboardContainer = document.getElementById('dashboardContainer');

// Dashboard elements
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userDate = document.getElementById('userDate');
const logoutBtn = document.getElementById('logoutBtn');

// Message elements
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// ---- Tab Toggle ----
// When user clicks "Login" or "Register" tab, switch the visible form
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  tabIndicator.classList.remove('right');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  clearMessages();
});

registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  tabIndicator.classList.add('right');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
  clearMessages();
});

// ---- Helper: Show Message ----
function showMessage(element, text, type) {
  element.textContent = text;
  element.className = `message ${type}`; // type = 'success' or 'error'
}

function clearMessages() {
  loginMessage.textContent = '';
  loginMessage.className = 'message';
  registerMessage.textContent = '';
  registerMessage.className = 'message';
}

// ---- Register Form Submit ----
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Stop page from refreshing

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;

  // Basic validation
  if (!name || !email || !password) {
    showMessage(registerMessage, 'Please fill in all fields.', 'error');
    return;
  }

  if (password.length < 6) {
    showMessage(registerMessage, 'Password must be at least 6 characters.', 'error');
    return;
  }

  // Disable button while loading
  const btn = document.getElementById('registerBtn');
  btn.disabled = true;
  btn.textContent = 'Registering...';

  try {
    // Send data to our backend API
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(registerMessage, '✓ ' + data.message + ' You can now login.', 'success');
      registerForm.reset();
      // Auto-switch to login tab after 1.5 seconds
      setTimeout(() => {
        loginTab.click();
      }, 1500);
    } else {
      showMessage(registerMessage, data.message || 'Registration failed.', 'error');
    }
  } catch (error) {
    showMessage(registerMessage, 'Cannot connect to server. Is the backend running?', 'error');
  }

  btn.disabled = false;
  btn.textContent = 'Register';
});

// ---- Login Form Submit ----
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showMessage(loginMessage, 'Please fill in all fields.', 'error');
    return;
  }

  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.textContent = 'Logging in...';

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(loginMessage, '✓ ' + data.message, 'success');
      // Show dashboard after a short delay
      setTimeout(() => {
        showDashboard(data.user);
      }, 800);
    } else {
      showMessage(loginMessage, data.message || 'Login failed.', 'error');
    }
  } catch (error) {
    showMessage(loginMessage, 'Cannot connect to server. Is the backend running?', 'error');
  }

  btn.disabled = false;
  btn.textContent = 'Login';
});

// ---- Show Dashboard ----
function showDashboard(user) {
  authContainer.classList.add('hidden');
  dashboardContainer.classList.remove('hidden');

  userName.textContent = user.name;
  userEmail.textContent = user.email;

  // Format the date nicely
  const date = new Date(user.created_at);
  userDate.textContent = date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ---- Logout ----
logoutBtn.addEventListener('click', () => {
  dashboardContainer.classList.add('hidden');
  authContainer.classList.remove('hidden');
  loginForm.reset();
  registerForm.reset();
  clearMessages();
  loginTab.click();
});
