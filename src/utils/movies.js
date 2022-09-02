export function getListMovies(movies, maximumsize) 
{
   let newMoviesList = [];

   for(i = 0; i < maximumsize; i++)
   {
     newMoviesList.push(movies[i])
   }

   return newMoviesList;
}

export function randomBanner(movies)
{
   return Math.floor(Math.random() * movies.length)
}