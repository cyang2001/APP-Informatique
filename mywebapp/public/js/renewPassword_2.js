document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('renewPassword2-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent the form from submitting
        var email = document.getElementById('email').value;
        var password = document.getElementById('new-password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        const formData = new FormData(form);
        fetch('index.php?action=renewPassword2', {
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
                alert('Renouveul mot de pass réussie!');
                // redirect to home page
                window.location.href = 'login_fr.html';
            } else {
                alert('Erreur: ' + data.message);
                // display error message
            }
        })
    });
});