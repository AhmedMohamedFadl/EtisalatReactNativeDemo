import React, { Component } from 'react'
import { TouchableOpacity, Image, Alert, StyleSheet,Dimensions } from 'react-native'
import flatListData from "./FlatListData";
import Swipeout from 'react-native-swipeout'

import {
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Thumbnail,
    Left,
    Body,
} from "native-base";

const deviceWidth = Dimensions.get("window").width;

export default class NHCardShowcase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null
        };
    }

    _onCellPressed = (index) => {
        this.props.root.navigationItemDetails(index)
    };

    render() {

        const swipeSettings = {
            autoClose: true,

            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },

            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key });
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        flatListData.splice(this.props.index, 1);
                                        //Refresh FlatList !
                                        this.props.parentFlatList.refreshFlatList(deletingRow);
                                    }
                                },
                            ],
                            { cancelable: true }
                        );
                    },
                    text: "Delete",
                    type: "delete"
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };

        return (
            <Swipeout {...swipeSettings}>
                <TouchableOpacity onPress={() => { this._onCellPressed(this.props.index) }}>
                    <Card style={styles.mb}>
                        <CardItem bordered style={{backgroundColor:"#fff"}}>
                            <Left>
                                <Thumbnail source={{ uri: this.props.item.imageUrl }} />
                                <Body>
                                    <Text>{this.props.item.name}</Text>
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
                                    source={{ uri: this.props.item.imageUrl }}
                                />
                                <Text>
                                    {this.props.item.foodDescription}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingVertical: 0 }}>
                            <Left>
                                <Button transparent>
                                    <Icon name="logo-github" />
                                    <Text>4,923 stars</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                    
                </TouchableOpacity>
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    
    mb: {
        marginBottom: 0,
        backgroundColor:"white"
        
    }
});