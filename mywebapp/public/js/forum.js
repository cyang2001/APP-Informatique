document.addEventListener('DOMContentLoaded', function() {
    console.log("test forum js")
    const form = document.querySelector('form'); 
    if (!form) {
        console.error("Form element not found!");
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent the form from submitting

        const formData = new FormData(form);
        fetch('../index.php?action=forum', {
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
            console.log(data); 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
});
