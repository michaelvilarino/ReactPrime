import React from "react";
import {Container, Banner, Rate, Title, RateContainer} from './styles';
import {Ionicons} from "@expo/vector-icons"
import {useNavigation} from '@react-navigation/native'

function SearchItem({data}){
    const  navigation = useNavigation();
    
    function navigateToDetails(){   
        
        if(data.release_date === ''){
            alert('Este filme não possui detalhes')
            return
        }  

        navigation.navigate('Detail', {id: data.id})
    }

    return(       
            <Container activeOpacity={0.7} onPress={navigateToDetails}>
                {data?.poster_path ?
                   (
                     <Banner
                        resizeMethod="resize"
                        source={{
                            uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`
                        }}
                     />
                   )
                   :
                   (
                    <Banner
                        resizeMethod="resize"
                        source={ require('../../../assets/images/SemImagem.png')}
                    />
                   )
                }

                <Title>{data?.title}</Title>

                <RateContainer>
                    <Ionicons name="md-star" size={12} color="#E7A74e" />
                    <Rate>{data?.vote_average}/10</Rate>
                </RateContainer>

            </Container>        
    )

}

export default SearchItem;