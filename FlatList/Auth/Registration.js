import React from 'react'
import { StyleSheet, StatusBar, TextInput, Image, Alert } from 'react-native'
import { View, Text, Thumbnail, Button } from 'native-base';
import { postData } from '../../Networking/Network';
import { base_url, signUpUrl } from '../../Networking/Config/Config';

const logo = require("../../images/as-logo.png");
export default class RegistrationScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }


    onSignUpPressed = () => {
        var firstname = this.state.firstname
        var lastname = this.state.lastname
        var email = this.state.email
        var password = this.state.password

        body = {
            firstname,
            lastname,
            email,
            password
        }

        if (firstname.length == 0 || lastname.length == 0 || email.length == 0 || password.length == 0) {
            alert("All fields are required , please try again!")
        }

        else {
            postData(base_url+signUpUrl, body, (data, code) => {
                if (code === 200) {
                    alert("Successful Registration, please login")
                } else {
                    Alert.alert("Registration error ", data.message);
                }
            })
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
                    style={styles.firstnameInput}
                    placeholder="FirstName"
                    onChangeText={(text) => this.setState({ firstname: text })}
                    value={this.state.firstname}

                />

                <TextInput
                    placeholder="LastName"
                    style={styles.lastnameInput}
                    onChangeText={(text) => this.setState({ lastname: text })}
                    value={this.state.lastname}
                />

                <TextInput
                    style={styles.emailInput}
                    placeholder="Email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    secureTextEntry placeholder="Password"
                    style={styles.passwordInput}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />

                <Button light style={styles.signUp} alignItems="center" onPress={this.onSignUpPressed}>
                    <Text >Sign Up</Text>
                </Button>
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

    firstnameInput: {
        width: 300,
        marginTop: 25,
        paddingLeft: 5,
        paddingBottom: 5,
        borderBottomColor: "#000a12",
        borderBottomWidth: 1,
    },

    lastnameInput: {
        width: 300,
        marginTop: 30,
        paddingLeft: 5,
        paddingBottom: 5,
        borderBottomColor: "#000a12",
        borderBottomWidth: 1,
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
        marginBottom: 20,
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
