document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('forgot-email').value;
    var storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && email === storedUser.email) {
        alert('Instruções de recuperação de senha enviadas para o seu email.');
        window.location.href = 'login.html';
    } else {
        alert('Email não encontrado.');
    }
});