let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("formTitle").innerText = isLogin ? "Login" : "Register";
  document.querySelector("button").innerText = isLogin ? "Login" : "Register";
  document.getElementById("toggleText").innerHTML = isLogin
    ? `Don't have an account? <a onclick="toggleForm()">Register</a>`
    : `Already have an account? <a onclick="toggleForm()">Login</a>`;
  document.getElementById("message").innerText = "";
}

function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

function submitForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const messageBox = document.getElementById("message");
  messageBox.innerText = "";

  if (!username || !password) {
    messageBox.innerText = "Please fill in all fields.";
    return;
  }

  if (isLogin) {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (!storedUser) {
      messageBox.innerText = "User not found. Please register first.";
      return;
    }

    if (storedUser.password === password) {
      document.getElementById("formBox").style.display = "none";
      document.getElementById("securePage").style.display = "block";
    } else {
      messageBox.innerText = "Incorrect password.";
    }
  } else {
    if (!isValidPassword(password)) {
      messageBox.innerText = "Password must be 8+ chars, include upper, lower, number & special char.";
      return;
    }

    if (localStorage.getItem(username)) {
      messageBox.innerText = "Username already taken.";
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      messageBox.style.color = "lightgreen";
      messageBox.innerText = "Registered successfully! You can now login.";
      toggleForm();
    }
  }
}

function logout() {
  document.getElementById("formBox").style.display = "block";
  document.getElementById("securePage").style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("message").innerText = "";
  document.getElementById("message").style.color = "#ff5252";
}
