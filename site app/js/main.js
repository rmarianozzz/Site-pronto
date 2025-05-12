
document.getElementById('showSignupBtn').addEventListener('click', function() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
  });
  
  document.getElementById('showLoginBtn').addEventListener('click', function() {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
  });
  
 
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    
   
    const loginSuccessful = true;
  
    if (loginSuccessful) {
  
      window.location.href = "test.html";
    } else {
     
      console.log('Erro ao fazer login');
    }
  });
  

  document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    const signupSuccessful = true; 
  
    if (signupSuccessful) {
    
      console.log('Cadastro realizado com sucesso!');
      document.getElementById('signup-error').textContent = 'Cadastro realizado com sucesso! Agora faça login.';
    } else {
     
      console.log('Erro ao cadastrar');
      document.getElementById('signup-error').textContent = 'Erro ao cadastrar. Tente novamente.';
    }
  });
  