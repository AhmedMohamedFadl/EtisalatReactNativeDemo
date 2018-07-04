
import React from 'react'
import { StyleSheet, Image, Dimensions } from "react-native";
import {
  Container,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body
} from "native-base";

const deviceWidth = Dimensions.get("window").width;


class ItemDetails extends React.Component {

    static navigationOptions = {
        title: 'Welcome',
      };

    render() {
      return (
        <Container style={styles.container}>
  
          <Content padder>
            <Card style={styles.mb}>
              <CardItem bordered>
                <Left>
                  <Thumbnail source={{uri: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Simple_somen.jpg"}} />
                  <Body>
                    <Text>NativeBase</Text>
                    <Text note>April 15, 2016</Text>
                  </Body>
                </Left>
              </CardItem>
  
              <CardItem>
                <Body>
                  <Image
                    style={{
                      alignSelf: "center",
                      height: 150,
                      resizeMode: "cover",
                      width: deviceWidth / 1.18,
                      marginVertical: 5
                    }}
                    source={{uri:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Simple_somen.jpg"}}
                  />
                  <Text>
                    NativeBase is a free and source framework that enable
                    developers to build high-quality mobile apps using React
                    Native iOS and Android apps with a fusion of ES6. NativeBase
                    builds a layer on top of React Native that provides you with
                    basic set of components for mobile application development.
                    NativeBase is a free and source framework that enable
                    developers to build high-quality mobile apps using React
                    Native iOS and Android apps with a fusion of ES6. NativeBase
                    builds a layer on top of React Native that provides you with
                    basic set of components for mobile application development.
                    NativeBase is a free and source framework that enable
                    developers to build high-quality mobile apps using React
                    Native iOS and Android apps with a fusion of ES6. NativeBase
                    builds a layer on top of React Native that provides you with
                    basic set of components for mobile application development.
                    NativeBase is a free and source framework that enable
                    developers to build high-quality mobile apps using React
                    Native iOS and Android apps with a fusion of ES6. NativeBase
                    builds a layer on top of React Native that provides you with
                    basic set of components for mobile application development.
                    NativeBase is a free and source framework that enable
                    developers to build high-quality mobile apps using React
                    Native iOS and Android apps with a fusion of ES6. NativeBase
                    builds a layer on top of React Native that provides you with
                    basic set of components for mobile application development.
                  </Text>
                </Body>
              </CardItem>
              
            </Card>
          </Content>
        </Container>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF"
    },
   
  });
  
  export default ItemDetails;