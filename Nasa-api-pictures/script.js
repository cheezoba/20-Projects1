const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imageContainer = document.querySelector('.images-container');
const saveConfimed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = `DEMO_KEY`;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({
    top:0,
    behavior: "instant",
  });
  if(page === 'results') {
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
  }
  loader.classList.add('hidden');

}

function createDOMNodes(page) {
  const currentArray = page === 'results' ? resultArray : Object.values(favorites);
  currentArray.forEach((result) => {
    // Card container
    const card = document.createElement('div');
    card.classList.add('card');
    // Image Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src =  result.url;
    image.alt = 'NASA Picture of the Day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // Card Body (Explanation)
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.textContent = result.title;
    cardTitle.classList.add('card-title');
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    if(page === 'results') {
      saveText.textContent = 'Add to Favorites';
      saveText.setAttribute('onclick', `saveFavorite('${result.url}')`) ;
    } else {
      saveText.textContent = 'Remove Favorite';
      saveText.setAttribute('onclick', `removeFavorite('${result.url}')`) ;  
    }
    // Body text
    const bodyText = document.createElement('p');
    bodyText.textContent = result.explanation;
    // Footer
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date & Copyrights
    const date = document.createElement('strong');
    date.textContent = result.date;
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = `${copyrightResult}`;

    // Append to imageContainer
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, bodyText, footer);
    link.append(image);
    card.append(link, cardBody);
    imageContainer.appendChild(card);
  });

}

function updateDOM(page) {
  // Get Favorites from localStorage
  if(localStorage.getItem('nasaFavorites')){
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
  }
  imageContainer.textContent = '';
  createDOMNodes(page);
  showContent(page);
}

// Get 10 images from NASA API
async function getNasaPictures() {
  // Show Loader
  loader.classList.remove('hidden');

  try {
    const response = await fetch(apiUrl);
    resultArray = await response.json();
    // resultArray = await (await fetch(apiUrl)).json();
    updateDOM('results');
  } catch (error) {
    // Catch error here
  }
}

// Add result to Favorites
function saveFavorite(itemUrl){
  // Loop through results Array to select Favorite
  resultArray.forEach((result) =>{
    if (result.url.includes(itemUrl) && !favorites[itemUrl]){
      favorites[itemUrl] = result;
      // Show saveConfimed for 2 seconds
      saveConfimed.hidden = false;
      setTimeout(() =>{
        saveConfimed.hidden = true;
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    }
  });
}

// Remove item from Favorites
function removeFavorite(itemUrl) {
  if(favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in localStorage
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    updateDOM('favorites');
  }
}

// On Load
getNasaPictures();
