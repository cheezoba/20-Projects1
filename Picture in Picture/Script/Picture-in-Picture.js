const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt the user to select a media stream, then pass to video element and Play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
  } catch (error) {
    // Catch error here
    console.log('Omo you do mistake:', error);
  }
}

button.addEventListener('click', async () => {
  // Disable the button
  button.disabled = true;
  // Start Picture in Picture
  await videoElement.requestPictureInPicture();
  // Start button
  button.disabled = false;
});
// On load
selectMediaStream();