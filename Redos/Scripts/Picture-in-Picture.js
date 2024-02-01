const videoElement = document.getElementById('video');
const button = document.getElementById('button');

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    // Starting Display Capture
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
  } catch (error) {
    // Catch error here
    console.log('You do mistake chief:', error);
  }
}

button.addEventListener('click', async () => {
  // Disable Button to prevent multiple clicks
  button.disabled = true;

  // Start Picture in Picture
  await videoElement.requestPictureInPicture();

  // Enable Button
  button.disabled = false;
});
// On Load
selectMediaStream();