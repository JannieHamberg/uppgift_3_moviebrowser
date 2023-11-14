// Set up eventlisters for search input and button
function eventListeners() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
      updateHero(searchInput);
    }
    if (searchButton) {
      onSearchClick(searchButton, searchInput);
    }
// Check if on search results page, handle stored data
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
      handleStoredResults(resultsContainer);
    }
  }
// Eventlistener for search input
  function updateHero(searchInput) {
    const dynamicSearchText = document.getElementById('dynamic-search-text');
    if (dynamicSearchText) {
    searchInput.addEventListener('input', () => syncSearchText(searchInput, dynamicSearchText));
    }
  }
// Updates hero text as user types in search input
  function syncSearchText(searchInput, dynamicSearchText) {
    try {
      dynamicSearchText.textContent = searchInput.value.trim() ? `"${searchInput.value}"` : '';
    } catch (error) {
      console.error('Error updating search text in hero section:', error);
    }
  }
//Eventlistener for search button
  function onSearchClick(searchButton, searchInput) {
    searchButton.addEventListener('click', (event) => initiateSearch(event, searchInput));
  }
// Starts search when search btn is clicked
  function initiateSearch(event, searchInput) {
    event.preventDefault();
    try {
      const searchText = searchInput.value;
      searchMovies(searchText);
    } catch (error) {
      console.error('Error initiating search:', error);
    }
  }
  
// Handle displaying search results or errors from storage
  function handleStoredResults(resultsContainer) {
    try {
      ifError();
      displayStoredResults(resultsContainer);
    } catch (error) {
      console.error('Error handling stored search results:', error);
    }
  }

// Check if error occured during search
  function ifError() {
    const searchError = sessionStorage.getItem('searchError');
    if (searchError === 'true') {
      displayError();
      sessionStorage.removeItem('searchError');
    }
  }

// Display error msg if error occurs during search
function displayError() {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
    <div class="error-div">
        <p class="error-msg">Junior coder...</p>
        <img src="images/error-img.png" alt="error image" class="error-img" />
    </div>
`;
    }
}
// Display stored results
  function displayStoredResults(resultsContainer) {
    const storedResults = sessionStorage.getItem('searchResults');
    if (storedResults) {
      displaySearchResults(JSON.parse(storedResults), resultsContainer);
      sessionStorage.removeItem('searchResults');
    }
  }
document.addEventListener('DOMContentLoaded', eventListeners);
  
// Search for movies
function searchMovies(searchText) {
// api key
 const apiKey = '03b494ebe50361cd87fe561b366ff9d4'; 
// base url
 const baseUrl = 'https://api.themoviedb.org/3/search/movie';
// Handle special characters
 const queryTxt = encodeURIComponent(searchText);
//Full url
 const url = `${baseUrl}?api_key=${apiKey}&language=en-US&query=${queryTxt}&page=1&include_adult=false`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Whoops! Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
// Checks if searchResult element exists on current page. 
//If it does, display the results there. 
//If not, store and redirect to searchresults.html
        if (document.getElementById('searchResults')) {
            displaySearchResults(data.results);
        } else {
// Stores results and redirects to the searchresults.html
            sessionStorage.setItem('searchResults', JSON.stringify(data.results));
            window.location.href = 'searchresults.html'; 
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        sessionStorage.setItem('searchError', 'true');
        window.location.href = 'searchresults.html';
    });
}

// Show results on the searchresults.html page
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
// Check if results exist
// If no results, display msg
if (resultsContainer) {
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No results to display :( Try something else!';
        noResults.className = 'no-results'; 
        resultsContainer.appendChild(noResults);
    } else {
//Loop through results, shorten txt then display
     results.forEach(movie => {    
      if (movie.poster_path) {
        
        const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        const movieElement = document.createElement('div');
        movieElement.classList.add('col'); 
        const shortText = movie.overview.substring(0, 100) + '...';
        movieElement.innerHTML = `
            <div class="card">
                <img src="${posterUrl}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${shortText}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Release Date: ${movie.release_date}</small>
                </div>
            </div>
        `;
        resultsContainer.style.backgroundColor = "black";
        resultsContainer.style.padding = "20px";
        resultsContainer.style.overflow = "hidden";

        movieElement.onclick = function() {
            infoModal(movie);
        }
        resultsContainer.appendChild(movieElement);
        }});
    } 
}
}
// Modal for movie info
function infoModal(movie){
    try {
        const modalTitle = document.querySelector('#infoModal .modal-title');
        const modalBody = document.querySelector('#infoModal .modal-body');
        const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

        modalTitle.textContent = movie.title;
        modalBody.innerHTML = `
        <img src="${imageUrl}" alt="${movie.title}" class="img-fluid">
        <p>Release date: ${movie.release_date}</p>
        <p>${movie.overview}</p>
        <p>Vote average: ${movie.vote_average}</p>
        <p>Vote count: ${movie.vote_count}</p>
        `;

        const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
        infoModal.show();
    } catch (error) {
        console.error(error);
        ifError();  
    }
}
