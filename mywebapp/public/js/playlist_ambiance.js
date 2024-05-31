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
        { source: "source/Musique32.mp3", title: "Awake", artist: "Emmetelle" },
        { source: "source/Musique33.mp3", title: "Fragments", artist: "Nomyn" },
        { source: "source/Musique34.mp3", title: "Changes", artist: "Meydän" },
        { source: "source/Musique35.mp3", title: "Now", artist: "Vexento" },
        { source: "source/Musique36.mp3", title: "Beautiful Lies", artist: "Saurabh Alwadkar" },
        { source: "source/Musique37.mp3", title: "Inspiring Journey", artist: "Leo Sokolovsky" },
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
