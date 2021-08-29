window.addEventListener("load", function() {
   getDetailsFindMovie();

});

function render(data) {
    let output = `
    <div class="content-image">
      <img src=https://image.tmdb.org/t/p/w500${data.poster_path} alt=" ">
       <span>${data.vote_average}%</span>
    <div class="content-title"> ${data.title} </div>
      <button type="button" id="add_${data.id}">
        <a href='details.html?id=${data.id}'>Detalhes</a>
      </button>
   </div>`;
    document.getElementById('datalist').innerHTML += output;
}


async function getApiKey() {

    const json = await fetch('auth.json');
    const { apy_key } = await json.json();

    return apy_key;
}


async function getDetailsFindMovie() { 
    const params = new URLSearchParams(window.location.search);
    const findId = params.get('id');
    const apikey = await getApiKey();

    const getDetailsFindMovie = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`);
    const response = await getDetailsFindMovie.json();

    let detailsMovie = {};

    response.results.filter(movie => {
        return movie.id === parseInt(findId);
    }).forEach(movie => {

        return detailsMovie = {
           title: movie.title, 
           overview: movie.overview,
           image: movie.poster_path,
           release: movie.release_date,
           votes: movie.votes_count,
           vote_average: movie.vote_average,
           popularity: movie.popularity
        };

    })

    console.log(detailsMovie);

    renderDetailsFromMovie(detailsMovie);
}


function renderDetailsFromMovie(detailsMovie) {
    let details = `<div class="overview">
    <img src="https://image.tmdb.org/t/p/w400${detailsMovie.image}" alt="">
    
     <div class="overview-title">
        <h3>${detailsMovie.title}</h3>
        <span>${detailsMovie.overview}</span>
     </div>
   </div>`;

   document.getElementById('details').innerHTML += details;

}


