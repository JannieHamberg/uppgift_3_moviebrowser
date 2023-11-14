function fetchPopularMovies() {
    const apiKey = '03b494ebe50361cd87fe561b366ff9d4';
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    fetch(popularUrl)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        const carousel = document.querySelector('#popularMoviesCarousel .carousel-inner');

        movies.forEach((movie, index ) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item' + (index === 0 ? ' active ': '');
            const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            const shortText = movie.overview.substring(0, 150) + '...';
            carouselItem.innerHTML = `
            <img src="${imageUrl}" alt="${movie.title}">
            <div class="carousel-caption d-none d-md-block">
              <h5 class="carousel-h5">${movie.title}</h5>
              <p class="carousel-p">${shortText}</p>
            </div>
            `;
            carouselItem.onclick = function() {
                infoModal(movie);
            }
            carousel.appendChild(carouselItem);
            console.log(movie);
        })
    })
    .catch(error => {
        console.error(error);
        displayError();
    });

}

function displayError() {
    const carousel = document.querySelector('#popularMoviesCarousel .carousel-inner');
    if (carousel) {
        carousel.innerHTML = `
    <div class="error-div-carousel">
        <p class="error-msg">Junior coder...</p>
        <img src="images/error-img.png" alt="error image" class="error-img" />
    </div>
`;
    }
}

function infoModal(movie){
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
}

document.addEventListener('DOMContentLoaded', fetchPopularMovies);