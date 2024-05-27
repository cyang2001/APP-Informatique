
document.addEventListener('DOMContentLoaded', function() {

    console.log("test")
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent the form from submitting
        var titre = document.getElementById('titre').value;
        var description = document.getElementById('description').value;

        const formData = new FormData(form);
        fetch('index.php?action=forum', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        
    });
});
