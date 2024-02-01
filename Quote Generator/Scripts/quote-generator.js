const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
let apiQuotes = [];

// Show New Quote
function newQuotes() {
  // Pick a random quote from apiQuotes array
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
  if(!randomQuote.author){
    authorText.textContent = 'Unknown'
  } else{
    authorText.textContent = randomQuote.author;
  }

  // Check Quote length to determine styling
  if(randomQuote.text > 120){
    quoteText.classList.add('long-quote');
  } else{
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = randomQuote.text;
}

// Get Quotes from API
async function getQuotes() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json()
    newQuotes();
  } catch (error) {
    // Catch Error Here
  }
}


function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();