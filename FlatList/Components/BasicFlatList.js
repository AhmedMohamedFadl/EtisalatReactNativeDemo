import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title
} from "native-base";
// import Icon from 'react-native-vector-icons/Feather';
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { Component } from "react";
import {
  Alert,
  AsyncStorage,
  FlatList,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { searchFoods, getFoods } from "../../Services/AuthServices";
import AddModal from "./AddModal";
import flatListData from "./FlatListData";
import NHCardShowcase from "./NHCardShowcase";

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null,
      name: "",
      showSearch: false,
      keyword: "",
      searchData: []
    };
    getFoods(response => this.setState({searchData: response}))
    this._onAddPress = this._onAddPress.bind(this);
  }

  refreshFlatList = deletedKey => {
    this.setState(prevState => {
      return {
        deletedRowKey: deletedKey
      };
    });
  };

  _onAddPress = () => {
    this.refs.addModal.showAddModal();
  };

  navigationItemDetails = index => {
    console.log("my index:" + index);
    const { navigate } = this.props.navigation;
    navigate("Item", { index: index });
  };

  _logOut = () => {
    console.log("logout");
    AsyncStorage.removeItem("usertoken");
    this.props.screenProps(false, null);
  };

  _logoutAlert = () => {
    Alert.alert(
      "Logout",
      "Do you want to logout ?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: this._logOut }
      ],
      { cancelable: true }
    );
  };

  renderSearch = () => {
    if (this.state.showSearch) {
      return (
        <TextInput
          style={styles.TextInputStyleClass}
          onChangeText={text => {
            this.setState({ keyword: text });
          }}
          autoCapitalize="none"
          onSubmitEditing={() => {
            this.SearchFilterFunction(this.state.keyword);
          }}
          underlineColorAndroid="transparent"
          placeholder="search Here"
        />
      );
    } else {
      return <Title style={{ color: "#000", fontWeight: 'bold' }}>Tuts</Title>;
    }
  };

  SearchFilterFunction(text) {
    console.log("onsubmit");
    if (text.length > 0)
      searchFoods(text, response => {
        this.setState({ searchData: response });
      });
  }

  render() {
    return (
      <Container style={{ paddingTop: 24 }}>
        <Header style={{ backgroundColor: "#ffffff", elevation: 12 }}>
          <Left>
            <Button transparent onPress={this._logoutAlert}>
              <Icon name="undo" size={20} />
            </Button>
          </Left>

          <Body>{this.renderSearch()}</Body>

          <Right>
            <Button
              transparent
              onPress={() => {
                this.setState({ showSearch: !this.state.showSearch });
              }}
            >
              <Icon
                name={this.state.showSearch ? "close" : "search"}
                size={20}
              />
            </Button>
            <Button transparent>
              <Icon transparent name="favorite" size={20} />
            </Button>
            <Button transparent>
              <Icon
                transparent
                name="add"
                size={20}
                onPress={this._onAddPress}
              />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <View style={{ backgroundColor: "white" }}>
            <FlatList
              data={this.state.searchData}
              renderItem={({ item, index }) => {
                //console.log(`Item = ${JSON.stringify(item)} , Index =${index}`)

                return (
                  <NHCardShowcase
                    item={item}
                    root={this}
                    index={index}
                    parentFlatList={this}
                  />
                );
              }}
            />
          </View>
        </Content>

        <AddModal ref={"addModal"} parentFlatList={this} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  flatListItem: {
    color: "white",
    padding: 10,
    fontSize: 16
  },
  TextInputStyleClass: {
    height: 40,
    width: 200,
    paddingStart: 8,
    paddingEnd: 8,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7,
    backgroundColor: "#FFFFFF"
  }
});