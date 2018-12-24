import React, { Component } from 'react'
import HomeScreen from './src/HomeScreen'
import DetailsScreen from './src/DetailsScreen'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
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
