import AsyncStorage from "@react-native-async-storage/async-storage";

const key = '@primereact'

export async function getMoviesSave(){
    const movies = await AsyncStorage.getItem(key)
    let moviesSave = JSON.parse(movies) || [];

    return moviesSave;
}

export async function saveMovie(newMovie){
    const moviesStored = await getMoviesSave(key);
    const hasMovie = moviesStored.some(item => item.id == newMovie.id)
    
    moviesStored.push(newMovie)

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored))    
}

export async function deleteMovie(id){
    const moviesStored = await getMoviesSave(key);

    let otherMovies = moviesStored.filter(f => f.id !== id)

    await AsyncStorage.setItem(key, JSON.stringify(otherMovies))

    return otherMovies;
}

export async function hasMovie(movie){
    const moviesStored = await getMoviesSave(key);

    const hasMovie = moviesStored.some(item => item.id == movie.id)

    return hasMovie
}