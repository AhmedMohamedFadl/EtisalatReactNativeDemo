import LoginScreen from "../Auth/Login";
import RegistrationScreen from "../Auth/Registration";
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import React from 'react';
import { Image } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json


export default TabNavigator(
  {
    Login: { screen: LoginScreen },
    Registraion: { screen: RegistrationScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Login') {
          iconName = `ios-log-in${focused ? '' : ''}`;
        } else if (routeName === 'Registraion') {
          iconName = `ios-person-add-outline${focused ? '' : ''}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
