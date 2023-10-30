const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const volumeSlider = document.querySelector('volume_slider');
const volumeUpBtn = document.getElementById('volumeUpBtn');
const volumeDownBtn = document.getElementById('volumeDownBtn');
const muteBtn = document.getElementById('muteBtn');


// Music
const songs = [
    {
        name: 'ABBA',
        displayName: 'Dancing Queen',
        artist: 'Abba',
    },
    {
        name: 'Axwell_Ingrosso',
        displayName: 'More than you know',
        artist: 'Axwell & Ingrosso',
    },
    {
        name: 'Backstreet Boys',
        displayName: 'I want it that way',
        artist: 'Backstreet Boys',
    },
    {
        name: 'Calvin Harris, Sam Smith',
        displayName: 'Desire',
        artist: 'Calvin Harris Sam Smith',
    },
    {
    name: 'Cascada',
        displayName: 'Everytime We Touch',
        artist: 'Cascada',
    },
    {
        name: 'Unknown',
        displayName: 'All Around the World',
        artist: 'Unknown',
    }
];
// Check if song is playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () =>(isPlaying ? pauseSong() : playSong()));

//  Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
};

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar  & Time
function updateProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
// Update progress bar width
const progressPercent = (currentTime / duration) * 100;
progress.style.width = `${progressPercent}%`; 
        
// Calculate display for duration
const durationMinutes = Math.floor(duration / 60);
let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
// Delay switching duration Element to avoid NaN errors
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

// Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}
};

// Set Progress Bar
function setProgressBar (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime =(clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong); 
nextBtn.addEventListener('click', nextSong);   
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);

// Set Volume
let prevVolume = 1;

        volumeUpBtn.addEventListener('click', () => {
            if (music.volume < 1) {
                music.volume += 0.1; // Increase volume by 10%
                volumeSlider.value = music.volume;
            }
        });

        volumeDownBtn.addEventListener('click', () => {
            if (music.volume > 0) {
                music.volume -= 0.1; // Decrease volume by 10%
                volumeSlider.value = music.volume;
            }
        });

        muteBtn.addEventListener('click', () => {
            if (music.muted) {
                music.muted = false;
                music.volume = prevVolume;
                volumeSlider.value = prevVolume;
                muteBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
            } else {
                prevVolume = music.volume;
                music.muted = true;
                music.volume = 0;
                volumeSlider.value = 0;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });

        volumeSlider.addEventListener('input', () => {
            music.volume = volumeSlider.value;
            if (music.volume > 0) {
                music.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
            } else {
                music.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });


