window.addEventListener("DOMContentLoaded", function() {
   getDetailsFindMovie();

   setTimeout(function() {
        const container = document.getElementById('trailer');

        const clickButtonOpen  = document.querySelector('.open-trailer');
        const clickButtonClose = document.querySelector('.close');

        clickButtonOpen.addEventListener('click', showModalTrailer);
        clickButtonClose.addEventListener('click', hideModalTrailer);

        function showModalTrailer() {
            // implementacao p/ abrir modal            
            container.classList.add('active');
        }
    
        function hideModalTrailer() {
            // implementacao p/ fechar modal
            container.classList.remove('active'); 
        }
    
    }, 1000);

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

    const getDetailsFindMovie = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=pt-BR`);
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

    });
    renderDetailsFromMovie(detailsMovie);
}


function renderDetailsFromMovie(detailsMovie) {
    renderTrailerFromMovieId(detailsMovie);

    let details = `<div class="overview">
    <img src="https://image.tmdb.org/t/p/w400${detailsMovie.image}" alt="">
    
     <div class="overview-title">
        <h3>${detailsMovie.title} </h3>
        <small>${formatDate(detailsMovie.release)}</small>
         <div class="movie-details"> 
            <span>Avalia????o do filme: ${detailsMovie.vote_average} </span>
            <span>Votos: ${detailsMovie.votes ?? ''} </span>
            <span>Popularidade: ${detailsMovie.popularity ?? ''} </span>
         </div>
        
      
        <p>Sinopse</p>
        <span>${detailsMovie.overview}</span>
        <br>
        <button type="button" class="btn-view-trailler open-trailer">Trailler</button>
     </div>
     <div class="movie-trailer" id="trailer">


     </div>`;
   document.getElementById('details').innerHTML += details;

  
}

function formatDate(data) {
    let getDate = data.split('-');
    
    return `${getDate[2]}-${getDate[1]}-${getDate[0]}`;
}

async function renderTrailerFromMovieId(details) {
  
    const api_key = await getApiKey();
    const getTrailerFromMovie = await fetch(`https://api.themoviedb.org/3/movie/${details.id}/videos?api_key=${api_key}&language=pt-BR`);
    const res = await getTrailerFromMovie.json();
    
    // pego apenas o trailer na posi????o 0
    let trailer = res.results[0].key;

    let currenTrailer =`
          <div class="close-trailer">
             <img src="static/image/close.png" alt="" class="close">
          </div>
    
        <iframe width="720" height="530" src=https://www.youtube.com/embed/${trailer}
           title="YouTube video player" 
           frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>`;
 
    document.getElementById('trailer').innerHTML = currenTrailer;
}
