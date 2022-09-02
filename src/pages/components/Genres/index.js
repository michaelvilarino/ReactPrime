import React from "react";
import { Container, Name } from "../../components/Genres/styles";

function Genre({data})
{
    return(
       <Container>
           <Name>{data.name}</Name>
       </Container>
    )
}

export default Genre;