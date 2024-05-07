document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire d'événement pour la soumission du formulaire
    const playlistForm = document.getElementById('playlistForm');
    playlistForm.addEventListener('submit', handleFormSubmit);

    // Gestionnaire pour ajouter dynamiquement des champs de fichier audio
    const addSongBtn = document.getElementById('addSongBtn');
    addSongBtn.addEventListener('click', addSongField);
});

function handleFormSubmit(event) {
    event.preventDefault();

    // Création de l'objet FormData pour envoi multipart/form-data
    const formData = new FormData();
    const name = document.getElementById('playlistName').value;
    const description = document.getElementById('playlistDescription').value;
    const cover = document.getElementById('playlistCover').files[0];

    // Ajout des données de la playlist à l'objet FormData
    formData.append('name', name);
    formData.append('description', description);
    formData.append('cover', cover);

    // Ajout de chaque fichier audio à l'objet FormData
    const songFiles = document.querySelectorAll('input[type="file"]:not(#playlistCover)');
    songFiles.forEach((input, index) => {
        if (input.files[0]) {
            formData.append('song' + index, input.files[0]);
        }
    });

    // Envoi des données au serveur
    fetch('index.php?action=addPlaylist', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de la playlist');
        }
        return response.json();
    })
    .then(data => {
        console.log("Playlist ajoutée avec succès", data);
        // Réinitialiser le formulaire après l'ajout
        playlistForm.reset();
        // Optionnel : Rediriger ou afficher un message de succès ici
        alert('Playlist créée avec succès!');
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

function addSongField() {
    const container = document.getElementById('songsContainer');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*';
    container.appendChild(fileInput);
}
