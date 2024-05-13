// Récupérez les informations de la playlist créée depuis le localStorage
const newPlaylistData = JSON.parse(localStorage.getItem('newPlaylistData'));

// Affichez la playlist créée sur la page playlist.html
if (newPlaylistData) {
    displayNewPlaylist(newPlaylistData);
}

// Fonction pour afficher la playlist créée sur la page
function displayNewPlaylist(playlistData) {
    // Créez des éléments HTML pour afficher les informations de la playlist
    const playlistContainer = document.getElementById('playlistContainer');
    const newPlaylistElement = document.createElement('div');
    newPlaylistElement.classList.add('playlist');

    newPlaylistElement.innerHTML = `
        <h3>${playlistData.name}</h3>
        <p>${playlistData.description}</p>
        <img src="${playlistData.coverUrl}" alt="Cover image" style="width: 100px; height: auto;">
        <!-- Ajoutez d'autres éléments HTML pour afficher les autres informations de la playlist -->
    `;

    // Ajoutez la nouvelle playlist à la suite des playlists existantes
    playlistContainer.appendChild(newPlaylistElement);
}
