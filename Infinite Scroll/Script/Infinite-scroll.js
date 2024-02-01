const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 30;
const apiKey = 'SfIbYIuHYTycg-SHBLtv-J2pK6rmGhXPoIjhYgsb7D0';
let apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

// Helper function to set attribues on DOM Elements
function setAttributes(element,   attributes){
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Link & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each objects in photoArray
  photosArray.forEach((photo) => {

    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement ('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Add an Event Listener to check when each photo has finish loading
    img.addEventListener('load', imageLoaded);
    
    // Put <img> inside <a> and put it inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get (Fetch) Photos from Unsplash API
async function getPhotos() {

  try {
    console.log("Before Fetch - count:", count, "apiUrl:", apiUrl, "photosArray length:", photosArray.length);

    const response = await fetch(apiUrl);
    photosArray = await response.json();

    console.log("After Fetch - count:", count, "apiUrl:", apiUrl, "photosArray length:", photosArray.length);

    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();