const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-button");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}
// Get quote from API

async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://vast-basin-72216.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    //If author is blank, add "Unknown"
    if (data.quoteAuthor === "") {
      quoteAuthor.innerText = "Unknown";
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }

    //Reduce font-size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;
    //Stop loader, show quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

//Tweet quote

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
  window.open(twitterUrl, " _blank");
}

//Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

// On page load

getQuote();
