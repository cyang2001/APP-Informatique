document.getElementById('playlistForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(); // Créer ici pour inclure les fichiers
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const cover = document.getElementById('cover').files[0];
    
    formData.append('name', name);
    formData.append('description', description);
    formData.append('cover', cover);

    const coverUrl = URL.createObjectURL(cover);

    // Affichage de la playlist dans la liste sur la page
    const playlistList = document.getElementById('playlistList');
    const li = document.createElement('li');
    li.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <img src="${coverUrl}" alt="Cover image" style="width: 100px; height: auto;">
    `;
    playlistList.appendChild(li);

    // Envoie des données au serveur
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
        // Mettre à jour l'UI ou afficher un message de succès
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

    // Réinitialiser le formulaire après l'ajout
    document.getElementById('playlistForm').reset();
});
