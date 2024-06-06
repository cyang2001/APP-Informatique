document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('page-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent the form from submitting
        var pageName = document.getElementById('page_name').value;
        var pageUrl = document.getElementById('page_url').value;
        var parentId = document.getElementById('parent_id').value;
        var accessLevel = document.getElementById('access_level').value;
        const formData = new FormData(form);
        fetch('index.php?action=addPage', {
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
                alert('Your page has been added successfully!');
                // redirect to home page
                window.location.href = '#';
            } else {
                alert('Erreur: ' + data.message);
                // display error message
            }
        })
    });
});