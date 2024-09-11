document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
        alert('Login realizado com sucesso!');
        
        window.location.href = 'dashboard.html';
    } else {
        alert('Email ou senha incorretos.');
    }
});