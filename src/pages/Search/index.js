import React, { useState, useEffect } from "react";
import {Container, ListMovies} from './styles';
import {useRoute, useNavigation} from '@react-navigation/native';   
import api, {key} from '../../services/api';
import SearchItem from "../components/SearchItem";

function Search(){
    const navigator = useNavigation();
    const route = useRoute();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
             
    useEffect(() => {
                     
        getMovieSearch();

        return () => {
           isActive = false;
        }

    }, [])

    async function getMovieSearch(){
          const response = await api.get('/search/movie/', {
                params: {
                    query: route.params?.movieSearch,
                    api_key: key,
                    language: 'pt-BR',
                    page: 1
                }
            })
            
             setMovies(response.data.results)
             console.log(response.data.results)
             setLoading(false)        
        }

    if(loading)
    {
        return(
            <Container></Container>
        )
    }

    return(
        <Container>
          <ListMovies
            data={movies}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id) }
            renderItem={({item}) => <SearchItem data={item}/>}
          />
        </Container>
    )
}

export default Search;