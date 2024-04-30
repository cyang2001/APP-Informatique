document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent the form from submitting
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        const formData = new FormData(form);
        fetch('index.php?action=login', {
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
                // delete alert if needs to be removed
                alert('Connexion réussie!');
                // redirect to home page
                window.location.href = 'homePage.html';
            } else {
                alert('Erreur: ' + data.message);
                // display error message
            }
        })
    });
});