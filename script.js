const API_KEY = 'e8afed78'; // my api key for movies
const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const movieResult = document.getElementById('movieResult');

searchBtn.addEventListener('click', fetchMovie);
