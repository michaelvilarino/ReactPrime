import React, {useState, useEffect} from "react";

import { 
        Container, 
        Header, 
        HeaderButton, 
        Banner,
        ButtonLink,
        Title,
        ContainerArea,
        Rate, 
        ListGenres,
        Description } from "./styles";
import {Feather, Ionicons} from '@expo/vector-icons';

import {useNavigation, useRoute} from '@react-navigation/native';                                      

import api, {key} from '../../services/api'

import Stars from 'react-native-stars'
import Genre from "../components/Genres";
import { ScrollView, Modal } from "react-native";
import ModalLink from "../components/ModalLink";
import { hasMovie, saveMovie, deleteMovie } from "../../utils/storage";

function Detail(){

    const [movie, setMovie] = useState({})
    const [opsenLink, setOpenLink] = useState(false)

    const navigation = useNavigation()
    const route = useRoute();
    const ac = new AbortController();
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        let isActive = true;            

         if(isActive)
            getMovieDetail();

         return () => {
             isActive = false;
             ac.abort();
         }

    }, [])

    async function getMovieDetail()
    {
       api.get(`/movie/${route.params?.id}`, {
           params:{
               api_key: key,
               language: 'pt-BR'
           }
       }).then(response => {          
          setMovie(response.data)    
          
          hasMovie(response.data).then(exists => {            
            if(exists)
               setIsFavorite(true)
            else
               setIsFavorite(false)               
          })
                            
       })
                          
    }

    async function FavoriteMovie(movie)
    {
         if(isFavorite){
           await deleteMovie(movie.id)
           setIsFavorite(false)
         }
         else{
           await saveMovie(movie)
           setIsFavorite(true)
         }         
    }

    return(
        <Container>
           <Header>
              <HeaderButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Feather
                  name="arrow-left"
                  size={28}
                  color="#FFF"
                />
              </HeaderButton>
                 
              <HeaderButton onPress={() => FavoriteMovie(movie)}>
                <Ionicons
                  name= {isFavorite ? "bookmark" : "bookmark-outline" }
                  size={28}
                  color="#FFF"
                />
              </HeaderButton>
            </Header>

            <Banner
              resizeMethod="resize"
              source={{
                uri:`https://image.tmdb.org/t/p/original/${movie.poster_path}`
              }}
            />

           {
             movie.homepage !== "" 
             ? <ButtonLink activeOpacity={0.8} onPress={() => setOpenLink(true)}>
             <Feather
               name="link"
               size={24}
               color="#FFF"
             />
             </ButtonLink>
             : null
           }
            

            <Title numberOfLines={2}>{movie.title}</Title>

            <ContainerArea>
                <Stars
                  default={movie.vote_average}
                  count={10}
                  half={true}
                  starSize={24}
                  fullStar={<Ionicons name="md-star" size={24} color="#E4A74e"/>}
                  emptyStar={<Ionicons name="md-star-outline" size={24} color="#E4A74e"/>}
                  halfStar={<Ionicons name="md-star-half" size={24} color="#E4A74e"/>}
                  disable={true}
                />
                <Rate>{movie.vote_average}/10</Rate>
            </ContainerArea>

            <ListGenres
                 data={movie?.genres}
                 horizontal={true}
                 showsHorizontalScrollIndicator={false}
                 keyExtractor={(item) => String(item.id)}
                 renderItem={({item}) => <Genre data={item}/>}
            />
            
            <Title>Descrição</Title>
            <ScrollView showsVerticalScrollIndicator={false}>
               
               <Description>
                     {movie.overview}
               </Description>
            </ScrollView>

            <Modal 
                visible={opsenLink} 
                transparent={true} 
                animationType="slide"
            >
              <ModalLink 
                   link={movie?.homepage} 
                   title={movie?.title} 
                   closeModal={() => setOpenLink(false)} 
                   key={movie.id}
               />

            </Modal>

        </Container>
    )
}

export default Detail;