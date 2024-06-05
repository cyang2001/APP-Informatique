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
    
    formData.append('name', name);
    formData.append('description', description);
    formData.append('cover', cover);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('genre', genre);
    formData.append('music', music);

    const coverUrl = URL.createObjectURL(cover);
    const musicUrl = URL.createObjectURL(music);

    const playlistList = document.getElementById('playlistList');
    const li = document.createElement('li');
    li.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <img src="${coverUrl}" alt="Cover image" style="width: 100px; height: auto;">
    `;
    playlistList.appendChild(li);

    const musicList = document.getElementById('musicList');
    const musicLi = document.createElement('li');
    musicLi.innerHTML = `
        <h3>${title}</h3>
        <p>${artist} - ${genre}</p>
        <audio controls src="${musicUrl}"></audio>
    `;
    musicList.appendChild(musicLi);

    fetch('index.php?action=addPlaylistAndMusic', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Ajout avec succès", data);
        alert('Playlist et musique ajoutées avec succès!');
        document.getElementById('playlistForm').reset();
        window.location.href = 'playlist.html';
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

    document.getElementById('playlistForm').reset();
});
