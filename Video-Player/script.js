const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');




// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused){
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else{
    video.pause();
    showPlayIcon();
  }
}

// When Video Ends, Show Play Icon
video.addEventListener('ended', showPlayIcon);




// Progress Bar ---------------------------------- //
// Calculate display time format
function displayTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;

  return `${minutes}:${seconds}`;
}

// update Progress Bar as video plays and Populate the currentTime and duration to display in the UI
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(c) {
  const newTime = c.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}




// Volume Controls --------------------------- //
let lastVolume = 1;
// Change volume
function changeVolume(c) {
  let volume = c.offsetX / volumeBar.offsetWidth;
  // Rounding Volume up or down
  if (volume < 0.1){
    volume = 0;
  }
  if (volume > 0.9){
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`
  video.volume = volume;
  console.log(volume);

  // Change volume icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0){
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0){
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

// Mute/Unmute
function toggleMute() {
  if(video.volume){
    volumeIcon.className = '';
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    // Unmute volume icon depending on lastVolume
    volumeIcon.className = '';
    if (lastVolume > 0.7) {
      volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (lastVolume < 0.7 && lastVolume > 0){
      volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (lastVolume === 0){
      volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    volumeIcon.setAttribute('title', 'Mute');
  }
}




// Change Playback Speed -------------------- //
function changedSpeed() {
  video.playbackRate = speed.value;
}



// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen){ /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen){ /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');

}

let fullscreen = false;
// Toggle Fullscreen
function toggleFullScreen() {
  if(!fullscreen){
    openFullscreen(player)
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changedSpeed);
fullscreenBtn.addEventListener('click', toggleFullScreen)