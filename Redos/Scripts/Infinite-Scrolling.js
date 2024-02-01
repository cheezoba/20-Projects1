const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let photosArray = []
// Unsplash API
let count = 30;
const apiKey = 'SfIbYIuHYTycg-SHBLtv-J2pK6rmGhXPoIjhYgsb7D0';
let apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

// Check of all images were loaded
function imageloaded() {
  console.log('image loaded');
}

// Helper function for a dry code
function setAttributes(element, attributes) {
  for (const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}

// Display the picture from the API on the window
function displayPhotos() {
  // run the array through each element in the photoArray
  photosArray.forEach((photos) => {
    // create <a> for the link
    const item = document.createElement('a');
    setAttributes(item, {
      href: photos.links.html,
      target: '_blank',
    });

    // create <img> for the pictures
    const img = document.createElement('img');
    setAttributes(img, {
      src: photos.urls.regular,
      alt: photos.alt_description,
      title: photos.alt_description,
    });

    img.addEventListener('load', imageloaded);

    // put img into item and both into the imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get picture from unsplash API
async function getPhotos(){

  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch errors here
    console.log('na for here chizzy:', error)
  }
}

// Load more photos when near the bottom
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
    getPhotos();
    console.log('load more');
  }
});

// On load
getPhotos();