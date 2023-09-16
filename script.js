// Constants
const apiKeyInput = document.getElementById('apiKeyInput');
const SearchInput = document.getElementById('SearchInput');
const apiSearchBtn = document.getElementById('apiSearchBtn');
const SearchBtn = document.getElementById('SearchBtn');
const results = document.getElementById('results');
const loader = document.getElementById('spinner');
const URL = `https://www.omdbapi.com/`;
const API_KEY = `7c827624`;

//fetch data by movie name
async function fetchMovieDataByName(movieName, apiKey){
    const url = `${URL}?s=${movieName}&apikey=${apiKey}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

//render Fetched Data on Page
function addDataOnUI(result){
    let count = 0;
    document.getElementById('main').innerHTML = "";

    result.forEach(movie => {
        const data = `
            <div class="card">
                <img src="${movie.Poster}" class="img" alt="${movie.Title}">
                <div class="cardDetail">
                    <h1 class="cardNumber">${++count}</h1>
                    <p class="movieTitle">${movie.Title}</p>
                </div>
            </div>
        `
        document.getElementById('main').innerHTML += data;
    });
}

SearchBtn.addEventListener('click', async ()=>{
    showLoader();
    if(SearchInput.value = "" || SearchInput.value.trim() == ""){
        alert("Enter Movie Name In Search Box");
        return;
    }
    if(apiKeyInput.value = "" || apiKeyInput.value.trim() == ""){
        alert("Enter Your API KEY to API FIELD");
        return;
    }
    
    const data = await fetchMovieDataByName(SearchInput.value, apiKeyInput.value);
    console.log(data.Search);
    addDataOnUI(data.Search);
    hideLoader();
})

SearchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        SearchBtn.click();
    }
});

// Function to show the loader
function showLoader() {
    loader.style.display = 'block';
}

// Function to hide the loader and display the fetched data
function hideLoader() {
    loader.style.display = 'none';
}