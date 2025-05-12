import { login, cadastrarUsuário } from "./auth.js";


const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const showSignupBtn = document.getElementById("show-signup-btn");
const backToLoginBtn = document.getElementById("back-to-login-btn");


const loginError = document.getElementById("login-error");
const signupError = document.getElementById("signup-error");


loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const result = await login(email, password);
  if (result.success) {
    window.location.href = "home.html";
  } else {
    loginError.textContent = "Erro: " + result.message;
  }
});


signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  const result = await cadastrarUsuário(email, password);
  if (result.success) {
    signupError.style.color = "green";
    signupError.textContent = "Conta criada com sucesso! Faça login.";
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
  } else {
    signupError.textContent = "Erro: " + result.message;
  }
});


showSignupBtn.addEventListener("click", () => {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("signupSection").style.display = "block";
});


backToLoginBtn.addEventListener("click", () => {
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
});
