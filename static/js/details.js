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
           id: movie.id, 
           title: movie.title, 
           overview: movie.overview,
           image: movie.poster_path,
           release: movie.release_date,
           votes: movie.votes_count,
           vote_average: movie.vote_average,
           popularity: movie.popularity
        };

    })

    // console.log(detailsMovie);

    renderDetailsFromMovie(detailsMovie);
}


function renderDetailsFromMovie(detailsMovie) {
    let details = `<div class="overview">
    <img src="https://image.tmdb.org/t/p/w400${detailsMovie.image}" alt="">
    
     <div class="overview-title">
        <h3>${detailsMovie.title}</h3>
        <span>${detailsMovie.overview}</span>
        <br>
        <button type="button" class="btn-view-trailler open">Trailler</button>
     </div>

     <div class="movie-trailer" id="trailer">
       
     </div>
   `;
   



   document.getElementById('details').innerHTML += details;

   
   if (true) {
    renderTrailerFromMovieId(detailsMovie);
    return;

  }

}

async function renderTrailerFromMovieId(details) {
  
    const api_key = await getApiKey();
    const getTrailerFromMovie = await fetch(`https://api.themoviedb.org/3/movie/${details.id}/videos?api_key=${api_key}`);
    const res = await getTrailerFromMovie.json();

    const currenTrailer = res.results.map(trailer => {
     return `
        <div class="close-trailer"
            <img src="static/image/close.png" alt="" class="close">
        </div>
        <iframe width="720" height="415" src=https://www.youtube.com/embed/${trailer.key}
           title="YouTube video player" 
           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
         </iframe>`;
    });

    console.log(currenTrailer);

    document.getElementById('trailer').innerHTML = currenTrailer;
}



// https://api.themoviedb.org/3/movie/619297/videos?api_key=2f354278de8f017620d19e5f7c0d0253&language=en-US


