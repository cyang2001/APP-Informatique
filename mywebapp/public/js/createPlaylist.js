document.getElementById('playlistForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const cover = document.getElementById('cover').files[0];
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const genre = document.getElementById('genre').value;
    const music = document.getElementById('music').files[0];
    
    // Ajout des données de la playlist au formData
    formData.append('name', name);
    formData.append('description', description);
    formData.append('cover', cover);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('genre', genre);
    formData.append('music', music);

    // Traitement des images
    const coverUrl = URL.createObjectURL(cover);
    const musicUrl = URL.createObjectURL(music);

    // Ajout des infos de playlist au DOM
    const playlistList = document.getElementById('playlistList');
    const li = document.createElement('li');
    li.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <img src="${coverUrl}" alt="Cover image" style="width: 100px; height: auto;">
    `;
    playlistList.appendChild(li);

    // Ajout des musiques au DOM
    const musicList = document.getElementById('musicList');
    const musicLi = document.createElement('li');
    musicLi.innerHTML = `
        <h3>${title}</h3>
        <p>${artist} - ${genre}</p>
        <audio controls src="${musicUrl}"></audio>
    `;
    musicList.appendChild(musicLi);

    // Envoie des données au serveur pour la playlist et la musique
    fetch('index.php?action=addPlaylistAndMusic', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Ajout avec succès", data);
        alert('Playlist et musique ajoutées avec succès!');
        document.getElementById('playlistForm').reset(); // Réinitialiser après confirmation

        // Enregistrement des informations de la playlist dans le localStorage
        const playlistData = {
            name: name,
            description: description,
            coverUrl: coverUrl,
            musicTitle: title,
            musicArtist: artist,
            musicGenre: genre,
            musicUrl: musicUrl
        };
        localStorage.setItem('newPlaylistData', JSON.stringify(playlistData));

         // Redirection vers la page de playlist
         window.location.href = 'playlist.html';
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

      // Réinitialiser le formulaire après l'ajout
      document.getElementById('playlistForm').reset();
});