document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const loaders = document.querySelectorAll('.loader');
    const randomIcon = document.querySelector('.ale');
    const musicTitle = document.getElementById('musicTitle');
    const musicArtist = document.getElementById('musicArtist');
    
    let currentTrackIndex = 0; // Moved inside to avoid scope issues

    const tracks = [
        { source: "source/Musique1.mp3", title: "I Can't Stop", artist: "Punch Deck" },
        { source: "source/Musique2.mp3", title: "Night", artist: "Cloudkicker" },
        { source: "source/Musique3.mp3", title: "In Closing", artist: "Days Past" },
        { source: "source/Musique4.mp3", title: "Jacked It Up", artist: "Josh Shapiro" },
        { source: "source/Musique5.mp3", title: "No Love", artist: "Shearer" },
    ];

    // Initialize first track
    playMusic(tracks[currentTrackIndex].source, tracks[currentTrackIndex].title, tracks[currentTrackIndex].artist);

    loaders.forEach(function(loader, index) {
        loader.addEventListener('click', function() {
            if (currentTrackIndex === index && !audioPlayer.paused) {
                audioPlayer.pause();
                updateLoaderDisplay(index, false);
            } else {
                playTrack(index);
            }
        });
    });

    randomIcon.addEventListener('click', playRandomMusic);

    audioPlayer.addEventListener('ended', playNextTrack);

    function playMusic(source, title, artist) {
        audioPlayer.src = source;
        audioPlayer.play();
        musicTitle.textContent = title;
        musicArtist.textContent = artist;
        updateActiveLoader(currentTrackIndex); // Ensure UI update when playing
    }

    function playTrack(index) {
        if (currentTrackIndex !== index || audioPlayer.paused) {
            currentTrackIndex = index;
            playMusic(tracks[index].source, tracks[index].title, tracks[index].artist);
        } else {
            audioPlayer.play();
            updateLoaderDisplay(index, true);
        }
    }

    function playRandomMusic() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tracks.length);
        } while (randomIndex === currentTrackIndex);
        playTrack(randomIndex);
    }

    function playNextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
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
});
