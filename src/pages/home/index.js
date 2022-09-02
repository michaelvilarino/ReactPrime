import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import {ScrollView, Text, ActivityIndicator} from 'react-native'
import { 
    Banner, 
    BannerButton, 
    Container,
    SearchContainer,
    Input,
    SearchButton,
    Title,
    SliderMovie
} from './styles'
import {Feather} from '@expo/vector-icons'
import SliderItem from '../components/SliderItem'

import api, {key} from '../../services/api'
import { getListMovies, randomBanner } from '../../utils/movies'

import {useNavigation} from '@react-navigation/native'

export default function Home () {

    const [nowMovies, setNowMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [topMovies, setTopMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [bannerMovie, setBannerMovie] = useState({})
    const [input, setInput] = useState('')

    const navigation = useNavigation()

    useEffect(() => {  
      
      let isActive = true;
      const ac = new AbortController();

      if(isActive)
        getMovies()

      return () => {
        isActive = false;
        ac.abort();
      }              
      
    }, [])

    async function getMovies()
    {
         api.get('/movie/now_playing',{
          params:{
            api_key: key,
            language: 'pt-BR',
            page:1
          }
        }).then(response => {
           let data = getListMovies(response.data.results, 10)
           setNowMovies(data)
           
           let numberRandom = randomBanner(data)
           setBannerMovie(data[numberRandom])
        })

        api.get('/movie/popular',{
          params:{
            api_key: key,
            language: 'pt-BR',
            page:1
          }
        })
        .then(response => {
           let data = getListMovies(response.data.results, 10)
           setPopularMovies(data)
         })

         api.get('/movie/top_rated',{
          params:{
            api_key: key,
            language: 'pt-BR',
            page:1
          }
        }).then(response => {
           let data = getListMovies(response.data.results, 5)
           setTopMovies(data)
        })

        setLoading(false)
    }

    function navigateToDetails(movie)
    {      
      navigation.navigate('Detail', {id: movie.id})
    }

    function searchMovie()
    {
      if(input === '')
      {
        alert('Informe um filme para a sua busca')
        return
      }
      
      navigation.navigate('Search', {movieSearch: input})
      setInput(input)
    }

    if(loading)
    {
      return(
        <Container>
            <ActivityIndicator size="large" color="white"/>
        </Container>
      )
    }

    return(
        <Container>
            <Header title="React Prime"/>

            <SearchContainer>
                 <Input
                   placeholder="ex titanic"
                   placeholderTextColor="#ddd"
                   value={input}
                   onChangeText={(text) => setInput(text) }
                 />
                 <SearchButton onPress={searchMovie}>
                     <Feather name="search" size={30} color="#FFF"/>
                 </SearchButton>
            </SearchContainer>

            <ScrollView>
                <Title>Em Cartaz</Title>
             <BannerButton activeOpacity={0.8} onPress={() => navigateToDetails(bannerMovie)}>
                <Banner
                  resizeMethod="resize"
                  source={{uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`}}
                />
            </BannerButton> 

            <SliderMovie
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={nowMovies}
              renderItem={({item}) => 
                        <SliderItem 
                         data={item} 
                         navigatePage={navigateToDetails}
                         /> }  
              keyExtractor={(item) => String(item.id)}               
            />
 
            <Title>Populares</Title>
            <SliderMovie
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={popularMovies}
              renderItem={({item}) => 
                            <SliderItem 
                              data={item} 
                              navigatePage={navigateToDetails}
                            /> }   
              keyExtractor={(item) => String(item.id)}              
            />
            
            <Title>Mais votados</Title>
            <SliderMovie
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={topMovies}
              renderItem={({item}) => 
                           <SliderItem 
                             data={item}
                             navigatePage={navigateToDetails}
                            /> }    
              keyExtractor={(item) => String(item.id)}          
            />
            </ScrollView>           

        </Container>
    )
}