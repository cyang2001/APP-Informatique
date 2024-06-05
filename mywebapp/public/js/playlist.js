window.onload = function() {
    fetch('index.php?action=getUserInfo', {
        method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => { 
        console.log(data);  
        const menu = document.querySelector('.menu-deroulant div');
        menu.innerHTML = ''; 
        
        if (data.email) {
            menu.innerHTML = '<a href="#" id="logout">Se déconnecter</a>';
            document.getElementById('logout').addEventListener('click', function(event) {
                event.preventDefault();
                fetch('index.php?action=logout', {
                    method: 'GET'
                })
                .then(() => location.reload());
            });
        } else {
            menu.innerHTML = '<a href="./login_fr.html">Se connecter</a><a href="./register_fr.html">S\'inscrire</a>';
        }
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {

    fetch('index.php?action=getUserInfo')
        .then(response => response.json())
        .then(data => {
            console.log('User info:', data);

            const userAccessLevel = data.accessLevel !== undefined ? data.accessLevel : 0;
            console.log(userAccessLevel)
            loadMenu(userAccessLevel);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            alert('An error occurred while fetching user info. Please try again later.');
        });


    function loadMenu(userAccessLevel) {
        fetch('index.php?action=getPages')
            .then(response => response.json())
            .then(data => {
                console.log('Pages:', data);
                const menuBox = document.querySelector('.menu_box');
                menuBox.innerHTML = ''; 
                data.forEach(page => {
                    if (userAccessLevel >= page.ID_ACCESS_LEVEL) {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.className = 'menu_item';
                        a.href = page.PAGE_URL;
                        a.textContent = page.PAGE_NAME;
                        li.appendChild(a);
                        menuBox.appendChild(li);
                        console.log('Appended item:', a);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading pages:', error);
                alert('An error occurred while loading pages. Please try again later.');
            });
    }
});

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
