import React, { Component } from 'react';
import {
  View, Platform, Text, Dimensions, TextInput
} from 'react-native';

import Modal from 'react-native-modalbox'
import Button from 'react-native-button'
import { postData } from '../../Networking/Network';

var screen = Dimensions.get('window');

export default class AddModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newFoodName: "",
      newFoodDiscription: ""
    }
  }

  showAddModal = () => {
    this.refs.myModal.open()
  }

  generateKey = (numberOfCharacters) => {
    return require('random-string')({ length: numberOfCharacters });
  }

  onSavePressed = () => {
    if (this.state.newFoodName.length == 0 || this.state.newFoodDiscription.length == 0) {
      alert("All fields are required , please try again !")
    } 
    const newFood = {
      "key": this.generateKey(this.state.newFoodName.length),
      "name": this.state.newFoodName,
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Oysters_served_on_ice%2C_with_lemon_and_parsley.jpg",
      "foodDescription": this.state.newFoodDiscription
    }

    // flatListData.push(newFood);
    // console.log(JSON.stringify(flatListData))
    postData("http://seqaya.getsandbox.com/food", newFood, (data, code) => {

      this.props.parentFlatList.refreshFlatList(newFood);
    })
    this.refs.myModal.close();
  }
  render() {
    return (
      <Modal
        ref={"myModal"}
        style={{
          justifyContent: 'center',
          borderRadius: Platform.OS === 'ios' ? 20 : 0,
          shadowRadius: 10,
          width: screen.width - 80,
          height: 280

        }}
        position='center'
        backdrop={true}
        onClosed={() => {

        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "bold", textAlign: 'center', marginTop: 5 }}>
          New food's Information
              </Text>

        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            marginLeft: 30, marginRight: 30, marginTop: 20, marginBottom: 10,
            borderBottomWidth: 1,

          }}

          placeholder="Add New Food!"
          value={this.state.newFoodName}
          onChangeText={(text) => this.setState({ newFoodName: text })}
        />

        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            marginLeft: 30, marginRight: 30, marginBottom: 20,
            borderBottomWidth: 1,

          }}

          placeholder="Enter New food's Description"
          value={this.state.newFoodDiscription}
          onChangeText={(text) => this.setState({ newFoodDiscription: text })}
        />


        <Button
          style={{ fontSize: 18, color: 'white' }}
          containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: '#54a88d'
          }}

          onPress={this.onSavePressed}
        >
          Save
        </Button>

      </Modal>
    )
  }
}