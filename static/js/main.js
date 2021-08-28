window.addEventListener('load', function () {
    Api();
});

function render(data) {
    let output = `
    <div class="content-image">
      <img src=https://image.tmdb.org/t/p/w500${data.poster_path} alt=" ">
       <span>${data.vote_average}%</span>
    <div class="content-title"> ${data.title} </div>
      <button type="button">
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

async function Api() {
    const key = await getApiKey();
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}`);

    const allMoviesPopulation = await data.json();
    allMoviesPopulation.results.map(movie => {
        // console.log(movie.poster_path);
        render(movie);
    })
}
