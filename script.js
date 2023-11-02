const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

//show loading function
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden =true;
}
//Hide loading
function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden =true
}
// Show new quotes
function newQuote() {
    showLoadingSpinner();
    //Pick a random quotes from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field blank and replace unknow
    if(!quote.author){
        authorText.textContent= 'Unknow';
    }else{
        authorText.textContent = quote.author;
    }
    //Check the code length to detrmine to style
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote')
    }
    //set quote  hide loader
    
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    
}


// Get Quote from api

async function getQuotes(){
    showLoadingSpinner();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const responce = await fetch(apiURL)
        apiQuotes = await responce.json();
        newQuote();
    }catch(error){

    }
}

//Tweet a Quote
function tweetQuote(){
    const tweetUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl,'_blank')
}
//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//Onload
getQuotes();
