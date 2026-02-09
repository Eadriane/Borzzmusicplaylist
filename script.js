// Sample songs data
const songs = [
    {
        id: 1,
        title: "Heat Waves",
        artist: "Glass Animals",
        album: "Dreamland",
        duration: 243,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        image: "https://placehold.co/300x300/3a3a4e/e0e0e0?text=Heat+Waves"
    },
    {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://placehold.co/300x300/3a3a4e/e0e0e0?text=Blinding+Lights"
    },
    {
        id: 3,
        title: "Perfect",
        artist: "Ed Sheeran",
        album: "÷",
        duration: 263,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        image: "https://placehold.co/300x300/3a3a4e/e0e0e0?text=Perfect"
    },
    {
        id: 4,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: 203,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        image: "https://placehold.co/300x300/3a3a4e/e0e0e0?text=Levitating"
    },
    {
        id: 5,
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷",
        duration: 234,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        image: "https://placehold.co/300x300/3a3a4e/e0e0e0?text=Shape+of+You"
    },
    {
        id: 6,
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        album: "Divinely Uninspired",
        duration: 182,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        image: "https://placehold.co/300x300/3a3a4e/e0e0e0?text=Someone+You+Loved"
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

// Initialize
function init() {
    loadSongs();
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
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
}

function loadSongs() {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.className = 'song-item';
        li.innerHTML = `
            <img src="${song.image}" alt="${song.title}">
            <div class="song-item-title">${song.title}</div>
            <div class="song-item-artist">${song.artist}</div>
        `;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            showPage('detail');
            showSongDetail();
        });
        songList.appendChild(li);
    });
}

function showSongDetail() {
    const song = songs[currentSongIndex];
    detailTrackTitle.innerHTML = song.title;
    detailTrackArtist.innerHTML = song.artist;
    detailAlbumName.innerHTML = song.album;
    detailAlbumArt.src = song.image;
}

function playCurrentSong() {
    const song = songs[currentSongIndex];
    audioPlayer.src = song.url;
    audioPlayer.play();
    isPlaying = true;
    updatePlayerDisplay();
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updatePlayerDisplay();
}

function updatePlayerDisplay() {
    const song = songs[currentSongIndex];
    playerTrackTitle.innerHTML = song.title;
    playerTrackArtist.innerHTML = song.artist;
    albumArt.src = song.image;
    
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
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    playerProgressBar.style.width = percent + '%';
    playerCurrentTime.innerHTML = formatTime(audioPlayer.currentTime);
}

function seek(e) {
    const width = playerProgressBarContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
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
        playerRepeatBtn.style.color = '#00d4ff';
    } else {
        playerRepeatBtn.innerHTML = '<i class="fas fa-repeat"></i><span style="font-size:0.7rem;">1</span>';
        playerRepeatBtn.style.color = '#00d4ff';
        return;
    }
    playerRepeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    if (isShuffle) {
        playerShuffleBtn.style.color = '#00d4ff';
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
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Handle audio ended event based on repeat mode
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

// Start the app
init();
