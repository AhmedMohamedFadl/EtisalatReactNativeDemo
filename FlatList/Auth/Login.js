import React from 'react'
import { StyleSheet, StatusBar, TextInput, Image , AsyncStorage } from 'react-native'
import { View, Text, Button } from 'native-base';
const logo = require("../../images/as-logo.png");;
import { login } from '../../Services/AuthServices';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator
} from 'react-native-indicators';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            email: '',
            password: '',
            data: null
        }
    }

    setUserToken = async (value) => {
        await AsyncStorage.setItem('usertoken', value);
    }


    _onPressLogin = () => {
        var email = this.state.email
        var password = this.state.password

        if (email.length == 0 || password == 0) {
            alert("All fields are required , please try again!")
        }
        else {
            this.setState({
                isLoading: true
            })
            login(email, password, (response) => {

                if (response.code == 1) {
                    this.setState({
                        isLoading: false
                    })
                    this.setUserToken(response.token)
                    console.log(response.token)
                    this.props.screenProps(true, response.token)
                } else {
                    this.setState({
                        isLoading: false
                    })
                    alert(response.message)
                }
            })
        }

    }

    showLoadingIndicator = () => {
        if (this.state.isLoading) {
            return <UIActivityIndicator color='gray' />;
        }
    }

    render() {
        return (

            <View style={styles.container} justifyContent="flex-start" alignItems="center">
                <StatusBar backgroundColor="#81b9bf"
                    barStyle="dark-content"
                />
                <Image source={logo} style={styles.logo} />
                <TextInput
                    style={styles.emailInput}
                    placeholder="Email"
                    autoCapitalize='none'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    secureTextEntry
                    style={styles.passwordInput}
                    autoCapitalize='none'
                    placeholder="Password"
                    onChangeText={(text) => this.setState({ password: text })}
                />

                <View justifyContent='center' alignItems='center'></View>

                <Button
                    light style={styles.signUp}
                    alignItems="center"
                    onPress={this._onPressLogin}
                >
                    <Text >Login</Text>
                </Button>

                <Text style={{ marginTop: 10, color: "#babdbe" }} >Don't have an account ? Sign In</Text>

                {this.showLoadingIndicator()}

            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    logo: {
        marginTop: 100,
        height: 200,
        width: 200,
        marginBottom: 10
    },
    textColor: {
        marginTop: 0,
        color: "#000a12",
        fontWeight: "400",
    },


    emailInput: {
        marginTop: 30,
        width: 300,
        paddingLeft: 5,
        paddingBottom: 5,
        borderBottomColor: "#000a12",
        borderBottomWidth: 1,
    },

    passwordInput: {
        width: 300,
        marginTop: 30,
        paddingLeft: 5,
        paddingBottom: 5,
        borderBottomColor: "#000a12",
        borderBottomWidth: 1,
    },

    signUp: {
        //marginTop:,
        borderRadius: 20,
        alignSelf: 'center',
        width: 200,
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: "#eceff1"
    }
})