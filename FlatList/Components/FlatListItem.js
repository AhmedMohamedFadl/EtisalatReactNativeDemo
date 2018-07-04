import React, {Component} from 'react'
import { Text, View , TouchableOpacity , Image, Alert , StyleSheet} from 'react-native'
import flatListData from "./flatListData";
import Swipeout from 'react-native-swipeout'

import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body
} from "native-base";

export default class FlatListItem extends Component {

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
                    this.setState({activeRowKey: null});
                }
            },

            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key});
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {
                                    text: 'Yes', onPress: () => {
                                        flatListData.splice(this.props.index, 1);
                                        //Refresh FlatList !
                                        this.props.parentFlatList.refreshFlatList(deletingRow);
                                    }
                                },
                            ],
                            {cancelable: true}
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
            <TouchableOpacity onPress= {() => {this._onCellPressed(this.props.index)}}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: "#fff"}}>
                    <View style={{
                        flex: 1,
                        // marginTop: 2.5,
                        // marginBottom: 2.5,
                        // marginLeft: 5,
                        // marginRight: 5,
                        margin: 5,
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "#54a88d",
                        backgroundColor: "#54a88d"
                    }}>

                        <Image source={{uri: this.props.item.imageUrl}}
                               style={{width: 100, height: 100, margin: 10}}
                        />

                        <View style={{flex: 1, flexDirection: "column"}}>
                            <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                            <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
                        </View>
                    </View>

                </View>
                </TouchableOpacity>
            </Swipeout>


        )
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});