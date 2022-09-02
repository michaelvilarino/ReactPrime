import styled from "styled-components";

export const Container = styled.View`
   flex:1;
   background-color: #191a30;
`;

export const Header = styled.View`
   z-index: 99 ;
   position: absolute ;
   top: 35px;
   width: 100% ;
   display: flex ;
   flex-direction: row ;
   justify-content: space-between ;
   padding: 0 14px ;
`;

export const HeaderButton = styled.TouchableOpacity`
   width: 45px ;
   height: 46px ;
   background-color: rgba(25, 26, 48, 0.8) ;
   justify-content: center ;
   align-items: center ;
`;

export const Banner = styled.Image`
   width: 100% ;
   height: 300px ;
   border-bottom-left-radius: 50px;
   border-bottom-right-radius: 50px ;
`;

export const ButtonLink = styled.TouchableOpacity`
   background-color: #E72f49 ;
   width: 63px ;
   height: 64px;
   border-radius: 35px ;
   justify-content: center ;
   align-items: center ;
   position: absolute ;
   top: 270px;
   right: 1px ;
   z-index: 99 ;
`;

export const Title = styled.Text`
   color: white;
   font-size: 22px ;
   font-weight: bold ;
   padding: 4px 14px ;
   margin-top: 20px ;
`;

export const ContainerArea = styled.View`
   display: flex ;
   flex-direction: row ;
   justify-content: space-between ;
   padding: 0 14px ;
   margin-top: 10px ;
`;

export const Rate = styled.Text`
   color: white ;
   font-size: 18px ;
   font-weight: bold ;
`;

export const ListGenres = styled.FlatList`
   padding-left: 14px;
   margin: 15px 0 ;
   max-height: 35px ;
   min-height: 35px ;
`;

export const Description = styled.Text`
   padding-left: 14px ;
   padding-right: 14px ;
   padding-bottom: 30px ;
   color: #FFF ;
   line-height: 22px ;
`;