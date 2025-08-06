const API_KEY = 'e8afed78'; // my api key for movies
const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const movieResult = document.getElementById('movieResult');

searchBtn.addEventListener('click', fetchMovie);

function fetchMovie() {
    const query = movieInput.value.trim(); //user input and trimming extra spaces
    if (!query) {
        displayError("Please enter a movie title.");
        return;
    }
    movieResult.textContent = "Loading...";
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "False") {
                displayError(data.Error);
            } else {
                displayMovie(data);
            }
        })
        .catch(() => {
            displayError("There was an error fetching movie data.");
        });
}
function displayError(message) {
    movieResult.textContent = "";
    const errorMsg = document.createElement('p');
    errorMsg.textContent = message;
    errorMsg.style.color = "red";
    movieResult.appendChild(errorMsg);
}

function displayMovie(data) {

    movieResult.textContent = ""; // clearing the previous

    // for Title and Year
    const title = document.createElement('h2');
    title.textContent = `${data.Title} (${data.Year})`;
    movieResult.appendChild(title);

    // for Poster
    if (data.Poster && data.Poster !== "N/A") {
        const poster = document.createElement('img');
        poster.src = data.Poster;
        poster.alt = data.Title;
        poster.width = 220;
        movieResult.appendChild(poster);
    }

    // for Director name
    const director = document.createElement('p');
    director.textContent = `Director: ${data.Director}`;
    movieResult.appendChild(director);

    // for Actors name
    const actors = document.createElement('p');
    actors.textContent = `Actors: ${data.Actors}`;
    movieResult.appendChild(actors);

    //  for IMDB Rating pic
    const rating = document.createElement('p');
    rating.textContent = `IMDB Rating: ${data.imdbRating}`;
    movieResult.appendChild(rating);

    // Genre
    const genre = document.createElement('p');
    genre.textContent = `Genre: ${data.Genre}`;
    movieResult.appendChild(genre);

    // Plot summary
    const plot = document.createElement('p');
    plot.textContent = `Plot: ${data.Plot}`;
    movieResult.appendChild(plot);

    fetchWikipediaSummary(data.Title)
}

//fetching wikipedia summary for the title choosen by the user

function fetchWikipediaSummary(title) {
    const wikiApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    fetch(wikiApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.extract) {
                // adding Wikipedia Heading
                const wikiHeading = document.createElement('h3');
                wikiHeading.textContent = "Wikipedia Summary";
                movieResult.appendChild(wikiHeading);

                // adding Wikipedia Summary text 
                const wikiSummary = document.createElement('p');
                wikiSummary.textContent = data.extract;
                movieResult.appendChild(wikiSummary);

                // Add a link to the full Wikipedia article
                const wikiLink = document.createElement('a');
                wikiLink.href = data.content_urls.desktop.page;
                wikiLink.target = "_blank";
                wikiLink.textContent = "Read more on Wikipedia";
                wikiLink.style.display = "block";
                wikiLink.style.marginBottom = "16px";
                movieResult.appendChild(wikiLink);
            }
        })
}