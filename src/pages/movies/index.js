import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import { getMoviesSave, deleteMovie } from '../../utils/storage'
import FavoriteItem from '../components/FavoriteItem'
import {Container, ListMovies} from './styles'
import { useNavigation, useIsFocused } from '@react-navigation/native'

export default function Movies () {

    const[movies, setMovies] = useState([])
    const navigator = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
      let isActive = true;

      if(isActive)
         getMoviesFavorited();

      return () => {
        isActive = false;
      }

    }, [isFocused])

    async function getMoviesFavorited()
    {
        const listMovies = await getMoviesSave();        
        setMovies(listMovies);
    }

    async function deleteFavoriteMovie(MovieId)
    {
        const result = await deleteMovie(MovieId)
        setMovies(result)
    }

    function detailMovie(item)
    {      
      navigator.navigate('Detail', {id: item.id});
    }

    return(
        <Container>
            <Header title="Meus filmes"/>

            <ListMovies
             showsVerticalScrollIndicator={false}
             data={movies}
             keyExtractor={ item => String(item.id)}
             renderItem={({item}) => 
                <FavoriteItem data={item} 
                               deleteFavoriteMovie={deleteFavoriteMovie}
                               detailMovie={() => detailMovie(item)}
                 /> }
            />
        </Container>
    )
}