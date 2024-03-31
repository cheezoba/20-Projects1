const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playPauseBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    albumCover: `It was good until it wasn't`,
    name: 'Water',
    displayName: 'Water',
    artist: 'Kehlani',
  }, 
  {
    albumCover: 'Pink Friday 2',
    name: 'Barbie Dangerous',
    displayName: 'Barbie Dangerous',
    artist: 'Nicki Minaj',
  },
  {
    albumCover: 'While we wait',
    name: 'Nights Like This (feat. Ty Dolla $ign)',
    displayName: 'Nights like this',
    artist: 'Kehlani (feat. Ty Dolla $ign)',
  },
  {
    albumCover: 'For all the dogs',
    name: 'Rich Baby Daddy (feat. Sexyy Red & SZA)',
    displayName: 'Rich Baby Daddy',
    artist: 'Drake (feat Sexyy Red, SZA)',
  },
]

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playPauseBtn.classList.replace('fa-play', 'fa-pause');
  playPauseBtn.setAttribute('title', 'Pause')
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playPauseBtn.classList.replace('fa-pause', 'fa-play');
  playPauseBtn.setAttribute('title', 'Play')
  music.pause();
}

// Play or Pause Event Listener
playPauseBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(songs){
  title.textContent = songs.displayName;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
  image.src = `img/${songs.albumCover}.jpeg`;
}

// current Song
let songIndex = 0;

// Previous Song
function prevSong(){
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong(){
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgressBar(bar){
  if(isPlaying){
    const {duration, currentTime} = bar.srcElement;
    // const duration = this.duration;
    // const currentTime = this.currentTime;

    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration/60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10){
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay Switching duration element to avoid NaN
    if(durationSeconds){
      durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
    }

    // Calculate display for Current Time
    const currentMinutes = Math.floor(currentTime/60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;
  }
}

// Set progress bar
function setProgressBar(bar){
  const width = this.clientWidth;
  const clickX = bar.offsetX;
  const {duration} = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'p'){
    playSong();
  }
  else if (event.key === 's'){
    pauseSong();
  }
});
progressContainer.addEventListener('click', setProgressBar);