import React, { Component } from 'react'
import HomeScreen from './src/HomeScreen'
import DetailsScreen from './src/DetailsScreen'
import PhotoScreen from './src/PhotoScreen'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import firebase from 'firebase'
import { FirebaseConfig } from './firebase.config'
require('firebase/functions')

firebase.initializeApp(FirebaseConfig)
var functions = firebase.functions()

const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
        Photo: {
            screen: PhotoScreen,
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    },
)

const AppContainer = createAppContainer(RootStack)

export default class App extends Component {
    render() {
        return <AppContainer />
    }
}
