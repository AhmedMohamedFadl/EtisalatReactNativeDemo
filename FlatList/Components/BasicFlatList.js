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
  Text,
  Image
} from "react-native";
import { searchFoods, getFoods } from "../../Services/AuthServices";
import AddModal from "./AddModal";

import { UIActivityIndicator } from "react-native-indicators";

import NHCardShowcase from "./NHCardShowcase";

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      name: "",
      showSearch: false,
      keyword: "",
      searchData: [],
      isLoadingData: true
    };

    getFoods(response => {
      console.log("foods length" + response.length);
      this.setState({
        isLoadingData: false,
        searchData: response
      });
    });

    this._onAddPress = this._onAddPress.bind(this);
  }

  refreshFlatList = key => {
    console.log("newkey: " + JSON.stringify(key));

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
    let view = this.state.isLoadingData ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <UIActivityIndicator color="gray" />
        <Text style={{ marginTop: 8 }} children="Please wait..." />
      </View>
    ) : (
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
    );
    if (this.state.isLoadingData || this.state.searchData.length > 0) {
      return view;
    } else if(!this.state.isLoadingData && this.state.searchData.length == 0){
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
              {/* <Image
                source={require("../../images/logout-sign.png")}
                style={{ width: 20, height: 20 }}
              /> */}
              <Image source={require('../../images/logout-sign.png')} style={{width: 20, height: 20}} />;
              {/* <Icon name="undo" size={20} /> */}
            </Button>
          </Left>

          <Body>{this.renderSearch()}</Body>

          <Right>
            <Button
              transparent
              onPress={() => {
                if (this.state.showSearch) {
                  this.setState({ isLoadingData: true });
                  getFoods(response => {
                    this.setState({ isLoadingData: false });
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
