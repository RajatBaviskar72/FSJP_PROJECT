// =============================================
// FSJP PROJECT (PHP VERSION) — Frontend JavaScript
// Same logic, but API calls go to PHP files instead of Express
// =============================================

// ---- DOM Elements ----
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authContainer = document.getElementById('authContainer');
const dashboardContainer = document.getElementById('dashboardContainer');

const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userDate = document.getElementById('userDate');
const logoutBtn = document.getElementById('logoutBtn');

const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// ---- Tab Toggle ----
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  clearMessages();
});

registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
  clearMessages();
});

// ---- Helpers ----
function showMessage(element, text, type) {
  element.textContent = text;
  element.className = 'message ' + type;
}

function clearMessages() {
  loginMessage.textContent = '';
  loginMessage.className = 'message';
  registerMessage.textContent = '';
  registerMessage.className = 'message';
}

// ---- Register ----
registerForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  var name = document.getElementById('registerName').value.trim();
  var email = document.getElementById('registerEmail').value.trim();
  var password = document.getElementById('registerPassword').value;

  if (!name || !email || !password) {
    showMessage(registerMessage, 'Please fill in all fields.', 'error');
    return;
  }

  if (password.length < 6) {
    showMessage(registerMessage, 'Password must be at least 6 characters.', 'error');
    return;
  }

  var btn = document.getElementById('registerBtn');
  btn.disabled = true;
  btn.textContent = 'Registering...';

  try {
    // *** KEY DIFFERENCE: calls api/register.php instead of /api/register ***
    var response = await fetch('api/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });

    var data = await response.json();

    if (response.ok) {
      showMessage(registerMessage, '✓ ' + data.message + ' You can now login.', 'success');
      registerForm.reset();
      setTimeout(function () {
        loginTab.click();
      }, 1500);
    } else {
      showMessage(registerMessage, data.message || 'Registration failed.', 'error');
    }
  } catch (error) {
    showMessage(registerMessage, 'Cannot connect to server. Is XAMPP Apache running?', 'error');
  }

  btn.disabled = false;
  btn.textContent = 'Register';
});

// ---- Login ----
loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  var email = document.getElementById('loginEmail').value.trim();
  var password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showMessage(loginMessage, 'Please fill in all fields.', 'error');
    return;
  }

  var btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.textContent = 'Logging in...';

  try {
    // *** KEY DIFFERENCE: calls api/login.php instead of /api/login ***
    var response = await fetch('api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });

    var data = await response.json();

    if (response.ok) {
      showMessage(loginMessage, '✓ ' + data.message, 'success');
      setTimeout(function () {
        showDashboard(data.user);
      }, 800);
    } else {
      showMessage(loginMessage, data.message || 'Login failed.', 'error');
    }
  } catch (error) {
    showMessage(loginMessage, 'Cannot connect to server. Is XAMPP Apache running?', 'error');
  }

  btn.disabled = false;
  btn.textContent = 'Login';
});

// ---- Dashboard ----
function showDashboard(user) {
  authContainer.classList.add('hidden');
  dashboardContainer.classList.remove('hidden');
  userName.textContent = user.name;
  userEmail.textContent = user.email;
  var date = new Date(user.created_at);
  userDate.textContent = date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ---- Logout ----
logoutBtn.addEventListener('click', function () {
  dashboardContainer.classList.add('hidden');
  authContainer.classList.remove('hidden');
  loginForm.reset();
  registerForm.reset();
  clearMessages();
  loginTab.click();
});
