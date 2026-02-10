// Sample songs data
// Sample songs data
const songs = [
    {
        id: 1,
        title: "Mother De Cacao",
        artist: "Novelyn Parcon",
        album: "E.",
        duration: 242,
        url: "https://res.cloudinary.com/dwc0m15mx/video/upload/v1770739517/Ridleys_-_Be_with_you_Lyrics_zsem9q.mp3",
        image: "assets/Novel.jfif"
    },
    {
        id: 2,
        title: "Ladding Pride",
        artist: "Ian El Nathan Rosales",
        album: "After Hours",
        duration: 200,
        url: "https://res.cloudinary.com/dwc0m15mx/video/upload/v1770737642/Ben_Ben_-_The_Ones_We_Once_Loved_Official_Lyric_Video_ca1s5q.mp3",
        image: "assets/Nathan.jfif"
    },
    {
        id: 3,
        title: "Perfect",
        artist: "Ed Sheeran",
        album: "÷",
        duration: 263,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        image: "assets/song3.jpg"
    },
    {
        id: 4,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: 203,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        image: "assets/song4.jpg"
    },
    {
        id: 5,
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷",
        duration: 234,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        image: "assets/song5.jpg"
    },
    {
        id: 6,
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        album: "Divinely Uninspired",
        duration: 182,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        image: "assets/song6.jpg"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const homePage = document.getElementById('homePage');
const playerPage = document.getElementById('playerPage');
const songDetailPage = document.getElementById('songDetailPage');
const songList = document.getElementById('songList');

const playerPlayPauseBtn = document.getElementById('playerPlayPauseBtn');
const playerPrevBtn = document.getElementById('playerPrevBtn');
const playerNextBtn = document.getElementById('playerNextBtn');
const playerProgressBar = document.getElementById('playerProgressBar');
const playerProgressBarContainer = document.getElementById('playerProgressBarContainer');
const playerCurrentTime = document.getElementById('playerCurrentTime');
const playerTotalDuration = document.getElementById('playerTotalDuration');
const playerVolumeSlider = document.getElementById('playerVolumeSlider');
const playerSpeedSlider = document.getElementById('playerSpeedSlider');
const currentSpeedDisplay = document.getElementById('currentSpeedDisplay');
const playerRepeatBtn = document.getElementById('playerRepeatBtn');
const playerShuffleBtn = document.getElementById('playerShuffleBtn');

const playerTrackTitle = document.getElementById('playerTrackTitle');
const playerTrackArtist = document.getElementById('playerTrackArtist');
const albumArt = document.getElementById('albumArt');

const backToHomeBtn = document.getElementById('backToHomeBtn');
const backToHomeFromDetailBtn = document.getElementById('backToHomeFromDetailBtn');
const playFromDetailBtn = document.getElementById('playFromDetailBtn');

const detailTrackTitle = document.getElementById('detailTrackTitle');
const detailTrackArtist = document.getElementById('detailTrackArtist');
const detailAlbumName = document.getElementById('detailAlbumName');
const detailAlbumArt = document.getElementById('detailAlbumArt');

// Added DOM element for background video
const backgroundVideo = document.getElementById('backgroundVideo');

// Initialize
function init() {
    loadSongs();
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        if (repeatMode === 2) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else if (repeatMode === 1) {
            nextSong();
        } else {
            nextSong();
        }
    });
    audioPlayer.addEventListener('error', handleAudioError);
    playerPlayPauseBtn.addEventListener('click', togglePlayPause);
    playerPrevBtn.addEventListener('click', prevSong);
    playerNextBtn.addEventListener('click', nextSong);
    playerProgressBarContainer.addEventListener('click', seek);
    playerVolumeSlider.addEventListener('input', changeVolume);
    playerSpeedSlider.addEventListener('input', changeSpeed);
    playerRepeatBtn.addEventListener('click', toggleRepeat);
    playerShuffleBtn.addEventListener('click', toggleShuffle);
    backToHomeBtn.addEventListener('click', () => showPage('home'));
    backToHomeFromDetailBtn.addEventListener('click', () => showPage('home'));
    playFromDetailBtn.addEventListener('click', () => {
        playCurrentSong();
        showPage('player');
    });

    // Background video will remain playing while audio plays (user preference)
}

function loadSongs() {
    try {
        songList.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'song-item';
            li.innerHTML = `
                <img src="${song.image}" alt="${song.title}" onerror="this.onerror=null;this.src='assets/placeholder.svg'">
                <div class="song-item-title">${song.title}</div>
                <div class="song-item-artist">${song.artist}</div>
            `;
            li.addEventListener('click', () => {
                currentSongIndex = index;
                showPage('player');
                showSongDetail();
                playCurrentSong();
            });
            songList.appendChild(li);
        });
    } catch (e) {
        console.error('Failed to load songs:', e);
        songList.innerHTML = '<li class="loading-songs">Failed to load songs</li>';
    }
}

function showSongDetail() {
    const song = songs[currentSongIndex];
    detailTrackTitle.innerHTML = song.title;
    detailTrackArtist.innerHTML = song.artist;
    detailAlbumName.innerHTML = song.album;
    detailAlbumArt.src = song.image || 'assets/placeholder.svg';
}

function playCurrentSong() {
    const song = songs[currentSongIndex];
    audioPlayer.src = song.url;
    // try to play, handle browsers that block autoplay
    audioPlayer.play().then(() => {
        isPlaying = true;
        updatePlayerDisplay();
    }).catch(err => {
        console.warn('Playback blocked or failed:', err);
        isPlaying = false;
        updatePlayerDisplay();
    });
}

function handleAudioError() {
    console.error('Audio playback error:', audioPlayer.error);
    // simple UI feedback
    alert('Failed to play this track. Skipping to the next track.');
    nextSong();
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play().catch(err => console.warn('Play failed:', err));
        isPlaying = true;
    }
    updatePlayerDisplay();
}

function updatePlayerDisplay() {
    const song = songs[currentSongIndex];
    playerTrackTitle.innerHTML = song.title;
    playerTrackArtist.innerHTML = song.artist;
    albumArt.src = song.image || 'assets/placeholder.svg';
    
    if (isPlaying) {
        playerPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        playerPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    playerTotalDuration.innerHTML = formatTime(song.duration);
}

function nextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    playCurrentSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playCurrentSong();
}

function updateProgress() {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    playerProgressBar.style.width = percent + '%';
    playerCurrentTime.innerHTML = formatTime(audioPlayer.currentTime);
}

function seek(e) {
    const width = playerProgressBarContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration || 0;
    if (duration) audioPlayer.currentTime = (clickX / width) * duration;
}

function changeVolume(e) {
    audioPlayer.volume = e.target.value;
}

function changeSpeed(e) {
    audioPlayer.playbackRate = parseFloat(e.target.value);
    currentSpeedDisplay.innerHTML = e.target.value + 'x';
}

function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    if (repeatMode === 0) {
        playerRepeatBtn.style.color = '#a0a0a0';
    } else if (repeatMode === 1) {
        playerRepeatBtn.style.color = '#f700ff';
    } else {
        playerRepeatBtn.innerHTML = '<i class="fas fa-repeat"></i><span style="font-size:0.7rem;">1</span>';
        playerRepeatBtn.style.color = '#f700ff';
        return;
    }
    playerRepeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    if (isShuffle) {
        playerShuffleBtn.style.color = '#f700ff';
    } else {
        playerShuffleBtn.style.color = '#a0a0a0';
    }
}

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    if (page === 'home') {
        homePage.classList.add('active');
    } else if (page === 'player') {
        playerPage.classList.add('active');
        updatePlayerDisplay();
    } else if (page === 'detail') {
        songDetailPage.classList.add('active');
    }
}

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Start the app
init();