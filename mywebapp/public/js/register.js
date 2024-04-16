
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent the form from submitting
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        var email = document.getElementById('email').value;

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return false;
        }


        const formData = new FormData(form);
        console.log(password);
        console.log(confirmPassword);
        console.log(email);
        fetch('../src/controllers/registerController.php', {
            method: 'POST',
            body: formData  
        })
        .then(response => response.json())  
        .then(data => {
            if (data.success) {
                alert('Inscription réussie!');
                // redirect to login page or home page
            } else {
                alert('Erreur: ' + data.message);
                // display error message
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
