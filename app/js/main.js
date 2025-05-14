document.getElementById('showSignupBtn').addEventListener('click', function () {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
  });
  
  document.getElementById('showLoginBtn').addEventListener('click', function () {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
  });
  
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const loginSuccessful = true;
  
    if (loginSuccessful) {
      window.location.href = "test.html";
    } else {
      console.log('Erro ao fazer login');
    }
  });
  
  document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
  
    const signupSuccessful = true;
  
    if (signupSuccessful) {
      console.log('Cadastro realizado com sucesso!');
      document.getElementById('signup-error').textContent = 'Cadastro realizado com sucesso! Agora faça login.';
    } else {
      console.log('Erro ao cadastrar');
      document.getElementById('signup-error').textContent = 'Erro ao cadastrar. Tente novamente.';
    }
  });
  