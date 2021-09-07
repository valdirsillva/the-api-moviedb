



window.addEventListener('DOMContentLoaded', function () {  
    
    let url = new URLSearchParams(window.location.search);
    let sufix = url.get('page');
    
    // Converto p/ caixa miniscula
    sufix = sufix.toLocaleLowerCase();

    switch(sufix) {
        case 'popular':
            getMoviePopular();
          break;
        case 'nowplaying':
            getMovieNowPlaing();
          break;  

    }




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


async  function getApiKey() {

    const json = await fetch('auth.json');
    const { apy_key } = await json.json();

    return  apy_key;
}



async function getMoviePopular() {

    const key = await getApiKey();
    const dataMoviesPopular = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}`);

    const allMoviesPopulation = await dataMoviesPopular.json();
    allMoviesPopulation.results.map(movie => {
        render(movie);
    })
}

async function getMovieNowPlaing() {
    const key = await getApiKey();

    const dataMoviesNowPlaying = await  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`);
    const allMoviesNowPlaying = await dataMoviesNowPlaying.json();
    allMoviesNowPlaying.results.map(movie => {
         render(movie);
    });
}



