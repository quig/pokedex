import React, { Component } from 'react'
import { View, ActivityIndicator, Content } from 'react-native'
import { Image, Button, Text } from 'react-native-elements'

export default class DetailsScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state
        return {
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
        }
    }
    constructor(props) {
        super(props)
        const defaultPokemon = {
            id: '201',
            name: 'Unown',
            types: ['?'],
            image: require('../assets/sprites/201.png'),
            description: 'We have not been able to find your pokemon',
        }
        const { params } = props.navigation.state
        const { id, name, avatar, types } = params
            ? params.pokemon
            : defaultPokemon
        this.state = {
            id: id,
            name: name,
            avatar: avatar,
            types: types,
            default: defaultPokemon,
            isReady: false,
        }
    }
    componentDidMount() {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.state.id}/`)
            .then(res => res.json())
            .then(data => {
                const description = data.flavor_text_entries
                    .filter(
                        entry =>
                            entry.language.name === 'en' &&
                            entry.version.url ===
                                'https://pokeapi.co/api/v2/version/1/',
                    )
                    .map(entry => entry.flavor_text)[0]
                    .replace(/\s+/g, ' ')
                console.log(description)
                this.setState({
                    ...this.state,
                    description: description,
                    isReady: true,
                })
            })
            .catch(err =>
                this.setState({
                    ...this.state.defaultPokemon,
                    isReady: true,
                }),
            )
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
                {!this.state.isReady && (
                    <ActivityIndicator size="small" color="#f4511e" />
                )}
                {this.state.isReady && (
                    <View>
                        <Text h1>{this.state.name}</Text>
                        <Text>{this.state.description}</Text>
                    </View>
                )}
            </View>
        )
    }
}
