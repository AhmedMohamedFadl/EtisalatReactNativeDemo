import React from "react";
import TabNavigation from "./FlatList/Navigation/TabNavigation";
import FlatNavigator from "./FlatList/Navigation/FlatNavigation";
import { AsyncStorage } from "react-native";
import { storeItem, retrieveItem } from "./Database/Storage";
console.disableYellowBox = true;

export default class App extends React.Component {
  constructor() {
    super();
    AsyncStorage.getItem('usertoken').then((value)=>{
      this.setState({
       token: value
      })
    })
    this.state = {
      successLogin: false,
      token: null
    };
  }

  renderUI = () => {
    console.log("renderUi token" + this.state.token);
    if (this.state.token !== null) {
      console.log("tamam" + this.state.token);
      return (
        <FlatNavigator
          screenProps={(value, token) => {
            this.setState({ successLogin: value, token: token });
          }}
        />
      );
    } else {
      return (
        <TabNavigation
          screenProps={(value, token) => {
            this.setState({ successLogin: value, token: token });
          }}
        />
      );
    }
  };

  render() {
    return this.renderUI();
  }
}
