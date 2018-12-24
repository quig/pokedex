import React, { Component } from 'react'
import { Button, Image, Platform, View, Text } from 'react-native'

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <Image
                    source={require('../assets/icon.png')}
                    style={{ width: 30, height: 30 }}
                />
            ),
            headerRight: (
                <Button
                    onPress={navigation.getParam('increaseCount')}
                    title="+1"
                    color={Platform.OS === 'ios' ? '#fff' : null}
                />
            ),
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount })
    }

    state = {
        count: 0,
    }

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text>Home Screen</Text>
                <Text>Count: {this.state.count}</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        this.props.navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'First Details',
                        })
                    }}
                />
            </View>
        )
    }
}
