import React, { Component, Fragment } from 'react'
import { Image, View, ActivityIndicator, Content } from 'react-native'
import { Button, Text } from 'react-native-elements'
import axios from 'axios'
import Type from './TypeComponent'

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
        const { id, name, image, types } = params
            ? params.pokemon
            : defaultPokemon
        this.state = {
            id: id,
            name: name,
            image: image,
            types: types,
            default: defaultPokemon,
            isReady: false,
        }
    }
    componentDidMount = async () => {
        try {
            const pokemonDetails = await axios(
                `https://pokeapi.co/api/v2/pokemon-species/${this.state.id}/`,
            )
            const description = pokemonDetails.data.flavor_text_entries
                .filter(
                    entry =>
                        entry.language.name === 'en' &&
                        entry.version.url ===
                            'https://pokeapi.co/api/v2/version/1/',
                )
                .map(entry => entry.flavor_text)[0]
                .replace(/\s+/g, ' ')
            const uri = `https://img.pokemondb.net/artwork/${
                this.state.name
            }.jpg`
            this.setState({
                uri: uri,
                description: description,
            })
        } catch (err) {
            this.setState({
                ...this.state.default,
            })
        } finally {
            this.setState({ isReady: true })
        }
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
                    <Fragment>
                        {this.state.uri ? (
                            <Image
                                style={{ width: 250, height: 250 }}
                                source={{ uri: this.state.uri }}
                                resizeMode="contain"
                            />
                        ) : (
                            <Image source={this.state.image} />
                        )}
                        <Text h1 style={{ textTransform: 'capitalize' }}>
                            {this.state.name}
                        </Text>
                        <Text h4 style={{ textAlign: 'center' }}>
                            {this.state.description}
                        </Text>
                        <Type types={this.state.types} />
                    </Fragment>
                )}
            </View>
        )
    }
}
