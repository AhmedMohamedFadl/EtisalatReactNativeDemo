import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import ImageLoad from 'react-native-image-placeholder';

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
        return (
            <TouchableOpacity onPress={() => { this._onCellPressed(this.props.index) }}>
                <Card style={styles.mb}>
                    <CardItem bordered style={{ backgroundColor: "#fff" }}>
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
                            <ImageLoad
                                style={{
                                    alignSelf: "center",
                                    height: 150,
                                    resizeMode: "cover",
                                    width: deviceWidth / 1.18,
                                    marginVertical: 5
                                }}
                                loadingStyle={{ size: 'large', color: 'gray' }}
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
        );
    }
}

const styles = StyleSheet.create({

    mb: {
        marginBottom: 0,
        backgroundColor: "white"

    }
});