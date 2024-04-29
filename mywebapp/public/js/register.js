document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent the form from submitting
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        var email = document.getElementById('email').value;
        var name = document.getElementById('name').value;

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return false;
        }

        const formData = new FormData(form);
        fetch('index.php?action=register', {
            method: 'POST',
            body: formData  
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  
        })
        .then(data => {
            if (data.success) {
                alert('Inscription réussie!');
                window.location.href = 'login_fr.html';
                // redirect to login page or home page
            } else {
                alert('Erreur: ' + data.message);
                // display error message
            }
        })
    });
});
