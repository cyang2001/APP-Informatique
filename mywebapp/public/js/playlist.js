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

    fetchPlaylists();
    fetchUserAccessLevel();
}

function handleMenuButtonClick() {
    var checkbox = document.getElementById('menu_toggle');
    checkbox.checked = !checkbox.checked;
}

// Fetch playlists from the database
async function fetchPlaylists() {
    try {
        const response = await fetch('index.php?action=getPlaylists');
        const playlists = await response.json();
        displayPlaylists(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
    }
}

// Display playlists on the page
function displayPlaylists(playlists) {
    const mainDiv = document.querySelector('.main');
    playlists.forEach(playlist => {
        const playlistDiv = document.createElement('div');
        playlistDiv.classList.add('loader');
        
        playlistDiv.innerHTML = `
            <div class="fleche">
                <a href="playlist_${playlist.NAME_PLAY_LIST.toLowerCase()}.html">
                <img class="f" src="source/fleche.png" height="50" width="50">
                </a>
            </div>
            <div class="song">
                <p class="name">${playlist.NAME_PLAY_LIST}</p>
                <p class="artist">${playlist.PLAY_LIST_DESCRIPTION}</p>
            </div>
            <div class="albumcover">
                <img class="album" src="${playlist.IMAGE_URL_PLAY_LIST}" height="100" width="100">
            </div>
        `;
        
        mainDiv.insertBefore(playlistDiv, mainDiv.lastElementChild.previousElementSibling);
    });
}

// Fetch user access level and load the menu
function fetchUserAccessLevel() {
    fetch('index.php?action=getUserInfo')
        .then(response => response.json())
        .then(data => {
            console.log('User info:', data);

            const userAccessLevel = data.accessLevel !== undefined ? data.accessLevel : 0;
            console.log(userAccessLevel);
            loadMenu(userAccessLevel);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            alert('An error occurred while fetching user info. Please try again later.');
        });
}

// Load the menu based on user access level
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

// Display new playlist from local storage if available
const newPlaylistData = JSON.parse(localStorage.getItem('newPlaylistData'));

if (newPlaylistData) {
    displayNewPlaylist(newPlaylistData);
}

// Function to display the new playlist on the page
function displayNewPlaylist(playlistData) {
    const playlistContainer = document.getElementById('playlistContainer');
    const newPlaylistElement = document.createElement('div');
    newPlaylistElement.classList.add('playlist');

    newPlaylistElement.innerHTML = `
        <h3>${playlistData.name}</h3>
        <p>${playlistData.description}</p>
        <img src="${playlistData.coverUrl}" alt="Cover image" style="width: 100px; height: auto;">
        <!-- Add other HTML elements to display other playlist information -->
    `;

    playlistContainer.appendChild(newPlaylistElement);
}
