import React, { Component } from 'react'
import { View } from 'react-native'

export default class PhotoScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state
        return {
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
        }
    }
    render() {
        return <View />
    }
}
