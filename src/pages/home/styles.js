import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background-color: #141A29;
    flex: 1;
    padding: 4px 0 ;
    
`;

export const SearchContainer = styled.View`
  flex-direction: row ;
  width: 100% ;
  height: 50px ;
  align-items: center ;
  padding:0 14px ;
  margin-bottom: 8px ;
`;

export const Input = styled.TextInput`
  background-color: rgba(255,255,255, 0.4) ;
  width: 85% ;
  height: 50px ;
  border-radius: 50px ;
  padding: 8px 15px ;
  font-size: 20px ;
  color: #fff;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 15% ;
  height: 50px ;
  align-items: center ;
  justify-content: center ;
`;

export const Title = styled.Text`
  color: white ;
  margin-left: 14px ;
  padding-top: 20px ;
  padding-bottom: 8px ;
  font-size: 24 ;
  font-weight: bold ;
`;

export const BannerButton = styled.TouchableOpacity`
  
`;

export const Banner = styled.Image`
   height: 150px ;
   margin: 0 14px;
   border-radius: 5 ;
`;

export const SliderMovie = styled.FlatList`
   height: 240px ;
   padding: 0 14px;

`;