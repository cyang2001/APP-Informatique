
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
document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const loaders = document.querySelectorAll('.loader');
    const randomIcon = document.querySelector('.ale');
    const nextIcon = document.querySelector('.next');
    const musicTitle = document.getElementById('musicTitle');
    const musicArtist = document.getElementById('musicArtist');

    let currentTrackIndex = -1;
    let isShuffleMode = false;

    const tracks = [
        { source: "source/Musique18.mp3", title: "Quiet Tree", artist: "Thoribass" },
        { source: "source/Musique19.mp3", title: "Saying Goodbye In The Rain", artist: "Jelsonic" },
        { source: "source/Musique20.mp3", title: "Crime Time", artist: "Leonard Richter" },
        { source: "source/Musique21.mp3", title: "The return", artist: "Alexander Nakarada" },
        { source: "source/Musique22.mp3", title: "Canon in D Major", artist: "Kevin in MacLeod" },
        { source: "source/Musique23.mp3", title: "Éteinte", artist: "Lacrymosa Industry" },
        { source: "source/Musique24.mp3", title: "Clair Obscur", artist: "Hicham Chahidi" },
        { source: "source/Musique25.mp3", title: "Dance of the Sun", artist: "Hicham Chahidi" },
        { source: "source/Musique26.mp3", title: "Tendresse", artist: "Hicham Chahidi" },
        { source: "source/Musique27.mp3", title: "Mineral", artist: "Hicham Chahidi" },
        { source: "source/Musique28.mp3", title: "Forest", artist: "Hicham Chahidi" },
        { source: "source/Musique29.mp3", title: "Genval", artist: "Hicham Chahidi" },
        { source: "source/Musique30.mp3", title: "Angello", artist: "Hicham Chahidi" },
        { source: "source/Musique31.mp3", title: "Rouge", artist: "Hicham Chahidi" },
    ];

    loaders.forEach(function(loader, index) {
        loader.addEventListener('click', function() {
            isShuffleMode = false;
            if (currentTrackIndex === index && !audioPlayer.paused) {
                audioPlayer.pause();
                updateLoaderDisplay(index, false);
            } else {
                playTrack(index);
            }
        });
    });

    randomIcon.addEventListener('click', function() {
        isShuffleMode = true;
        playRandomMusic();
    });

    nextIcon.addEventListener('click', playNextTrack);

    audioPlayer.addEventListener('ended', function() {
        if (isShuffleMode) {
            playRandomMusic();
        } else {
            playNextTrack();
        }
    });

    audioPlayer.addEventListener('play', function() {
        updateLoaderDisplay(currentTrackIndex, true);  // Activer l'animation
    });

    audioPlayer.addEventListener('pause', function() {
        updateLoaderDisplay(currentTrackIndex, false);  // Désactiver l'animation
    });

    function playMusic(source, title, artist) {
        if (audioPlayer.src !== new URL(source, window.location.href).href) {
            audioPlayer.src = source;
        }
        audioPlayer.play();
        musicTitle.textContent = title;
        musicArtist.textContent = artist;
        updateActiveLoader(currentTrackIndex);
        updateTitleColor();
    }

    function playTrack(index) {
        currentTrackIndex = index;
        playMusic(tracks[index].source, tracks[index].title, tracks[index].artist);
    }

    function playRandomMusic() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tracks.length);
        } while (randomIndex === currentTrackIndex);
        playTrack(randomIndex);
    }

    function playNextTrack() {
        if (!isShuffleMode) {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        } else {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * tracks.length);
            } while (randomIndex === currentTrackIndex);
            currentTrackIndex = randomIndex;
        }
        playTrack(currentTrackIndex);
    }

    function updateActiveLoader(index) {
        loaders.forEach(function(loader, i) {
            updateLoaderDisplay(i, i === index);
        });
    }

    function updateLoaderDisplay(loaderIndex, isActive) {
        const loader = loaders[loaderIndex];
        const numero = loader.querySelector('.numero');
        const loading = loader.querySelector('.hidden-loading');
        if (isActive) {
            numero.style.display = 'none';
            loading.style.display = 'block';
        } else {
            numero.style.display = 'block';
            loading.style.display = 'none';
        }
    }

    function updateTitleColor() {
        const allTitles = document.querySelectorAll('.name'); // Suppose que .name est la classe des titres dans chaque loader
        allTitles.forEach(title => title.classList.remove('active-title')); // Retirer la classe active de tous les titres
        const activeTitle = loaders[currentTrackIndex].querySelector('.name'); // Trouver le titre dans le loader actif
        if (activeTitle) {
            activeTitle.classList.add('active-title'); // Ajouter la classe active au titre de la piste jouée
        }
    }
});
