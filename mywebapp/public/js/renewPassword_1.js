document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('renewPassword1-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent the form from submitting
        var email = document.getElementById('email').value;
        var password = document.getElementById('code').value;

        const formData = new FormData(form);
        fetch('index.php?action=renewPassword1', {
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
                alert('Vérification réussie!');
                // redirect to home page
                window.location.href = 'renewPassword_fr_2.html';
            } else {
                alert('Erreur: ' + data.message);
                // display error message
            }
        })
    });
});