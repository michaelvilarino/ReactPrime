import React from "react";

import {Container, 
        Rate, 
        RateContainer, 
        Title, 
        ActionContainer,
        DetailButton,
        DeleteButton
    } from './styles';

import {Ionicons, Feather} from "@expo/vector-icons"

function FavoriteItem({data, deleteFavoriteMovie, detailMovie}){
   return(
         <Container>
             <Title size={22}>{data?.title}</Title>

             <RateContainer>
                 <Ionicons name="md-star" size={12} color="#E7A74e"/>
                 <Rate>{data?.vote_average}/10</Rate>
             </RateContainer>

             <ActionContainer>
                   <DetailButton onPress={detailMovie}>
                       <Title size={12}>Ver detalhes do filme</Title>
                   </DetailButton>

                   <DeleteButton onPress={() => deleteFavoriteMovie(data.id)}>
                        <Feather name="trash" size={24} color="#FFF"/>
                   </DeleteButton>
             </ActionContainer>
         </Container>
    )
}

export default FavoriteItem;