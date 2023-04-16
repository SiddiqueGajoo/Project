(async function(){
  const response = await fetch ("data.json");
  const movies = await response.json();
  const genre = document.getElementById("genre");
  const year = document.getElementById("year");
  const language = document.getElementById("language");
  const rating = document.getElementById("ratings");
  const btnElem = document.getElementById("searchBtn");
  const listElem = document.getElementById("movies-list");
function displaymovies(results) {
  listElem.innerHTML = "";
  counter = 1;
  results.forEach(function (movie) {
    let date =movie.release_date.split("-");
    let year = date[0];
    const table = document.createElement("table");
    const listItem =  `
    <tr class="bg-white border-b dark:bg-gray-200 text-gray-900 dark:border-gray-700">
    <td class="w-[10%] px-6 py-3">${counter}</td>
    <td class="w-[70%] px-6 py-3"> <div><img src="https://image.tmdb.org/t/p/w45${movie.poster_path}"  /></div>  <div><div class="font-semibold text-xl">${movie.title}</div> \n  ${movie.genres.toString(" , ")}</div></td>
    <td class="w-[20%] px-6 py-3">${year}</td>
    </tr>
    `;
    counter++;
    table.innerHTML = listItem;
    table.addEventListener("click", function () {
      loadRecipeDetails(movie);
    });
    listElem.appendChild(table);
  })
}
// function displaySearchResults (results) {
//   listElem.innerHTML = "";
//   results.forEach(function (recipe) {
//     const li = document.createElement("li");
//     const listItem = `
//         <h2 class="title">${recipe.title}</h2>
//         <div class="description">${recipe.description}</div>
//     `;
//     li.innerHTML = listItem;
//     li.addEventListener("click", function () {
//       loadRecipeDetails(recipe);
//     });
//     listElem.appendChild(li);
//   })
// }

  function search (){
    const query =genre.value;
    const lang = language.value;
    
    const results = movies.filter(function(movie){
     const date =  movie.release_date.split("-");
     const year = date[0];
     const rate = movie.vote_average;
     const rating = Math.round(rate);
    //  const roundRating = Math.round(rate);
    return (movie.genres.includes(query) &&
     movie.release_date.includes(year) &&
      movie.original_language.includes(lang) 
      && movie.vote_average==rating )
    })
    console.log(results);
    displaymovies(results);
  }
  
  btnElem.addEventListener("click", search);
})();
