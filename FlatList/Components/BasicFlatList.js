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
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { Component } from "react";
import {
  Alert,
  AsyncStorage,
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text
} from "react-native";
import { searchFoods, getFoods } from "../../Services/AuthServices";
import AddModal from "./AddModal";
import flatListData from "./FlatListData";
import NHCardShowcase from "./NHCardShowcase";

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      name: "",
      showSearch: false,
      keyword: "",
      searchData: []
    };
    getFoods(response => {
      console.log("foods length" + response.length);
      this.setState({ searchData: response });
    });
    this._onAddPress = this._onAddPress.bind(this);
  }

  refreshFlatList = key => {
    // getFoods(response => this.setState({searchData: response}));
    console.log("newkey: " + JSON.stringify(key));
    // var list = this.state.searchData
    // list.push(key)
    this.setState(prevState => ({
      searchData: [...prevState.searchData, key]
    }));
    console.log("search length  " + this.state.searchData.length);
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
      return <Title style={{ color: "#000", fontWeight: "bold" }}>Tuts</Title>;
    }
  };

  renderList = () => {
    if (this.state.searchData.length > 0) {
      return (
        <Content padder>
          <View
            style={{
              backgroundColor: "white"
            }}
          >
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
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 20
            }}
          >
            No result
          </Text>
        </View>
      );
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
                if (this.state.showSearch) {
                  getFoods(response => {
                    this.setState({ searchData: response });
                  });
                }
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

        {this.renderList()}

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
